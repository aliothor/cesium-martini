# cesium-martini

> **主要代码来自[cesium-martini](https://github.com/hongfaqiu/cesium-martini)**

### 该模块可以通过Mapbox地形栅格瓦片服务创建Cesium地形

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

## Todo
1. 增加eslint检查
2. 完善使用文档
3. 完善单元测试
4. 参考[dem2terrain](https://github.com/FreeGIS/dem2terrain)实现Cesium地形切片工具