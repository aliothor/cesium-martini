var D = Object.defineProperty;
var z = (e, I, i) => I in e ? D(e, I, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[I] = i;
var a = (e, I, i) => (z(e, typeof I != "symbol" ? I + "" : I, i), i);
import { Resource as P, Credit as F, Event as j, Math as T, Ellipsoid as N, Rectangle as H, Cartographic as W, OrientedBoundingBox as Q, BoundingSphere as x, QuantizedMeshTerrainData as E, TerrainProvider as O, WebMercatorTilingScheme as J } from "cesium";
class U {
  constructor(I) {
    a(this, "resource");
    a(this, "tileSize", 256);
    a(this, "maxZoom");
    a(this, "skipOddLevels", !1);
    a(this, "contextQueue");
    a(this, "retryCallback");
    a(this, "retryAttempts");
    a(this, "getTilePixels", async (I) => {
      const i = await this.loadImage(I);
      return this.getPixels(i);
    });
    this.resource = P.createIfNeeded(I.url), this.skipOddLevels = I.skipOddLevels ?? !1, this.tileSize = I.tileSize ?? 256, this.maxZoom = I.maxZoom ?? 15, this.contextQueue = [], this.retryAttempts = I == null ? void 0 : I.retryAttempts, this.retryCallback = I == null ? void 0 : I.retryCallback;
  }
  getCanvas() {
    let I = this.contextQueue.pop();
    if (I == null) {
      const i = document.createElement("canvas");
      i.width = this.tileSize, i.height = this.tileSize;
      const g = i.getContext("2d");
      g && (I = {
        canvas: i,
        context: g
      });
    }
    return I;
  }
  getPixels(I) {
    const i = this.getCanvas();
    if (!i || !I)
      return;
    const { context: g } = i;
    g.drawImage(I, 0, 0, this.tileSize, this.tileSize);
    const t = g.getImageData(0, 0, this.tileSize, this.tileSize);
    return g.clearRect(0, 0, this.tileSize, this.tileSize), this.contextQueue.push(i), t;
  }
  loadImage(I) {
    var t;
    const { z: i, y: g } = I;
    return (t = this.resource) == null ? void 0 : t.getDerivedResource({
      templateValues: {
        ...I,
        reverseY: Math.pow(2, i) - g - 1
      },
      preserveQueryParameters: !0,
      retryAttempts: this.retryAttempts,
      retryCallback: this.retryCallback
    }).fetchImage();
  }
  getTileDataAvailable({ z: I }) {
    return I == this.maxZoom ? !0 : !(I % 2 == 1 && this.skipOddLevels || I > this.maxZoom);
  }
}
const M = "dmFyIE8gPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7CnZhciBFID0gKG4sIGUsIHQpID0+IGUgaW4gbiA/IE8obiwgZSwgeyBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwLCB2YWx1ZTogdCB9KSA6IG5bZV0gPSB0Owp2YXIgXyA9IChuLCBlLCB0KSA9PiAoRShuLCB0eXBlb2YgZSAhPSAic3ltYm9sIiA/IGUgKyAiIiA6IGUsIHQpLCB0KTsKZnVuY3Rpb24gRihuKSB7CiAgcmV0dXJuIG4gJiYgbi5fX2VzTW9kdWxlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLCAiZGVmYXVsdCIpID8gbi5kZWZhdWx0IDogbjsKfQpmdW5jdGlvbiBCKG4pIHsKICBmb3IgKHZhciBlID0gbmV3IEFycmF5KG4pLCB0ID0gMDsgdCA8IG47ICsrdCkKICAgIGVbdF0gPSB0OwogIHJldHVybiBlOwp9CnZhciBSID0gQjsKLyohCiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXIKICoKICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz4KICogQGxpY2Vuc2UgIE1JVAogKi8KdmFyIGsgPSBmdW5jdGlvbihuKSB7CiAgcmV0dXJuIG4gIT0gbnVsbCAmJiAoQyhuKSB8fCBEKG4pIHx8ICEhbi5faXNCdWZmZXIpOwp9OwpmdW5jdGlvbiBDKG4pIHsKICByZXR1cm4gISFuLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBuLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09ICJmdW5jdGlvbiIgJiYgbi5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihuKTsKfQpmdW5jdGlvbiBEKG4pIHsKICByZXR1cm4gdHlwZW9mIG4ucmVhZEZsb2F0TEUgPT0gImZ1bmN0aW9uIiAmJiB0eXBlb2Ygbi5zbGljZSA9PSAiZnVuY3Rpb24iICYmIEMobi5zbGljZSgwLCAwKSk7Cn0KdmFyICQgPSBSLCBMID0gaywgUCA9IHR5cGVvZiBGbG9hdDY0QXJyYXkgPCAidSI7CmZ1bmN0aW9uIFYobiwgZSkgewogIHJldHVybiBuWzBdIC0gZVswXTsKfQpmdW5jdGlvbiBIKCkgewogIHZhciBuID0gdGhpcy5zdHJpZGUsIGUgPSBuZXcgQXJyYXkobi5sZW5ndGgpLCB0OwogIGZvciAodCA9IDA7IHQgPCBlLmxlbmd0aDsgKyt0KQogICAgZVt0XSA9IFtNYXRoLmFicyhuW3RdKSwgdF07CiAgZS5zb3J0KFYpOwogIHZhciBpID0gbmV3IEFycmF5KGUubGVuZ3RoKTsKICBmb3IgKHQgPSAwOyB0IDwgaS5sZW5ndGg7ICsrdCkKICAgIGlbdF0gPSBlW3RdWzFdOwogIHJldHVybiBpOwp9CmZ1bmN0aW9uIE4obiwgZSkgewogIHZhciB0ID0gWyJWaWV3IiwgZSwgImQiLCBuXS5qb2luKCIiKTsKICBlIDwgMCAmJiAodCA9ICJWaWV3X05pbCIgKyBuKTsKICB2YXIgaSA9IG4gPT09ICJnZW5lcmljIjsKICBpZiAoZSA9PT0gLTEpIHsKICAgIHZhciByID0gImZ1bmN0aW9uICIgKyB0ICsgIihhKXt0aGlzLmRhdGE9YTt9O3ZhciBwcm90bz0iICsgdCArICIucHJvdG90eXBlO3Byb3RvLmR0eXBlPSciICsgbiArICInO3Byb3RvLmluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIC0xfTtwcm90by5zaXplPTA7cHJvdG8uZGltZW5zaW9uPS0xO3Byb3RvLnNoYXBlPXByb3RvLnN0cmlkZT1wcm90by5vcmRlcj1bXTtwcm90by5sbz1wcm90by5oaT1wcm90by50cmFuc3Bvc2U9cHJvdG8uc3RlcD1mdW5jdGlvbigpe3JldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSk7fTtwcm90by5nZXQ9cHJvdG8uc2V0PWZ1bmN0aW9uKCl7fTtwcm90by5waWNrPWZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9O3JldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfIiArIHQgKyAiKGEpe3JldHVybiBuZXcgIiArIHQgKyAiKGEpO30iLCBkID0gbmV3IEZ1bmN0aW9uKHIpOwogICAgcmV0dXJuIGQoKTsKICB9IGVsc2UgaWYgKGUgPT09IDApIHsKICAgIHZhciByID0gImZ1bmN0aW9uICIgKyB0ICsgIihhLGQpIHt0aGlzLmRhdGEgPSBhO3RoaXMub2Zmc2V0ID0gZH07dmFyIHByb3RvPSIgKyB0ICsgIi5wcm90b3R5cGU7cHJvdG8uZHR5cGU9JyIgKyBuICsgIic7cHJvdG8uaW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vZmZzZXR9O3Byb3RvLmRpbWVuc2lvbj0wO3Byb3RvLnNpemU9MTtwcm90by5zaGFwZT1wcm90by5zdHJpZGU9cHJvdG8ub3JkZXI9W107cHJvdG8ubG89cHJvdG8uaGk9cHJvdG8udHJhbnNwb3NlPXByb3RvLnN0ZXA9ZnVuY3Rpb24gIiArIHQgKyAiX2NvcHkoKSB7cmV0dXJuIG5ldyAiICsgdCArICIodGhpcy5kYXRhLHRoaXMub2Zmc2V0KX07cHJvdG8ucGljaz1mdW5jdGlvbiAiICsgdCArICJfcGljaygpe3JldHVybiBUcml2aWFsQXJyYXkodGhpcy5kYXRhKTt9O3Byb3RvLnZhbHVlT2Y9cHJvdG8uZ2V0PWZ1bmN0aW9uICIgKyB0ICsgIl9nZXQoKXtyZXR1cm4gIiArIChpID8gInRoaXMuZGF0YS5nZXQodGhpcy5vZmZzZXQpIiA6ICJ0aGlzLmRhdGFbdGhpcy5vZmZzZXRdIikgKyAifTtwcm90by5zZXQ9ZnVuY3Rpb24gIiArIHQgKyAiX3NldCh2KXtyZXR1cm4gIiArIChpID8gInRoaXMuZGF0YS5zZXQodGhpcy5vZmZzZXQsdikiIDogInRoaXMuZGF0YVt0aGlzLm9mZnNldF09diIpICsgIn07cmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF8iICsgdCArICIoYSxiLGMsZCl7cmV0dXJuIG5ldyAiICsgdCArICIoYSxkKX0iLCBkID0gbmV3IEZ1bmN0aW9uKCJUcml2aWFsQXJyYXkiLCByKTsKICAgIHJldHVybiBkKE1bbl1bMF0pOwogIH0KICB2YXIgciA9IFsiJ3VzZSBzdHJpY3QnIl0sIHMgPSAkKGUpLCBhID0gcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJpIiArIG87CiAgfSksIGYgPSAidGhpcy5vZmZzZXQrIiArIHMubWFwKGZ1bmN0aW9uKG8pIHsKICAgIHJldHVybiAidGhpcy5zdHJpZGVbIiArIG8gKyAiXSppIiArIG87CiAgfSkuam9pbigiKyIpLCBjID0gcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJiIiArIG87CiAgfSkuam9pbigiLCIpLCBoID0gcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJjIiArIG87CiAgfSkuam9pbigiLCIpOwogIHIucHVzaCgKICAgICJmdW5jdGlvbiAiICsgdCArICIoYSwiICsgYyArICIsIiArIGggKyAiLGQpe3RoaXMuZGF0YT1hIiwKICAgICJ0aGlzLnNoYXBlPVsiICsgYyArICJdIiwKICAgICJ0aGlzLnN0cmlkZT1bIiArIGggKyAiXSIsCiAgICAidGhpcy5vZmZzZXQ9ZHwwfSIsCiAgICAidmFyIHByb3RvPSIgKyB0ICsgIi5wcm90b3R5cGUiLAogICAgInByb3RvLmR0eXBlPSciICsgbiArICInIiwKICAgICJwcm90by5kaW1lbnNpb249IiArIGUKICApLCByLnB1c2goCiAgICAiT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCdzaXplJyx7Z2V0OmZ1bmN0aW9uICIgKyB0ICsgIl9zaXplKCl7cmV0dXJuICIgKyBzLm1hcChmdW5jdGlvbihvKSB7CiAgICAgIHJldHVybiAidGhpcy5zaGFwZVsiICsgbyArICJdIjsKICAgIH0pLmpvaW4oIioiKSwKICAgICJ9fSkiCiAgKSwgZSA9PT0gMSA/IHIucHVzaCgicHJvdG8ub3JkZXI9WzBdIikgOiAoci5wdXNoKCJPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sJ29yZGVyJyx7Z2V0OiIpLCBlIDwgNCA/IChyLnB1c2goImZ1bmN0aW9uICIgKyB0ICsgIl9vcmRlcigpeyIpLCBlID09PSAyID8gci5wdXNoKCJyZXR1cm4gKE1hdGguYWJzKHRoaXMuc3RyaWRlWzBdKT5NYXRoLmFicyh0aGlzLnN0cmlkZVsxXSkpP1sxLDBdOlswLDFdfX0pIikgOiBlID09PSAzICYmIHIucHVzaCgKICAgICJ2YXIgczA9TWF0aC5hYnModGhpcy5zdHJpZGVbMF0pLHMxPU1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSxzMj1NYXRoLmFicyh0aGlzLnN0cmlkZVsyXSk7aWYoczA+czEpe2lmKHMxPnMyKXtyZXR1cm4gWzIsMSwwXTt9ZWxzZSBpZihzMD5zMil7cmV0dXJuIFsxLDIsMF07fWVsc2V7cmV0dXJuIFsxLDAsMl07fX1lbHNlIGlmKHMwPnMyKXtyZXR1cm4gWzIsMCwxXTt9ZWxzZSBpZihzMj5zMSl7cmV0dXJuIFswLDEsMl07fWVsc2V7cmV0dXJuIFswLDIsMV07fX19KSIKICApKSA6IHIucHVzaCgiT1JERVJ9KSIpKSwgci5wdXNoKAogICAgInByb3RvLnNldD1mdW5jdGlvbiAiICsgdCArICJfc2V0KCIgKyBhLmpvaW4oIiwiKSArICIsdil7IgogICksIGkgPyByLnB1c2goInJldHVybiB0aGlzLmRhdGEuc2V0KCIgKyBmICsgIix2KX0iKSA6IHIucHVzaCgicmV0dXJuIHRoaXMuZGF0YVsiICsgZiArICJdPXZ9IiksIHIucHVzaCgicHJvdG8uZ2V0PWZ1bmN0aW9uICIgKyB0ICsgIl9nZXQoIiArIGEuam9pbigiLCIpICsgIil7IiksIGkgPyByLnB1c2goInJldHVybiB0aGlzLmRhdGEuZ2V0KCIgKyBmICsgIil9IikgOiByLnB1c2goInJldHVybiB0aGlzLmRhdGFbIiArIGYgKyAiXX0iKSwgci5wdXNoKAogICAgInByb3RvLmluZGV4PWZ1bmN0aW9uICIgKyB0ICsgIl9pbmRleCgiLAogICAgYS5qb2luKCksCiAgICAiKXtyZXR1cm4gIiArIGYgKyAifSIKICApLCByLnB1c2goInByb3RvLmhpPWZ1bmN0aW9uICIgKyB0ICsgIl9oaSgiICsgYS5qb2luKCIsIikgKyAiKXtyZXR1cm4gbmV3ICIgKyB0ICsgIih0aGlzLmRhdGEsIiArIHMubWFwKGZ1bmN0aW9uKG8pIHsKICAgIHJldHVybiBbIih0eXBlb2YgaSIsIG8sICIhPT0nbnVtYmVyJ3x8aSIsIG8sICI8MCk/dGhpcy5zaGFwZVsiLCBvLCAiXTppIiwgbywgInwwIl0uam9pbigiIik7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJ0aGlzLnN0cmlkZVsiICsgbyArICJdIjsKICB9KS5qb2luKCIsIikgKyAiLHRoaXMub2Zmc2V0KX0iKTsKICB2YXIgbCA9IHMubWFwKGZ1bmN0aW9uKG8pIHsKICAgIHJldHVybiAiYSIgKyBvICsgIj10aGlzLnNoYXBlWyIgKyBvICsgIl0iOwogIH0pLCBwID0gcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJjIiArIG8gKyAiPXRoaXMuc3RyaWRlWyIgKyBvICsgIl0iOwogIH0pOwogIHIucHVzaCgicHJvdG8ubG89ZnVuY3Rpb24gIiArIHQgKyAiX2xvKCIgKyBhLmpvaW4oIiwiKSArICIpe3ZhciBiPXRoaXMub2Zmc2V0LGQ9MCwiICsgbC5qb2luKCIsIikgKyAiLCIgKyBwLmpvaW4oIiwiKSk7CiAgZm9yICh2YXIgdSA9IDA7IHUgPCBlOyArK3UpCiAgICByLnB1c2goCiAgICAgICJpZih0eXBlb2YgaSIgKyB1ICsgIj09PSdudW1iZXInJiZpIiArIHUgKyAiPj0wKXtkPWkiICsgdSArICJ8MDtiKz1jIiArIHUgKyAiKmQ7YSIgKyB1ICsgIi09ZH0iCiAgICApOwogIHIucHVzaCgicmV0dXJuIG5ldyAiICsgdCArICIodGhpcy5kYXRhLCIgKyBzLm1hcChmdW5jdGlvbihvKSB7CiAgICByZXR1cm4gImEiICsgbzsKICB9KS5qb2luKCIsIikgKyAiLCIgKyBzLm1hcChmdW5jdGlvbihvKSB7CiAgICByZXR1cm4gImMiICsgbzsKICB9KS5qb2luKCIsIikgKyAiLGIpfSIpLCByLnB1c2goInByb3RvLnN0ZXA9ZnVuY3Rpb24gIiArIHQgKyAiX3N0ZXAoIiArIGEuam9pbigiLCIpICsgIil7dmFyICIgKyBzLm1hcChmdW5jdGlvbihvKSB7CiAgICByZXR1cm4gImEiICsgbyArICI9dGhpcy5zaGFwZVsiICsgbyArICJdIjsKICB9KS5qb2luKCIsIikgKyAiLCIgKyBzLm1hcChmdW5jdGlvbihvKSB7CiAgICByZXR1cm4gImIiICsgbyArICI9dGhpcy5zdHJpZGVbIiArIG8gKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIixjPXRoaXMub2Zmc2V0LGQ9MCxjZWlsPU1hdGguY2VpbCIpOwogIGZvciAodmFyIHUgPSAwOyB1IDwgZTsgKyt1KQogICAgci5wdXNoKAogICAgICAiaWYodHlwZW9mIGkiICsgdSArICI9PT0nbnVtYmVyJyl7ZD1pIiArIHUgKyAifDA7aWYoZDwwKXtjKz1iIiArIHUgKyAiKihhIiArIHUgKyAiLTEpO2EiICsgdSArICI9Y2VpbCgtYSIgKyB1ICsgIi9kKX1lbHNle2EiICsgdSArICI9Y2VpbChhIiArIHUgKyAiL2QpfWIiICsgdSArICIqPWR9IgogICAgKTsKICByLnB1c2goInJldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSwiICsgcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJhIiArIG87CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJiIiArIG87CiAgfSkuam9pbigiLCIpICsgIixjKX0iKTsKICBmb3IgKHZhciB3ID0gbmV3IEFycmF5KGUpLCBqID0gbmV3IEFycmF5KGUpLCB1ID0gMDsgdSA8IGU7ICsrdSkKICAgIHdbdV0gPSAiYVtpIiArIHUgKyAiXSIsIGpbdV0gPSAiYltpIiArIHUgKyAiXSI7CiAgci5wdXNoKAogICAgInByb3RvLnRyYW5zcG9zZT1mdW5jdGlvbiAiICsgdCArICJfdHJhbnNwb3NlKCIgKyBhICsgIil7IiArIGEubWFwKGZ1bmN0aW9uKG8sIGcpIHsKICAgICAgcmV0dXJuIG8gKyAiPSgiICsgbyArICI9PT11bmRlZmluZWQ/IiArIGcgKyAiOiIgKyBvICsgInwwKSI7CiAgICB9KS5qb2luKCI7IiksCiAgICAidmFyIGE9dGhpcy5zaGFwZSxiPXRoaXMuc3RyaWRlO3JldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSwiICsgdy5qb2luKCIsIikgKyAiLCIgKyBqLmpvaW4oIiwiKSArICIsdGhpcy5vZmZzZXQpfSIKICApLCByLnB1c2goInByb3RvLnBpY2s9ZnVuY3Rpb24gIiArIHQgKyAiX3BpY2soIiArIGEgKyAiKXt2YXIgYT1bXSxiPVtdLGM9dGhpcy5vZmZzZXQiKTsKICBmb3IgKHZhciB1ID0gMDsgdSA8IGU7ICsrdSkKICAgIHIucHVzaCgiaWYodHlwZW9mIGkiICsgdSArICI9PT0nbnVtYmVyJyYmaSIgKyB1ICsgIj49MCl7Yz0oYyt0aGlzLnN0cmlkZVsiICsgdSArICJdKmkiICsgdSArICIpfDB9ZWxzZXthLnB1c2godGhpcy5zaGFwZVsiICsgdSArICJdKTtiLnB1c2godGhpcy5zdHJpZGVbIiArIHUgKyAiXSl9Iik7CiAgci5wdXNoKCJ2YXIgY3Rvcj1DVE9SX0xJU1RbYS5sZW5ndGgrMV07cmV0dXJuIGN0b3IodGhpcy5kYXRhLGEsYixjKX0iKSwgci5wdXNoKCJyZXR1cm4gZnVuY3Rpb24gY29uc3RydWN0XyIgKyB0ICsgIihkYXRhLHNoYXBlLHN0cmlkZSxvZmZzZXQpe3JldHVybiBuZXcgIiArIHQgKyAiKGRhdGEsIiArIHMubWFwKGZ1bmN0aW9uKG8pIHsKICAgIHJldHVybiAic2hhcGVbIiArIG8gKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24obykgewogICAgcmV0dXJuICJzdHJpZGVbIiArIG8gKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIixvZmZzZXQpfSIpOwogIHZhciBkID0gbmV3IEZ1bmN0aW9uKCJDVE9SX0xJU1QiLCAiT1JERVIiLCByLmpvaW4oYApgKSk7CiAgcmV0dXJuIGQoTVtuXSwgSCk7Cn0KZnVuY3Rpb24gcShuKSB7CiAgaWYgKEwobikpCiAgICByZXR1cm4gImJ1ZmZlciI7CiAgaWYgKFApCiAgICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSkgewogICAgICBjYXNlICJbb2JqZWN0IEZsb2F0NjRBcnJheV0iOgogICAgICAgIHJldHVybiAiZmxvYXQ2NCI7CiAgICAgIGNhc2UgIltvYmplY3QgRmxvYXQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJmbG9hdDMyIjsKICAgICAgY2FzZSAiW29iamVjdCBJbnQ4QXJyYXldIjoKICAgICAgICByZXR1cm4gImludDgiOwogICAgICBjYXNlICJbb2JqZWN0IEludDE2QXJyYXldIjoKICAgICAgICByZXR1cm4gImludDE2IjsKICAgICAgY2FzZSAiW29iamVjdCBJbnQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJpbnQzMiI7CiAgICAgIGNhc2UgIltvYmplY3QgVWludDhBcnJheV0iOgogICAgICAgIHJldHVybiAidWludDgiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQxNkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50MTYiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50MzIiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50OF9jbGFtcGVkIjsKICAgICAgY2FzZSAiW29iamVjdCBCaWdJbnQ2NEFycmF5XSI6CiAgICAgICAgcmV0dXJuICJiaWdpbnQ2NCI7CiAgICAgIGNhc2UgIltvYmplY3QgQmlnVWludDY0QXJyYXldIjoKICAgICAgICByZXR1cm4gImJpZ3VpbnQ2NCI7CiAgICB9CiAgcmV0dXJuIEFycmF5LmlzQXJyYXkobikgPyAiYXJyYXkiIDogImdlbmVyaWMiOwp9CnZhciBNID0gewogIGZsb2F0MzI6IFtdLAogIGZsb2F0NjQ6IFtdLAogIGludDg6IFtdLAogIGludDE2OiBbXSwKICBpbnQzMjogW10sCiAgdWludDg6IFtdLAogIHVpbnQxNjogW10sCiAgdWludDMyOiBbXSwKICBhcnJheTogW10sCiAgdWludDhfY2xhbXBlZDogW10sCiAgYmlnaW50NjQ6IFtdLAogIGJpZ3VpbnQ2NDogW10sCiAgYnVmZmVyOiBbXSwKICBnZW5lcmljOiBbXQp9OwpmdW5jdGlvbiBHKG4sIGUsIHQsIGkpIHsKICBpZiAobiA9PT0gdm9pZCAwKSB7CiAgICB2YXIgaCA9IE0uYXJyYXlbMF07CiAgICByZXR1cm4gaChbXSk7CiAgfSBlbHNlCiAgICB0eXBlb2YgbiA9PSAibnVtYmVyIiAmJiAobiA9IFtuXSk7CiAgZSA9PT0gdm9pZCAwICYmIChlID0gW24ubGVuZ3RoXSk7CiAgdmFyIHIgPSBlLmxlbmd0aDsKICBpZiAodCA9PT0gdm9pZCAwKSB7CiAgICB0ID0gbmV3IEFycmF5KHIpOwogICAgZm9yICh2YXIgcyA9IHIgLSAxLCBhID0gMTsgcyA+PSAwOyAtLXMpCiAgICAgIHRbc10gPSBhLCBhICo9IGVbc107CiAgfQogIGlmIChpID09PSB2b2lkIDApIHsKICAgIGkgPSAwOwogICAgZm9yICh2YXIgcyA9IDA7IHMgPCByOyArK3MpCiAgICAgIHRbc10gPCAwICYmIChpIC09IChlW3NdIC0gMSkgKiB0W3NdKTsKICB9CiAgZm9yICh2YXIgZiA9IHEobiksIGMgPSBNW2ZdOyBjLmxlbmd0aCA8PSByICsgMTsgKQogICAgYy5wdXNoKE4oZiwgYy5sZW5ndGggLSAxKSk7CiAgdmFyIGggPSBjW3IgKyAxXTsKICByZXR1cm4gaChuLCBlLCB0LCBpKTsKfQp2YXIgUSA9IEcsIEogPSAvKiBAX19QVVJFX18gKi8gRihRKTsKY2xhc3MgSyB7CiAgY29uc3RydWN0b3IoZSA9IDI1NykgewogICAgXyh0aGlzLCAiZ3JpZFNpemUiKTsKICAgIF8odGhpcywgIm51bVRyaWFuZ2xlcyIpOwogICAgXyh0aGlzLCAibnVtUGFyZW50VHJpYW5nbGVzIik7CiAgICBfKHRoaXMsICJpbmRpY2VzIik7CiAgICBfKHRoaXMsICJjb29yZHMiKTsKICAgIHRoaXMuZ3JpZFNpemUgPSBlOwogICAgY29uc3QgdCA9IGUgLSAxOwogICAgaWYgKHQgJiB0IC0gMSkKICAgICAgdGhyb3cgbmV3IEVycm9yKAogICAgICAgIGBFeHBlY3RlZCBncmlkIHNpemUgdG8gYmUgMl5uKzEsIGdvdCAke2V9LmAKICAgICAgKTsKICAgIHRoaXMubnVtVHJpYW5nbGVzID0gdCAqIHQgKiAyIC0gMiwgdGhpcy5udW1QYXJlbnRUcmlhbmdsZXMgPSB0aGlzLm51bVRyaWFuZ2xlcyAtIHQgKiB0LCB0aGlzLmluZGljZXMgPSBuZXcgVWludDMyQXJyYXkodGhpcy5ncmlkU2l6ZSAqIHRoaXMuZ3JpZFNpemUpLCB0aGlzLmNvb3JkcyA9IG5ldyBVaW50MTZBcnJheSh0aGlzLm51bVRyaWFuZ2xlcyAqIDQpOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVRyaWFuZ2xlczsgaSsrKSB7CiAgICAgIGxldCByID0gaSArIDIsIHMgPSAwLCBhID0gMCwgZiA9IDAsIGMgPSAwLCBoID0gMCwgbCA9IDA7CiAgICAgIGZvciAociAmIDEgPyBmID0gYyA9IGggPSB0IDogcyA9IGEgPSBsID0gdDsgKHIgPj49IDEpID4gMTsgKSB7CiAgICAgICAgY29uc3QgdSA9IHMgKyBmID4+IDEsIHcgPSBhICsgYyA+PiAxOwogICAgICAgIHIgJiAxID8gKGYgPSBzLCBjID0gYSwgcyA9IGgsIGEgPSBsKSA6IChzID0gZiwgYSA9IGMsIGYgPSBoLCBjID0gbCksIGggPSB1LCBsID0gdzsKICAgICAgfQogICAgICBjb25zdCBwID0gaSAqIDQ7CiAgICAgIHRoaXMuY29vcmRzW3AgKyAwXSA9IHMsIHRoaXMuY29vcmRzW3AgKyAxXSA9IGEsIHRoaXMuY29vcmRzW3AgKyAyXSA9IGYsIHRoaXMuY29vcmRzW3AgKyAzXSA9IGM7CiAgICB9CiAgfQogIGNyZWF0ZVRpbGUoZSkgewogICAgcmV0dXJuIG5ldyBXKGUsIHRoaXMpOwogIH0KfQpjbGFzcyBXIHsKICBjb25zdHJ1Y3RvcihlLCB0KSB7CiAgICBfKHRoaXMsICJ0ZXJyYWluIik7CiAgICBfKHRoaXMsICJtYXJ0aW5pIik7CiAgICBfKHRoaXMsICJlcnJvcnMiKTsKICAgIGNvbnN0IGkgPSB0LmdyaWRTaXplOwogICAgaWYgKGUubGVuZ3RoICE9PSBpICogaSkKICAgICAgdGhyb3cgbmV3IEVycm9yKAogICAgICAgIGBFeHBlY3RlZCB0ZXJyYWluIGRhdGEgb2YgbGVuZ3RoICR7aSAqIGl9ICgke2l9IHggJHtpfSksIGdvdCAke2UubGVuZ3RofS5gCiAgICAgICk7CiAgICB0aGlzLnRlcnJhaW4gPSBlLCB0aGlzLm1hcnRpbmkgPSB0LCB0aGlzLmVycm9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoZS5sZW5ndGgpLCB0aGlzLnVwZGF0ZSgpOwogIH0KICB1cGRhdGUoKSB7CiAgICBjb25zdCB7IG51bVRyaWFuZ2xlczogZSwgbnVtUGFyZW50VHJpYW5nbGVzOiB0LCBjb29yZHM6IGksIGdyaWRTaXplOiByIH0gPSB0aGlzLm1hcnRpbmksIHsgdGVycmFpbjogcywgZXJyb3JzOiBhIH0gPSB0aGlzOwogICAgZm9yIChsZXQgZiA9IGUgLSAxOyBmID49IDA7IGYtLSkgewogICAgICBjb25zdCBjID0gZiAqIDQsIGggPSBpW2MgKyAwXSwgbCA9IGlbYyArIDFdLCBwID0gaVtjICsgMl0sIHUgPSBpW2MgKyAzXSwgdyA9IGggKyBwID4+IDEsIGogPSBsICsgdSA+PiAxLCBkID0gdyArIGogLSBsLCBvID0gaiArIGggLSB3LCBnID0gKHNbbCAqIHIgKyBoXSArIHNbdSAqIHIgKyBwXSkgLyAyLCB2ID0gaiAqIHIgKyB3LCBtID0gTWF0aC5hYnMoZyAtIHNbdl0pOwogICAgICBpZiAoYVt2XSA9IE1hdGgubWF4KGFbdl0sIG0pLCBmIDwgdCkgewogICAgICAgIGNvbnN0IHkgPSAobCArIG8gPj4gMSkgKiByICsgKGggKyBkID4+IDEpLCBiID0gKHUgKyBvID4+IDEpICogciArIChwICsgZCA+PiAxKTsKICAgICAgICBhW3ZdID0gTWF0aC5tYXgoYVt2XSwgYVt5XSwgYVtiXSk7CiAgICAgIH0KICAgIH0KICB9CiAgZ2V0TWVzaChlID0gMCwgdCkgewogICAgY29uc3QgeyBncmlkU2l6ZTogaSwgaW5kaWNlczogciB9ID0gdGhpcy5tYXJ0aW5pLCB7IGVycm9yczogcyB9ID0gdGhpczsKICAgIGxldCBhID0gMCwgZiA9IDA7CiAgICBjb25zdCBjID0gaSAtIDEsIGggPSB0IHx8IGk7CiAgICByLmZpbGwoMCk7CiAgICBmdW5jdGlvbiBsKGQsIG8sIGcsIHYsIG0sIHkpIHsKICAgICAgY29uc3QgYiA9IGQgKyBnID4+IDEsIEEgPSBvICsgdiA+PiAxLCBUID0gTWF0aC5hYnMoZCAtIG0pICsgTWF0aC5hYnMobyAtIHkpOwogICAgICBUID4gMSAmJiBzW0EgKiBpICsgYl0gPiBlIHx8IFQgPiBoID8gKGwobSwgeSwgZCwgbywgYiwgQSksIGwoZywgdiwgbSwgeSwgYiwgQSkpIDogKHJbbyAqIGkgKyBkXSA9IHJbbyAqIGkgKyBkXSB8fCArK2EsIHJbdiAqIGkgKyBnXSA9IHJbdiAqIGkgKyBnXSB8fCArK2EsIHJbeSAqIGkgKyBtXSA9IHJbeSAqIGkgKyBtXSB8fCArK2EsIGYrKyk7CiAgICB9CiAgICBsKDAsIDAsIGMsIGMsIGMsIDApLCBsKGMsIGMsIDAsIDAsIDAsIGMpOwogICAgY29uc3QgcCA9IG5ldyBVaW50MTZBcnJheShhICogMiksIHUgPSBuZXcgVWludDMyQXJyYXkoZiAqIDMpOwogICAgbGV0IHcgPSAwOwogICAgZnVuY3Rpb24gaihkLCBvLCBnLCB2LCBtLCB5KSB7CiAgICAgIGNvbnN0IGIgPSBkICsgZyA+PiAxLCBBID0gbyArIHYgPj4gMSwgVCA9IE1hdGguYWJzKGQgLSBtKSArIE1hdGguYWJzKG8gLSB5KTsKICAgICAgaWYgKFQgPiAxICYmIHNbQSAqIGkgKyBiXSA+IGUgfHwgVCA+IGgpCiAgICAgICAgaihtLCB5LCBkLCBvLCBiLCBBKSwgaihnLCB2LCBtLCB5LCBiLCBBKTsKICAgICAgZWxzZSB7CiAgICAgICAgY29uc3QgSSA9IHJbbyAqIGkgKyBkXSAtIDEsIHogPSByW3YgKiBpICsgZ10gLSAxLCBTID0gclt5ICogaSArIG1dIC0gMTsKICAgICAgICBwWzIgKiBJXSA9IGQsIHBbMiAqIEkgKyAxXSA9IG8sIHBbMiAqIHpdID0gZywgcFsyICogeiArIDFdID0gdiwgcFsyICogU10gPSBtLCBwWzIgKiBTICsgMV0gPSB5LCB1W3crK10gPSBJLCB1W3crK10gPSB6LCB1W3crK10gPSBTOwogICAgICB9CiAgICB9CiAgICByZXR1cm4gaigwLCAwLCBjLCBjLCBjLCAwKSwgaihjLCBjLCAwLCAwLCAwLCBjKSwgeyB2ZXJ0aWNlczogcCwgdHJpYW5nbGVzOiB1IH07CiAgfQp9CmZ1bmN0aW9uIFgobiwgZSwgdCkgewogIGNvbnN0IGkgPSBuLnNoYXBlWzBdICsgMSwgciA9IG5ldyBGbG9hdDMyQXJyYXkoaSAqIGkpLCBzID0gbi5zaGFwZVswXTsKICBlID0gZSA/PyAwLjEsIHQgPSB0ID8/IC0xZTQ7CiAgZm9yIChsZXQgYSA9IDA7IGEgPCBzOyBhKyspCiAgICBmb3IgKGxldCBmID0gMDsgZiA8IHM7IGYrKykgewogICAgICBjb25zdCBjID0gYSwgaCA9IG4uZ2V0KGYsIGMsIDApLCBsID0gbi5nZXQoZiwgYywgMSksIHAgPSBuLmdldChmLCBjLCAyKTsKICAgICAgclthICogaSArIGZdID0gaCAqIDI1NiAqIDI1NiAqIGUgKyBsICogMjU2ICogZSArIHAgKiBlICsgdDsKICAgIH0KICBmb3IgKGxldCBhID0gMDsgYSA8IGkgLSAxOyBhKyspCiAgICByW2kgKiAoaSAtIDEpICsgYV0gPSByW2kgKiAoaSAtIDIpICsgYV07CiAgZm9yIChsZXQgYSA9IDA7IGEgPCBpOyBhKyspCiAgICByW2kgKiBhICsgaSAtIDFdID0gcltpICogYSArIGkgLSAyXTsKICByZXR1cm4gcjsKfQpmdW5jdGlvbiBZKG4sIGUsIHQpIHsKICBjb25zdCBpID0gW10sIHIgPSBbXSwgcyA9IFtdLCBhID0gW10sIGYgPSBbXSwgYyA9IFtdLCBoID0gW107CiAgbGV0IGwgPSAxIC8gMCwgcCA9IC0xIC8gMDsKICBjb25zdCB1ID0gMzI3NjggLyB0OwogIGZvciAobGV0IGcgPSAwOyBnIDwgZS52ZXJ0aWNlcy5sZW5ndGggLyAyOyBnKyspIHsKICAgIGNvbnN0IHYgPSBnLCBtID0gZS52ZXJ0aWNlc1tnICogMl0sIHkgPSBlLnZlcnRpY2VzW2cgKiAyICsgMV0sIGIgPSBuLnRlcnJhaW5beSAqICh0ICsgMSkgKyBtXTsKICAgIGIgPiBwICYmIChwID0gYiksIGIgPCBsICYmIChsID0gYiksIHMucHVzaChiKSwgeSA9PSAwICYmIGEucHVzaCh2KSwgeSA9PSB0ICYmIGYucHVzaCh2KSwgbSA9PSAwICYmIGgucHVzaCh2KSwgbSA9PSB0ICYmIGMucHVzaCh2KTsKICAgIGxldCBBID0gbSAqIHUsIFQgPSAodCAtIHkpICogdTsKICAgIGkucHVzaChBKSwgci5wdXNoKFQpOwogIH0KICBjb25zdCB3ID0gcCAtIGwsIGogPSBzLm1hcCgoZykgPT4gdyA8IDEgPyAwIDogKGcgLSBsKSAqICgzMjc2NyAvIHcpKSwgZCA9IG5ldyBVaW50MTZBcnJheShlLnRyaWFuZ2xlcyksIG8gPSBuZXcgVWludDE2QXJyYXkoCiAgICAvL3ZlcnRzCiAgICBbLi4uaSwgLi4uciwgLi4ual0KICApOwogIHJldHVybiB7CiAgICBtaW5pbXVtSGVpZ2h0OiBsLAogICAgbWF4aW11bUhlaWdodDogcCwKICAgIHF1YW50aXplZFZlcnRpY2VzOiBvLAogICAgaW5kaWNlczogZCwKICAgIHdlc3RJbmRpY2VzOiBoLAogICAgc291dGhJbmRpY2VzOiBmLAogICAgZWFzdEluZGljZXM6IGMsCiAgICBub3J0aEluZGljZXM6IGEKICB9Owp9CmxldCB4OwpmdW5jdGlvbiBaKG4pIHsKICBjb25zdCB7IGltYWdlRGF0YTogZSwgdGlsZVNpemU6IHQgPSAyNTYsIGVycm9yTGV2ZWw6IGksIGludGVydmFsOiByLCBvZmZzZXQ6IHMgfSA9IG4sIGEgPSBKKAogICAgbmV3IFVpbnQ4QXJyYXkoZSksCiAgICBbdCwgdCwgNF0sCiAgICBbNCwgNCAqIHQsIDFdLAogICAgMAogICk7CiAgeCA/PyAoeCA9IG5ldyBLKHQgKyAxKSk7CiAgY29uc3QgZiA9IFgoYSwgciwgcyksIGMgPSB4LmNyZWF0ZVRpbGUoZiksIGggPSBjLmdldE1lc2goaSwgbi5tYXhMZW5ndGgpOwogIHJldHVybiBZKGMsIGgsIHQpOwp9CmNvbnN0IFUgPSBzZWxmOwpVLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG4pIHsKICBjb25zdCB7IGlkOiBlLCBwYXlsb2FkOiB0IH0gPSBuLmRhdGE7CiAgaWYgKGUgPT0gbnVsbCkKICAgIHJldHVybjsKICBsZXQgaSA9IFtdLCByID0gbnVsbDsKICB0cnkgewogICAgciA9IFoodCksIGkucHVzaChyLmluZGljZXMuYnVmZmVyKSwgaS5wdXNoKHIucXVhbnRpemVkVmVydGljZXMuYnVmZmVyKSwgVS5wb3N0TWVzc2FnZSh7IGlkOiBlLCBwYXlsb2FkOiByIH0sIGkpOwogIH0gY2F0Y2ggKHMpIHsKICAgIFUucG9zdE1lc3NhZ2UoeyBpZDogZSwgZXJyOiBTdHJpbmcocykgfSk7CiAgfSBmaW5hbGx5IHsKICAgIHIgPSBudWxsLCBpID0gW107CiAgfQp9Owo=", k = typeof window < "u" && window.Blob && new Blob([atob(M)], { type: "text/javascript;charset=utf-8" });
function q() {
  let e;
  try {
    if (e = k && (window.URL || window.webkitURL).createObjectURL(k), !e)
      throw "";
    return new Worker(e);
  } catch {
    return new Worker("data:application/javascript;base64," + M, { type: "module" });
  } finally {
    e && (window.URL || window.webkitURL).revokeObjectURL(e);
  }
}
const L = {}, Y = {};
let _ = 0;
async function $(e, I, i) {
  const g = _++, t = {
    id: g,
    payload: I
  };
  return new Promise(function(s, r) {
    L[g] = s, Y[g] = r, e.postMessage(t, i);
  });
}
function II(e) {
  const { id: I, err: i, payload: g } = e.data;
  if (g) {
    const t = L[I];
    t && t(g);
  } else {
    const t = Y[I];
    t && t(i || "Got nothing");
  }
  delete L[I], delete Y[I];
}
class iI {
  constructor(I = new q()) {
    a(this, "worker");
    this.worker = I, this.worker.onmessage = II;
  }
  async scheduleTask(I, i) {
    return await $(this.worker, I, i);
  }
}
function gI(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function tI(e) {
  for (var I = new Array(e), i = 0; i < e; ++i)
    I[i] = i;
  return I;
}
var eI = tI;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var sI = function(e) {
  return e != null && (R(e) || rI(e) || !!e._isBuffer);
};
function R(e) {
  return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function rI(e) {
  return typeof e.readFloatLE == "function" && typeof e.slice == "function" && R(e.slice(0, 0));
}
var oI = eI, CI = sI, nI = typeof Float64Array < "u";
function cI(e, I) {
  return e[0] - I[0];
}
function aI() {
  var e = this.stride, I = new Array(e.length), i;
  for (i = 0; i < I.length; ++i)
    I[i] = [Math.abs(e[i]), i];
  I.sort(cI);
  var g = new Array(I.length);
  for (i = 0; i < g.length; ++i)
    g[i] = I[i][1];
  return g;
}
function AI(e, I) {
  var i = ["View", I, "d", e].join("");
  I < 0 && (i = "View_Nil" + e);
  var g = e === "generic";
  if (I === -1) {
    var t = "function " + i + "(a){this.data=a;};var proto=" + i + ".prototype;proto.dtype='" + e + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + i + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + i + "(a){return new " + i + "(a);}", m = new Function(t);
    return m();
  } else if (I === 0) {
    var t = "function " + i + "(a,d) {this.data = a;this.offset = d};var proto=" + i + ".prototype;proto.dtype='" + e + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + i + "_copy() {return new " + i + "(this.data,this.offset)};proto.pick=function " + i + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + i + "_get(){return " + (g ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + i + "_set(v){return " + (g ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + i + "(a,b,c,d){return new " + i + "(a,d)}", m = new Function("TrivialArray", t);
    return m(S[e][0]);
  }
  var t = ["'use strict'"], s = oI(I), r = s.map(function(o) {
    return "i" + o;
  }), c = "this.offset+" + s.map(function(o) {
    return "this.stride[" + o + "]*i" + o;
  }).join("+"), n = s.map(function(o) {
    return "b" + o;
  }).join(","), A = s.map(function(o) {
    return "c" + o;
  }).join(",");
  t.push(
    "function " + i + "(a," + n + "," + A + ",d){this.data=a",
    "this.shape=[" + n + "]",
    "this.stride=[" + A + "]",
    "this.offset=d|0}",
    "var proto=" + i + ".prototype",
    "proto.dtype='" + e + "'",
    "proto.dimension=" + I
  ), t.push(
    "Object.defineProperty(proto,'size',{get:function " + i + "_size(){return " + s.map(function(o) {
      return "this.shape[" + o + "]";
    }).join("*"),
    "}})"
  ), I === 1 ? t.push("proto.order=[0]") : (t.push("Object.defineProperty(proto,'order',{get:"), I < 4 ? (t.push("function " + i + "_order(){"), I === 2 ? t.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : I === 3 && t.push(
    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
  )) : t.push("ORDER})")), t.push(
    "proto.set=function " + i + "_set(" + r.join(",") + ",v){"
  ), g ? t.push("return this.data.set(" + c + ",v)}") : t.push("return this.data[" + c + "]=v}"), t.push("proto.get=function " + i + "_get(" + r.join(",") + "){"), g ? t.push("return this.data.get(" + c + ")}") : t.push("return this.data[" + c + "]}"), t.push(
    "proto.index=function " + i + "_index(",
    r.join(),
    "){return " + c + "}"
  ), t.push("proto.hi=function " + i + "_hi(" + r.join(",") + "){return new " + i + "(this.data," + s.map(function(o) {
    return ["(typeof i", o, "!=='number'||i", o, "<0)?this.shape[", o, "]:i", o, "|0"].join("");
  }).join(",") + "," + s.map(function(o) {
    return "this.stride[" + o + "]";
  }).join(",") + ",this.offset)}");
  var l = s.map(function(o) {
    return "a" + o + "=this.shape[" + o + "]";
  }), u = s.map(function(o) {
    return "c" + o + "=this.stride[" + o + "]";
  });
  t.push("proto.lo=function " + i + "_lo(" + r.join(",") + "){var b=this.offset,d=0," + l.join(",") + "," + u.join(","));
  for (var C = 0; C < I; ++C)
    t.push(
      "if(typeof i" + C + "==='number'&&i" + C + ">=0){d=i" + C + "|0;b+=c" + C + "*d;a" + C + "-=d}"
    );
  t.push("return new " + i + "(this.data," + s.map(function(o) {
    return "a" + o;
  }).join(",") + "," + s.map(function(o) {
    return "c" + o;
  }).join(",") + ",b)}"), t.push("proto.step=function " + i + "_step(" + r.join(",") + "){var " + s.map(function(o) {
    return "a" + o + "=this.shape[" + o + "]";
  }).join(",") + "," + s.map(function(o) {
    return "b" + o + "=this.stride[" + o + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
  for (var C = 0; C < I; ++C)
    t.push(
      "if(typeof i" + C + "==='number'){d=i" + C + "|0;if(d<0){c+=b" + C + "*(a" + C + "-1);a" + C + "=ceil(-a" + C + "/d)}else{a" + C + "=ceil(a" + C + "/d)}b" + C + "*=d}"
    );
  t.push("return new " + i + "(this.data," + s.map(function(o) {
    return "a" + o;
  }).join(",") + "," + s.map(function(o) {
    return "b" + o;
  }).join(",") + ",c)}");
  for (var d = new Array(I), p = new Array(I), C = 0; C < I; ++C)
    d[C] = "a[i" + C + "]", p[C] = "b[i" + C + "]";
  t.push(
    "proto.transpose=function " + i + "_transpose(" + r + "){" + r.map(function(o, h) {
      return o + "=(" + o + "===undefined?" + h + ":" + o + "|0)";
    }).join(";"),
    "var a=this.shape,b=this.stride;return new " + i + "(this.data," + d.join(",") + "," + p.join(",") + ",this.offset)}"
  ), t.push("proto.pick=function " + i + "_pick(" + r + "){var a=[],b=[],c=this.offset");
  for (var C = 0; C < I; ++C)
    t.push("if(typeof i" + C + "==='number'&&i" + C + ">=0){c=(c+this.stride[" + C + "]*i" + C + ")|0}else{a.push(this.shape[" + C + "]);b.push(this.stride[" + C + "])}");
  t.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), t.push("return function construct_" + i + "(data,shape,stride,offset){return new " + i + "(data," + s.map(function(o) {
    return "shape[" + o + "]";
  }).join(",") + "," + s.map(function(o) {
    return "stride[" + o + "]";
  }).join(",") + ",offset)}");
  var m = new Function("CTOR_LIST", "ORDER", t.join(`
`));
  return m(S[e], aI);
}
function lI(e) {
  if (CI(e))
    return "buffer";
  if (nI)
    switch (Object.prototype.toString.call(e)) {
      case "[object Float64Array]":
        return "float64";
      case "[object Float32Array]":
        return "float32";
      case "[object Int8Array]":
        return "int8";
      case "[object Int16Array]":
        return "int16";
      case "[object Int32Array]":
        return "int32";
      case "[object Uint8Array]":
        return "uint8";
      case "[object Uint16Array]":
        return "uint16";
      case "[object Uint32Array]":
        return "uint32";
      case "[object Uint8ClampedArray]":
        return "uint8_clamped";
      case "[object BigInt64Array]":
        return "bigint64";
      case "[object BigUint64Array]":
        return "biguint64";
    }
  return Array.isArray(e) ? "array" : "generic";
}
var S = {
  float32: [],
  float64: [],
  int8: [],
  int16: [],
  int32: [],
  uint8: [],
  uint16: [],
  uint32: [],
  array: [],
  uint8_clamped: [],
  bigint64: [],
  biguint64: [],
  buffer: [],
  generic: []
};
function uI(e, I, i, g) {
  if (e === void 0) {
    var A = S.array[0];
    return A([]);
  } else
    typeof e == "number" && (e = [e]);
  I === void 0 && (I = [e.length]);
  var t = I.length;
  if (i === void 0) {
    i = new Array(t);
    for (var s = t - 1, r = 1; s >= 0; --s)
      i[s] = r, r *= I[s];
  }
  if (g === void 0) {
    g = 0;
    for (var s = 0; s < t; ++s)
      i[s] < 0 && (g -= (I[s] - 1) * i[s]);
  }
  for (var c = lI(e), n = S[c]; n.length <= t + 1; )
    n.push(AI(c, n.length - 1));
  var A = n[t + 1];
  return A(e, I, i, g);
}
var dI = uI;
const mI = /* @__PURE__ */ gI(dI);
class hI {
  constructor(I = 257) {
    a(this, "gridSize");
    a(this, "numTriangles");
    a(this, "numParentTriangles");
    a(this, "indices");
    a(this, "coords");
    this.gridSize = I;
    const i = I - 1;
    if (i & i - 1)
      throw new Error(
        `Expected grid size to be 2^n+1, got ${I}.`
      );
    this.numTriangles = i * i * 2 - 2, this.numParentTriangles = this.numTriangles - i * i, this.indices = new Uint32Array(this.gridSize * this.gridSize), this.coords = new Uint16Array(this.numTriangles * 4);
    for (let g = 0; g < this.numTriangles; g++) {
      let t = g + 2, s = 0, r = 0, c = 0, n = 0, A = 0, l = 0;
      for (t & 1 ? c = n = A = i : s = r = l = i; (t >>= 1) > 1; ) {
        const C = s + c >> 1, d = r + n >> 1;
        t & 1 ? (c = s, n = r, s = A, r = l) : (s = c, r = n, c = A, n = l), A = C, l = d;
      }
      const u = g * 4;
      this.coords[u + 0] = s, this.coords[u + 1] = r, this.coords[u + 2] = c, this.coords[u + 3] = n;
    }
  }
  createTile(I) {
    return new yI(I, this);
  }
}
class yI {
  constructor(I, i) {
    a(this, "terrain");
    a(this, "martini");
    a(this, "errors");
    const g = i.gridSize;
    if (I.length !== g * g)
      throw new Error(
        `Expected terrain data of length ${g * g} (${g} x ${g}), got ${I.length}.`
      );
    this.terrain = I, this.martini = i, this.errors = new Float32Array(I.length), this.update();
  }
  update() {
    const { numTriangles: I, numParentTriangles: i, coords: g, gridSize: t } = this.martini, { terrain: s, errors: r } = this;
    for (let c = I - 1; c >= 0; c--) {
      const n = c * 4, A = g[n + 0], l = g[n + 1], u = g[n + 2], C = g[n + 3], d = A + u >> 1, p = l + C >> 1, m = d + p - l, o = p + A - d, h = (s[l * t + A] + s[C * t + u]) / 2, y = p * t + d, b = Math.abs(h - s[y]);
      if (r[y] = Math.max(r[y], b), c < i) {
        const B = (l + o >> 1) * t + (A + m >> 1), G = (C + o >> 1) * t + (u + m >> 1);
        r[y] = Math.max(r[y], r[B], r[G]);
      }
    }
  }
  getMesh(I = 0, i) {
    const { gridSize: g, indices: t } = this.martini, { errors: s } = this;
    let r = 0, c = 0;
    const n = g - 1, A = i || g;
    t.fill(0);
    function l(m, o, h, y, b, B) {
      const G = m + h >> 1, K = o + y >> 1, Z = Math.abs(m - b) + Math.abs(o - B);
      Z > 1 && s[K * g + G] > I || Z > A ? (l(b, B, m, o, G, K), l(h, y, b, B, G, K)) : (t[o * g + m] = t[o * g + m] || ++r, t[y * g + h] = t[y * g + h] || ++r, t[B * g + b] = t[B * g + b] || ++r, c++);
    }
    l(0, 0, n, n, n, 0), l(n, n, 0, 0, 0, n);
    const u = new Uint16Array(r * 2), C = new Uint32Array(c * 3);
    let d = 0;
    function p(m, o, h, y, b, B) {
      const G = m + h >> 1, K = o + y >> 1, Z = Math.abs(m - b) + Math.abs(o - B);
      if (Z > 1 && s[K * g + G] > I || Z > A)
        p(b, B, m, o, G, K), p(h, y, b, B, G, K);
      else {
        const w = t[o * g + m] - 1, X = t[y * g + h] - 1, f = t[B * g + b] - 1;
        u[2 * w] = m, u[2 * w + 1] = o, u[2 * X] = h, u[2 * X + 1] = y, u[2 * f] = b, u[2 * f + 1] = B, C[d++] = w, C[d++] = X, C[d++] = f;
      }
    }
    return p(0, 0, n, n, n, 0), p(n, n, 0, 0, 0, n), { vertices: u, triangles: C };
  }
}
function BI(e, I, i) {
  const g = e.shape[0] + 1, t = new Float32Array(g * g), s = e.shape[0];
  I = I ?? 0.1, i = i ?? -1e4;
  for (let r = 0; r < s; r++)
    for (let c = 0; c < s; c++) {
      const n = r, A = e.get(c, n, 0), l = e.get(c, n, 1), u = e.get(c, n, 2);
      t[r * g + c] = A * 256 * 256 * I + l * 256 * I + u * I + i;
    }
  for (let r = 0; r < g - 1; r++)
    t[g * (g - 1) + r] = t[g * (g - 2) + r];
  for (let r = 0; r < g; r++)
    t[g * r + g - 1] = t[g * r + g - 2];
  return t;
}
function bI(e) {
  e = Math.max(e, 2);
  const I = Math.pow(e - 1, 2) * 2, i = Math.pow(e, 2), g = new Uint16Array(i * 3), t = new Uint16Array(I * 3), s = [], r = [], c = [], n = [];
  let A = 0;
  for (let l = 0; l < i; l++) {
    let u = l % e, C = Math.floor(l / e);
    const d = e * u + C;
    g[d] = u * 32768 / (e - 1), g[i + d] = C * 32768 / (e - 1), g[2 * i + d] = 0, C == 0 && s.push(d), u == 0 && r.push(d), u == e - 1 && c.push(d), C == e - 1 && n.push(d);
    const p = l - C * e;
    p != e - 1 && (t[A * 3] = l, t[A * 3 + 1] = l + e + 1, t[A * 3 + 2] = l + 1, A++), p != 0 && (t[A * 3] = l - 1, t[A * 3 + 1] = l + e - 1, t[A * 3 + 2] = l + e, A++);
  }
  return {
    minimumHeight: 0,
    maximumHeight: 0,
    quantizedVertices: g,
    indices: t,
    westIndices: s,
    southIndices: r,
    eastIndices: c,
    northIndices: n
  };
}
let V = [];
function pI(e) {
  if (e in V)
    return V[e];
  {
    const I = bI(e);
    return V[e] = I, I;
  }
}
function GI(e, I, i) {
  const g = [], t = [], s = [], r = [], c = [], n = [], A = [];
  let l = 1 / 0, u = -1 / 0;
  const C = 32768 / i;
  for (let h = 0; h < I.vertices.length / 2; h++) {
    const y = h, b = I.vertices[h * 2], B = I.vertices[h * 2 + 1], G = e.terrain[B * (i + 1) + b];
    G > u && (u = G), G < l && (l = G), s.push(G), B == 0 && r.push(y), B == i && c.push(y), b == 0 && A.push(y), b == i && n.push(y);
    let K = b * C, Z = (i - B) * C;
    g.push(K), t.push(Z);
  }
  const d = u - l, p = s.map((h) => d < 1 ? 0 : (h - l) * (32767 / d)), m = new Uint16Array(I.triangles), o = new Uint16Array(
    //verts
    [...g, ...t, ...p]
  );
  return {
    minimumHeight: l,
    maximumHeight: u,
    quantizedVertices: o,
    indices: m,
    westIndices: A,
    southIndices: c,
    eastIndices: n,
    northIndices: r
  };
}
let v;
function KI(e) {
  const { imageData: I, tileSize: i = 256, errorLevel: g, interval: t, offset: s } = e, r = mI(
    new Uint8Array(I),
    [i, i, 4],
    [4, 4 * i, 1],
    0
  );
  v ?? (v = new hI(i + 1));
  const c = BI(r, t, s), n = v.createTile(c), A = n.getMesh(g, e.maxLength);
  return GI(n, A, i);
}
class ZI extends J {
  tileXYToRectangle(I, i, g, t) {
    let s = super.tileXYToRectangle(I, i, g);
    return i == 0 && (s.north = Math.PI / 2), i + 1 == Math.pow(2, g) && (s.south = -Math.PI / 2), s;
  }
}
class XI {
  constructor(I) {
    a(this, "hasWaterMask", !1);
    a(this, "hasVertexNormals", !1);
    a(this, "credit", new F("Mapbox"));
    a(this, "ready");
    a(this, "readyPromise");
    a(this, "errorEvent", new j());
    a(this, "tilingScheme");
    a(this, "ellipsoid");
    a(this, "workerFarm", null);
    a(this, "inProgressWorkers", 0);
    a(this, "levelOfDetailScalar");
    a(this, "maxWorkers", 5);
    a(this, "minError", 0.1);
    a(this, "minZoomLevel");
    a(this, "fillPoles", !0);
    a(this, "_errorAtMinZoom", 1e3);
    a(this, "resource");
    a(this, "interval");
    a(this, "offset");
    a(this, "RADIUS_SCALAR", 1);
    a(this, "requestVertexNormals");
    a(this, "requestWaterMask");
    a(this, "availability", !1);
    a(this, "retryCallback");
    a(this, "retryAttempts");
    this.retryAttempts = I == null ? void 0 : I.retryAttempts, this.retryCallback = I == null ? void 0 : I.retryCallback, this.resource = new U({ url: I.url, retryAttempts: this.retryAttempts, retryCallback: this.retryCallback }), this.interval = I.interval ?? 0.1, this.offset = I.offset ?? -1e4, this.maxWorkers = I.maxWorkers ?? 5, this.minZoomLevel = I.minZoomLevel ?? 3, this.fillPoles = I.fillPoles ?? !0, this.levelOfDetailScalar = (I.detailScalar ?? 4) + T.EPSILON5, this.ready = !0, this.availability = !0, this.readyPromise = Promise.resolve(!0), this.minError = I.minimumErrorLevel ?? 0.1, this.requestVertexNormals = I.requestVertexNormals, this.requestWaterMask = I.requestWaterMask, this.errorEvent.addEventListener(console.log, this), this.ellipsoid = I.ellipsoid ?? N.WGS84, this.maxWorkers > 0 && (this.workerFarm = new iI());
    let i = J;
    this.fillPoles && (i = ZI), this.tilingScheme = new i({
      numberOfLevelZeroTilesX: 1,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: this.ellipsoid
    }), this._errorAtMinZoom = this.errorAtZoom(this.minZoomLevel);
  }
  requestTileGeometry(I, i, g, t) {
    if (g < this.minZoomLevel || this.scaledErrorForTile(I, i, g) > this._errorAtMinZoom)
      return Promise.resolve(this.emptyMesh(I, i, g));
    if (!(this.inProgressWorkers > this.maxWorkers))
      return this.inProgressWorkers += 1, this.processTile(I, i, g).finally(() => {
        this.inProgressWorkers -= 1;
      });
  }
  async processTile(I, i, g) {
    try {
      const { tileSize: t, getTilePixels: s } = this.resource;
      let r = await s({ x: I, y: i, z: g });
      if (!r)
        throw Error(`no pixels at x: ${I}, y: ${i}, z: ${g}`);
      let c = r.data;
      const n = this.tilingScheme.tileXYToRectangle(I, i, g), A = this.errorAtZoom(g);
      let l = this.maxVertexDistance(n);
      const u = {
        imageData: c,
        maxLength: l,
        x: I,
        y: i,
        z: g,
        errorLevel: A,
        ellipsoidRadius: this.ellipsoid.maximumRadius,
        tileSize: t,
        interval: this.interval,
        offset: this.offset
      };
      let C;
      return this.workerFarm != null ? C = await this.workerFarm.scheduleTask(u, [c.buffer]) : C = KI(u), c = void 0, r = void 0, this.createQuantizedMeshData(n, A, C);
    } catch {
      return this.emptyMesh(I, i, g);
    }
  }
  errorAtZoom(I) {
    return Math.max(
      this.getLevelMaximumGeometricError(I) / this.levelOfDetailScalar,
      this.minError
    );
  }
  scaledErrorForTile(I, i, g) {
    const t = this.tilingScheme.tileXYToRectangle(I, i, g), s = H.center(t);
    return this.errorAtZoom(g) / Math.pow(1 - Math.sin(s.latitude), 2);
  }
  maxVertexDistance(I) {
    return Math.ceil(2 / I.height);
  }
  emptyMesh(I, i, g) {
    const t = this.tilingScheme.tileXYToRectangle(I, i, g), s = H.center(t), r = Math.min(Math.abs(Math.sin(s.latitude)), 0.995);
    let c = Math.max(
      Math.ceil(200 / (g + 1) * Math.pow(1 - r, 0.25)),
      4
    );
    const n = pI(c), A = this.errorAtZoom(g);
    return this.createQuantizedMeshData(t, A, n);
  }
  createQuantizedMeshData(I, i, g) {
    const {
      minimumHeight: t,
      maximumHeight: s,
      quantizedVertices: r,
      indices: c,
      westIndices: n,
      southIndices: A,
      eastIndices: l,
      northIndices: u
    } = g, d = i * 20, p = H.center(I), m = I.width / 2;
    let h = Math.cos(m) * this.ellipsoid.maximumRadius + s;
    m > Math.PI / 4 && (h = (1 + m) * this.ellipsoid.maximumRadius);
    const y = new W(
      p.longitude,
      p.latitude,
      h
      // Scaling factor of two just to be sure.
    ), b = this.ellipsoid.transformPositionToScaledSpace(
      W.toCartesian(y)
    );
    let B = Q.fromRectangle(
      I,
      t,
      s,
      this.tilingScheme.ellipsoid
    ), G = x.fromOrientedBoundingBox(B);
    return new E({
      minimumHeight: t,
      maximumHeight: s,
      quantizedVertices: r,
      indices: c,
      boundingSphere: G,
      orientedBoundingBox: B,
      horizonOcclusionPoint: b,
      westIndices: n,
      southIndices: A,
      eastIndices: l,
      northIndices: u,
      westSkirtHeight: d,
      southSkirtHeight: d,
      eastSkirtHeight: d,
      northSkirtHeight: d,
      childTileMask: 15
    });
  }
  getLevelMaximumGeometricError(I) {
    const i = O.getEstimatedLevelZeroGeometricErrorForAHeightmap(
      this.tilingScheme.ellipsoid,
      65,
      this.tilingScheme.getNumberOfXTilesAtLevel(0)
    ), g = this.resource.tileSize / 256;
    return i / g / (1 << I);
  }
  getTileDataAvailable(I, i, g) {
    return this.resource.getTileDataAvailable({ x: I, y: i, z: g });
  }
}
export {
  U as DefaultHeightmapResource,
  XI as MartiniTerrainProvider,
  iI as WorkerFarm
};
