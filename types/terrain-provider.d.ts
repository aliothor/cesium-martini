import { Rectangle, Ellipsoid, Event as CEvent, QuantizedMeshTerrainData, Credit, Resource, TilingScheme } from "cesium";
import WorkerFarm from "./worker-farm";
import { HeightmapResource } from "./heightmap-resource";
import { TerrainWorkerOutput } from "./worker-util";
export interface TileCoordinates {
    x: number;
    y: number;
    z: number;
}
interface MartiniTerrainOpts {
    url: string | Resource;
    ellipsoid?: Ellipsoid;
    detailScalar?: number;
    minimumErrorLevel?: number;
    maxWorkers?: number;
    interval?: number;
    offset?: number;
    minZoomLevel?: number;
    fillPoles?: boolean;
    requestVertexNormals?: boolean;
    requestWaterMask?: boolean;
    retryCallback?: Resource.RetryCallback;
    retryAttempts?: number;
}
export default class MartiniTerrainProvider {
    hasWaterMask: boolean;
    hasVertexNormals: boolean;
    credit: Credit;
    ready: boolean;
    readyPromise: Promise<boolean>;
    errorEvent: CEvent<(...args: any[]) => void>;
    tilingScheme: TilingScheme;
    ellipsoid: Ellipsoid;
    workerFarm: WorkerFarm | null;
    inProgressWorkers: number;
    levelOfDetailScalar: number;
    maxWorkers: number;
    minError: number;
    minZoomLevel: number;
    fillPoles: boolean;
    _errorAtMinZoom: number;
    resource: HeightmapResource;
    interval: number;
    offset: number;
    RADIUS_SCALAR: number;
    requestVertexNormals: boolean | undefined;
    requestWaterMask: boolean | undefined;
    availability: boolean;
    retryCallback?: Resource.RetryCallback;
    retryAttempts?: number;
    constructor(opts: MartiniTerrainOpts);
    requestTileGeometry(x: number, y: number, z: number, request: any): Promise<QuantizedMeshTerrainData> | undefined;
    processTile(x: number, y: number, z: number): Promise<QuantizedMeshTerrainData>;
    errorAtZoom(zoom: number): number;
    scaledErrorForTile(x: number, y: number, z: number): number;
    maxVertexDistance(tileRect: Rectangle): number;
    emptyMesh(x: number, y: number, z: number): QuantizedMeshTerrainData;
    createQuantizedMeshData(tileRect: Rectangle, errorLevel: number, workerOutput: TerrainWorkerOutput): QuantizedMeshTerrainData;
    getLevelMaximumGeometricError(level: number): number;
    getTileDataAvailable(x: number, y: number, z: number): boolean;
}
export {};
