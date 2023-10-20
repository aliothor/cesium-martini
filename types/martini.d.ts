export default class Martini {
    gridSize: number;
    numTriangles: number;
    numParentTriangles: number;
    indices: Uint32Array;
    coords: Uint16Array;
    constructor(gridSize?: number);
    createTile(terrain: any): Tile;
}
declare class Tile {
    terrain: any;
    martini: any;
    errors: Float32Array;
    constructor(terrain: string | any[], martini: any);
    update(): void;
    getMesh(maxError?: number, maxLength?: number | null): {
        vertices: Uint16Array;
        triangles: Uint32Array;
    };
}
export {};
