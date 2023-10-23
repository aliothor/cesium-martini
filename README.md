# Cesium-Martini

**This is a fork from [cesium-martini](https://github.com/hongfaqiu/cesium-martini)**, click to view details.

This module can create cesium terrain through raster tile service.

![Cesium-Martini](/img/cesium-martini.png)

## Usage

```ts
import { Viewer, Resource } from "cesium";
import { MartiniTerrainProvider } from "@aliothor/cesium-martini";

const cesiumViewer = new Viewer("cesiumContainer");

const terrainLayer = new MartiniTerrainProvider({
  url: new Resource({
    url: 'https://a.tiles.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png',
    queryParameters: {
      access_token: 'pk.eyJ1IjoibW91cm5lciIsImEiOiJWWnRiWG1VIn0.j6eccFHpE3Q04XPLI7JxbA'
    }
  }),
  requestVertexNormals: true,
})

cesiumViewer.scene.terrainProvider = terrainLayer;
```

## Installation

This package is listed on NPM as `@aliothor/cesium-martini`. It can be installed
using the command

```bash
pnpm add @aliothor/cesium-martini
```

## Demo

![Cesium-Martini](https://s1.ax1x.com/2022/08/09/v1GhtO.png)

```node
pnpm install
pnpm build
```

## Credit

<https://github.com/hongfaqiu/cesium-martini>