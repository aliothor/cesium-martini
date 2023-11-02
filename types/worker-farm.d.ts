import { TerrainWorkerInput } from "./worker-util";
import { TerrainWorkerOutput } from "./worker-util";
declare class WorkerFarm {
    worker: Worker;
    constructor(worker?: Worker);
    /**
     * todo:完善泛型提示
     * @param params
     * @param transferableObjects
     * @returns
     */
    scheduleTask<T = TerrainWorkerInput>(params: T, transferableObjects: ArrayBufferLike[]): Promise<TerrainWorkerOutput>;
}
export default WorkerFarm;
