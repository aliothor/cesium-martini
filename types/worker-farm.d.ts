import { TerrainWorkerInput } from "./worker-util";
import { TerrainWorkerOutput } from "./worker-util";
declare class WorkerFarm {
    worker: Worker;
    constructor(worker?: Worker);
    scheduleTask<T = TerrainWorkerInput>(params: T, transferableObjects: ArrayBufferLike[]): Promise<TerrainWorkerOutput>;
}
export default WorkerFarm;
