import { Resource } from "cesium";
import { TileCoordinates } from "./terrain-provider";
export interface HeightmapResource {
    tileSize: number;
    getTilePixels: (coords: TileCoordinates) => Promise<ImageData | undefined>;
    getTileDataAvailable: (coords: TileCoordinates) => boolean;
}
interface CanvasRef {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}
export interface DefaultHeightmapResourceOpts {
    url: string | Resource;
    skipOddLevels?: boolean;
    maxZoom?: number;
    tileSize?: number;
    retryCallback?: Resource.RetryCallback;
    retryAttempts?: number;
}
export declare class DefaultHeightmapResource implements HeightmapResource {
    resource: Resource;
    tileSize: number;
    maxZoom: number;
    skipOddLevels: boolean;
    contextQueue: CanvasRef[];
    retryCallback?: Resource.RetryCallback;
    retryAttempts?: number;
    constructor(opts: DefaultHeightmapResourceOpts);
    getCanvas(): CanvasRef | undefined;
    getPixels(img: HTMLImageElement | HTMLCanvasElement | ImageBitmap | undefined): ImageData | undefined;
    loadImage(tileCoords: TileCoordinates): Promise<ImageBitmap | HTMLImageElement> | undefined;
    getTilePixels: (coords: TileCoordinates) => Promise<ImageData | undefined>;
    getTileDataAvailable({ z }: {
        z: number;
    }): boolean;
}
export default DefaultHeightmapResource;
