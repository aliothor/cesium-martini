# Cesium-Martini

**This is a fork from [cesium-martini](https://github.com/hongfaqiu/cesium-martini)**, click to view details.

This module can create cesium terrain through raster tile service.

![Cesium-Martini](/img/cesium-martini.png)


## 安装

```bash
pnpm add @aliothor/cesium-martini
```

## 使用示例

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
})

cesiumViewer.scene.terrainProvider = terrainLayer;
```
