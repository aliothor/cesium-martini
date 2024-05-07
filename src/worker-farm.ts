import type { TerrainWorkerInput, TerrainWorkerOutput } from "./worker-util";
import TerrainWorker from "./worker?worker&inline";

const resolves: any = {};
const rejects: any = {};
let globalMsgId = 0; // Activate calculation in the worker, returning a promise

async function sendMessage<T = TerrainWorkerOutput>(
  worker: Worker,
  payload: any,
  transferableObjects: ArrayBufferLike[],
) {
  const msgId = globalMsgId++;
  const msg = {
    id: msgId,
    payload,
  };
  return new Promise<T>((resolve, reject) => {
    // save callbacks for later
    resolves[msgId] = resolve;
    rejects[msgId] = reject;
    worker.postMessage(msg, transferableObjects);
  });
} // Handle incoming calculation result

function handleMessage(msg: any) {
  const { id, err, payload } = msg.data;
  if (payload) {
    const resolve = resolves[id];
    if (resolve) {
      resolve(payload);
    }
  } else {
    // error condition
    const reject = rejects[id];
    if (reject) {
      if (err) {
        reject(err);
      } else {
        reject("Got nothing");
      }
    }
  }

  // purge used callbacks
  delete resolves[id];
  delete rejects[id];
}

class WorkerFarm {
  worker: Worker;
  constructor(worker = new TerrainWorker()) {
    this.worker = worker;
    this.worker.onmessage = handleMessage;
  }

  /**
   * todo:完善泛型标注
   * @param params
   * @param transferableObjects
   * @returns
   */
  async scheduleTask<T = TerrainWorkerInput>(
    params: T,
    transferableObjects: ArrayBufferLike[],
  ) {
    return await sendMessage(this.worker, params, transferableObjects);
  }
}

export default WorkerFarm;
