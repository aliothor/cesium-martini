import { NdArray } from "ndarray";
declare function mapboxTerrainToGrid(png: NdArray<Uint8Array>, interval?: number, offset?: number, noDataHeight?: number): Float32Array;
export interface TerrainWorkerOutput {
    minimumHeight: number;
    maximumHeight: number;
    quantizedVertices: Uint16Array;
    indices: Uint16Array;
    westIndices: number[];
    southIndices: number[];
    eastIndices: number[];
    northIndices: number[];
}
export declare function testMeshData(): TerrainWorkerOutput;
export declare function emptyMesh(n: number): TerrainWorkerOutput;
export interface QuantizedMeshOptions {
    errorLevel: number;
    tileSize: number;
    ellipsoidRadius: number;
}
declare function createQuantizedMeshData(tile: any, mesh: any, tileSize: number): TerrainWorkerOutput;
export interface TerrainWorkerInput extends QuantizedMeshOptions {
    imageData: Uint8ClampedArray;
    maxLength: number | null;
    x: number;
    y: number;
    z: number;
    /**
     * Terrain-RGB interval (default 0.1)
     */
    interval?: number;
    /**
     * Terrain-RGB offset (default -10000)
     */
    offset?: number;
    /**
     * Terrain-RGB nodata fill
     */
    noDataHeight?: number;
}
declare function decodeTerrain(parameters: TerrainWorkerInput): TerrainWorkerOutput;
export { mapboxTerrainToGrid, createQuantizedMeshData, decodeTerrain };
