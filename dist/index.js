var R = Object.defineProperty;
var z = (t, I, i) => I in t ? R(t, I, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[I] = i;
var A = (t, I, i) => (z(t, typeof I != "symbol" ? I + "" : I, i), i);
import { Resource as P, Credit as F, Event as N, Math as T, Ellipsoid as Q, Rectangle as H, Cartographic as W, OrientedBoundingBox as j, BoundingSphere as x, QuantizedMeshTerrainData as E, TerrainProvider as O, WebMercatorTilingScheme as v } from "cesium";
class U {
  constructor(I) {
    A(this, "resource");
    A(this, "tileSize", 256);
    A(this, "maxZoom");
    A(this, "skipOddLevels", !1);
    A(this, "contextQueue");
    A(this, "retryCallback");
    A(this, "retryAttempts");
    A(this, "getTilePixels", async (I) => {
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
      const e = i.getContext("2d");
      e && (I = {
        canvas: i,
        context: e
      });
    }
    return I;
  }
  getPixels(I) {
    const i = this.getCanvas();
    if (!i || !I)
      return;
    const { context: e } = i;
    e.drawImage(I, 0, 0, this.tileSize, this.tileSize);
    const g = e.getImageData(0, 0, this.tileSize, this.tileSize);
    return e.clearRect(0, 0, this.tileSize, this.tileSize), this.contextQueue.push(i), g;
  }
  loadImage(I) {
    var g;
    const { z: i, y: e } = I;
    return (g = this.resource) == null ? void 0 : g.getDerivedResource({
      templateValues: {
        ...I,
        reverseY: Math.pow(2, i) - e - 1
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
const D = "dmFyIE8gPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7CnZhciBFID0gKG4sIGUsIHQpID0+IGUgaW4gbiA/IE8obiwgZSwgeyBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwLCB2YWx1ZTogdCB9KSA6IG5bZV0gPSB0Owp2YXIgXyA9IChuLCBlLCB0KSA9PiAoRShuLCB0eXBlb2YgZSAhPSAic3ltYm9sIiA/IGUgKyAiIiA6IGUsIHQpLCB0KTsKZnVuY3Rpb24gRihuKSB7CiAgcmV0dXJuIG4gJiYgbi5fX2VzTW9kdWxlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLCAiZGVmYXVsdCIpID8gbi5kZWZhdWx0IDogbjsKfQpmdW5jdGlvbiBCKG4pIHsKICBmb3IgKHZhciBlID0gbmV3IEFycmF5KG4pLCB0ID0gMDsgdCA8IG47ICsrdCkKICAgIGVbdF0gPSB0OwogIHJldHVybiBlOwp9CnZhciBSID0gQjsKLyohCiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXIKICoKICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz4KICogQGxpY2Vuc2UgIE1JVAogKi8KdmFyIGsgPSBmdW5jdGlvbihuKSB7CiAgcmV0dXJuIG4gIT0gbnVsbCAmJiAoQyhuKSB8fCBEKG4pIHx8ICEhbi5faXNCdWZmZXIpOwp9OwpmdW5jdGlvbiBDKG4pIHsKICByZXR1cm4gISFuLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBuLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09ICJmdW5jdGlvbiIgJiYgbi5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihuKTsKfQpmdW5jdGlvbiBEKG4pIHsKICByZXR1cm4gdHlwZW9mIG4ucmVhZEZsb2F0TEUgPT0gImZ1bmN0aW9uIiAmJiB0eXBlb2Ygbi5zbGljZSA9PSAiZnVuY3Rpb24iICYmIEMobi5zbGljZSgwLCAwKSk7Cn0KdmFyICQgPSBSLCBMID0gaywgUCA9IHR5cGVvZiBGbG9hdDY0QXJyYXkgPCAidSI7CmZ1bmN0aW9uIFYobiwgZSkgewogIHJldHVybiBuWzBdIC0gZVswXTsKfQpmdW5jdGlvbiBIKCkgewogIHZhciBuID0gdGhpcy5zdHJpZGUsIGUgPSBuZXcgQXJyYXkobi5sZW5ndGgpLCB0OwogIGZvciAodCA9IDA7IHQgPCBlLmxlbmd0aDsgKyt0KQogICAgZVt0XSA9IFtNYXRoLmFicyhuW3RdKSwgdF07CiAgZS5zb3J0KFYpOwogIHZhciBvID0gbmV3IEFycmF5KGUubGVuZ3RoKTsKICBmb3IgKHQgPSAwOyB0IDwgby5sZW5ndGg7ICsrdCkKICAgIG9bdF0gPSBlW3RdWzFdOwogIHJldHVybiBvOwp9CmZ1bmN0aW9uIE4obiwgZSkgewogIHZhciB0ID0gWyJWaWV3IiwgZSwgImQiLCBuXS5qb2luKCIiKTsKICBlIDwgMCAmJiAodCA9ICJWaWV3X05pbCIgKyBuKTsKICB2YXIgbyA9IG4gPT09ICJnZW5lcmljIjsKICBpZiAoZSA9PT0gLTEpIHsKICAgIHZhciByID0gImZ1bmN0aW9uICIgKyB0ICsgIihhKXt0aGlzLmRhdGE9YTt9O3ZhciBwcm90bz0iICsgdCArICIucHJvdG90eXBlO3Byb3RvLmR0eXBlPSciICsgbiArICInO3Byb3RvLmluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIC0xfTtwcm90by5zaXplPTA7cHJvdG8uZGltZW5zaW9uPS0xO3Byb3RvLnNoYXBlPXByb3RvLnN0cmlkZT1wcm90by5vcmRlcj1bXTtwcm90by5sbz1wcm90by5oaT1wcm90by50cmFuc3Bvc2U9cHJvdG8uc3RlcD1mdW5jdGlvbigpe3JldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSk7fTtwcm90by5nZXQ9cHJvdG8uc2V0PWZ1bmN0aW9uKCl7fTtwcm90by5waWNrPWZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9O3JldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfIiArIHQgKyAiKGEpe3JldHVybiBuZXcgIiArIHQgKyAiKGEpO30iLCBkID0gbmV3IEZ1bmN0aW9uKHIpOwogICAgcmV0dXJuIGQoKTsKICB9IGVsc2UgaWYgKGUgPT09IDApIHsKICAgIHZhciByID0gImZ1bmN0aW9uICIgKyB0ICsgIihhLGQpIHt0aGlzLmRhdGEgPSBhO3RoaXMub2Zmc2V0ID0gZH07dmFyIHByb3RvPSIgKyB0ICsgIi5wcm90b3R5cGU7cHJvdG8uZHR5cGU9JyIgKyBuICsgIic7cHJvdG8uaW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vZmZzZXR9O3Byb3RvLmRpbWVuc2lvbj0wO3Byb3RvLnNpemU9MTtwcm90by5zaGFwZT1wcm90by5zdHJpZGU9cHJvdG8ub3JkZXI9W107cHJvdG8ubG89cHJvdG8uaGk9cHJvdG8udHJhbnNwb3NlPXByb3RvLnN0ZXA9ZnVuY3Rpb24gIiArIHQgKyAiX2NvcHkoKSB7cmV0dXJuIG5ldyAiICsgdCArICIodGhpcy5kYXRhLHRoaXMub2Zmc2V0KX07cHJvdG8ucGljaz1mdW5jdGlvbiAiICsgdCArICJfcGljaygpe3JldHVybiBUcml2aWFsQXJyYXkodGhpcy5kYXRhKTt9O3Byb3RvLnZhbHVlT2Y9cHJvdG8uZ2V0PWZ1bmN0aW9uICIgKyB0ICsgIl9nZXQoKXtyZXR1cm4gIiArIChvID8gInRoaXMuZGF0YS5nZXQodGhpcy5vZmZzZXQpIiA6ICJ0aGlzLmRhdGFbdGhpcy5vZmZzZXRdIikgKyAifTtwcm90by5zZXQ9ZnVuY3Rpb24gIiArIHQgKyAiX3NldCh2KXtyZXR1cm4gIiArIChvID8gInRoaXMuZGF0YS5zZXQodGhpcy5vZmZzZXQsdikiIDogInRoaXMuZGF0YVt0aGlzLm9mZnNldF09diIpICsgIn07cmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF8iICsgdCArICIoYSxiLGMsZCl7cmV0dXJuIG5ldyAiICsgdCArICIoYSxkKX0iLCBkID0gbmV3IEZ1bmN0aW9uKCJUcml2aWFsQXJyYXkiLCByKTsKICAgIHJldHVybiBkKE1bbl1bMF0pOwogIH0KICB2YXIgciA9IFsiJ3VzZSBzdHJpY3QnIl0sIHMgPSAkKGUpLCBmID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJpIiArIGk7CiAgfSksIGMgPSAidGhpcy5vZmZzZXQrIiArIHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiAidGhpcy5zdHJpZGVbIiArIGkgKyAiXSppIiArIGk7CiAgfSkuam9pbigiKyIpLCB1ID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJiIiArIGk7CiAgfSkuam9pbigiLCIpLCBoID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJjIiArIGk7CiAgfSkuam9pbigiLCIpOwogIHIucHVzaCgKICAgICJmdW5jdGlvbiAiICsgdCArICIoYSwiICsgdSArICIsIiArIGggKyAiLGQpe3RoaXMuZGF0YT1hIiwKICAgICJ0aGlzLnNoYXBlPVsiICsgdSArICJdIiwKICAgICJ0aGlzLnN0cmlkZT1bIiArIGggKyAiXSIsCiAgICAidGhpcy5vZmZzZXQ9ZHwwfSIsCiAgICAidmFyIHByb3RvPSIgKyB0ICsgIi5wcm90b3R5cGUiLAogICAgInByb3RvLmR0eXBlPSciICsgbiArICInIiwKICAgICJwcm90by5kaW1lbnNpb249IiArIGUKICApLCByLnB1c2goCiAgICAiT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCdzaXplJyx7Z2V0OmZ1bmN0aW9uICIgKyB0ICsgIl9zaXplKCl7cmV0dXJuICIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICAgIHJldHVybiAidGhpcy5zaGFwZVsiICsgaSArICJdIjsKICAgIH0pLmpvaW4oIioiKSwKICAgICJ9fSkiCiAgKSwgZSA9PT0gMSA/IHIucHVzaCgicHJvdG8ub3JkZXI9WzBdIikgOiAoci5wdXNoKCJPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sJ29yZGVyJyx7Z2V0OiIpLCBlIDwgNCA/IChyLnB1c2goImZ1bmN0aW9uICIgKyB0ICsgIl9vcmRlcigpeyIpLCBlID09PSAyID8gci5wdXNoKCJyZXR1cm4gKE1hdGguYWJzKHRoaXMuc3RyaWRlWzBdKT5NYXRoLmFicyh0aGlzLnN0cmlkZVsxXSkpP1sxLDBdOlswLDFdfX0pIikgOiBlID09PSAzICYmIHIucHVzaCgKICAgICJ2YXIgczA9TWF0aC5hYnModGhpcy5zdHJpZGVbMF0pLHMxPU1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSxzMj1NYXRoLmFicyh0aGlzLnN0cmlkZVsyXSk7aWYoczA+czEpe2lmKHMxPnMyKXtyZXR1cm4gWzIsMSwwXTt9ZWxzZSBpZihzMD5zMil7cmV0dXJuIFsxLDIsMF07fWVsc2V7cmV0dXJuIFsxLDAsMl07fX1lbHNlIGlmKHMwPnMyKXtyZXR1cm4gWzIsMCwxXTt9ZWxzZSBpZihzMj5zMSl7cmV0dXJuIFswLDEsMl07fWVsc2V7cmV0dXJuIFswLDIsMV07fX19KSIKICApKSA6IHIucHVzaCgiT1JERVJ9KSIpKSwgci5wdXNoKAogICAgInByb3RvLnNldD1mdW5jdGlvbiAiICsgdCArICJfc2V0KCIgKyBmLmpvaW4oIiwiKSArICIsdil7IgogICksIG8gPyByLnB1c2goInJldHVybiB0aGlzLmRhdGEuc2V0KCIgKyBjICsgIix2KX0iKSA6IHIucHVzaCgicmV0dXJuIHRoaXMuZGF0YVsiICsgYyArICJdPXZ9IiksIHIucHVzaCgicHJvdG8uZ2V0PWZ1bmN0aW9uICIgKyB0ICsgIl9nZXQoIiArIGYuam9pbigiLCIpICsgIil7IiksIG8gPyByLnB1c2goInJldHVybiB0aGlzLmRhdGEuZ2V0KCIgKyBjICsgIil9IikgOiByLnB1c2goInJldHVybiB0aGlzLmRhdGFbIiArIGMgKyAiXX0iKSwgci5wdXNoKAogICAgInByb3RvLmluZGV4PWZ1bmN0aW9uICIgKyB0ICsgIl9pbmRleCgiLAogICAgZi5qb2luKCksCiAgICAiKXtyZXR1cm4gIiArIGMgKyAifSIKICApLCByLnB1c2goInByb3RvLmhpPWZ1bmN0aW9uICIgKyB0ICsgIl9oaSgiICsgZi5qb2luKCIsIikgKyAiKXtyZXR1cm4gbmV3ICIgKyB0ICsgIih0aGlzLmRhdGEsIiArIHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiBbIih0eXBlb2YgaSIsIGksICIhPT0nbnVtYmVyJ3x8aSIsIGksICI8MCk/dGhpcy5zaGFwZVsiLCBpLCAiXTppIiwgaSwgInwwIl0uam9pbigiIik7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJ0aGlzLnN0cmlkZVsiICsgaSArICJdIjsKICB9KS5qb2luKCIsIikgKyAiLHRoaXMub2Zmc2V0KX0iKTsKICB2YXIgcCA9IHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiAiYSIgKyBpICsgIj10aGlzLnNoYXBlWyIgKyBpICsgIl0iOwogIH0pLCBsID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJjIiArIGkgKyAiPXRoaXMuc3RyaWRlWyIgKyBpICsgIl0iOwogIH0pOwogIHIucHVzaCgicHJvdG8ubG89ZnVuY3Rpb24gIiArIHQgKyAiX2xvKCIgKyBmLmpvaW4oIiwiKSArICIpe3ZhciBiPXRoaXMub2Zmc2V0LGQ9MCwiICsgcC5qb2luKCIsIikgKyAiLCIgKyBsLmpvaW4oIiwiKSk7CiAgZm9yICh2YXIgYSA9IDA7IGEgPCBlOyArK2EpCiAgICByLnB1c2goCiAgICAgICJpZih0eXBlb2YgaSIgKyBhICsgIj09PSdudW1iZXInJiZpIiArIGEgKyAiPj0wKXtkPWkiICsgYSArICJ8MDtiKz1jIiArIGEgKyAiKmQ7YSIgKyBhICsgIi09ZH0iCiAgICApOwogIHIucHVzaCgicmV0dXJuIG5ldyAiICsgdCArICIodGhpcy5kYXRhLCIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImEiICsgaTsKICB9KS5qb2luKCIsIikgKyAiLCIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImMiICsgaTsKICB9KS5qb2luKCIsIikgKyAiLGIpfSIpLCByLnB1c2goInByb3RvLnN0ZXA9ZnVuY3Rpb24gIiArIHQgKyAiX3N0ZXAoIiArIGYuam9pbigiLCIpICsgIil7dmFyICIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImEiICsgaSArICI9dGhpcy5zaGFwZVsiICsgaSArICJdIjsKICB9KS5qb2luKCIsIikgKyAiLCIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImIiICsgaSArICI9dGhpcy5zdHJpZGVbIiArIGkgKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIixjPXRoaXMub2Zmc2V0LGQ9MCxjZWlsPU1hdGguY2VpbCIpOwogIGZvciAodmFyIGEgPSAwOyBhIDwgZTsgKythKQogICAgci5wdXNoKAogICAgICAiaWYodHlwZW9mIGkiICsgYSArICI9PT0nbnVtYmVyJyl7ZD1pIiArIGEgKyAifDA7aWYoZDwwKXtjKz1iIiArIGEgKyAiKihhIiArIGEgKyAiLTEpO2EiICsgYSArICI9Y2VpbCgtYSIgKyBhICsgIi9kKX1lbHNle2EiICsgYSArICI9Y2VpbChhIiArIGEgKyAiL2QpfWIiICsgYSArICIqPWR9IgogICAgKTsKICByLnB1c2goInJldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJhIiArIGk7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJiIiArIGk7CiAgfSkuam9pbigiLCIpICsgIixjKX0iKTsKICBmb3IgKHZhciBiID0gbmV3IEFycmF5KGUpLCBqID0gbmV3IEFycmF5KGUpLCBhID0gMDsgYSA8IGU7ICsrYSkKICAgIGJbYV0gPSAiYVtpIiArIGEgKyAiXSIsIGpbYV0gPSAiYltpIiArIGEgKyAiXSI7CiAgci5wdXNoKAogICAgInByb3RvLnRyYW5zcG9zZT1mdW5jdGlvbiAiICsgdCArICJfdHJhbnNwb3NlKCIgKyBmICsgIil7IiArIGYubWFwKGZ1bmN0aW9uKGksIGcpIHsKICAgICAgcmV0dXJuIGkgKyAiPSgiICsgaSArICI9PT11bmRlZmluZWQ/IiArIGcgKyAiOiIgKyBpICsgInwwKSI7CiAgICB9KS5qb2luKCI7IiksCiAgICAidmFyIGE9dGhpcy5zaGFwZSxiPXRoaXMuc3RyaWRlO3JldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSwiICsgYi5qb2luKCIsIikgKyAiLCIgKyBqLmpvaW4oIiwiKSArICIsdGhpcy5vZmZzZXQpfSIKICApLCByLnB1c2goInByb3RvLnBpY2s9ZnVuY3Rpb24gIiArIHQgKyAiX3BpY2soIiArIGYgKyAiKXt2YXIgYT1bXSxiPVtdLGM9dGhpcy5vZmZzZXQiKTsKICBmb3IgKHZhciBhID0gMDsgYSA8IGU7ICsrYSkKICAgIHIucHVzaCgiaWYodHlwZW9mIGkiICsgYSArICI9PT0nbnVtYmVyJyYmaSIgKyBhICsgIj49MCl7Yz0oYyt0aGlzLnN0cmlkZVsiICsgYSArICJdKmkiICsgYSArICIpfDB9ZWxzZXthLnB1c2godGhpcy5zaGFwZVsiICsgYSArICJdKTtiLnB1c2godGhpcy5zdHJpZGVbIiArIGEgKyAiXSl9Iik7CiAgci5wdXNoKCJ2YXIgY3Rvcj1DVE9SX0xJU1RbYS5sZW5ndGgrMV07cmV0dXJuIGN0b3IodGhpcy5kYXRhLGEsYixjKX0iKSwgci5wdXNoKCJyZXR1cm4gZnVuY3Rpb24gY29uc3RydWN0XyIgKyB0ICsgIihkYXRhLHNoYXBlLHN0cmlkZSxvZmZzZXQpe3JldHVybiBuZXcgIiArIHQgKyAiKGRhdGEsIiArIHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiAic2hhcGVbIiArIGkgKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJzdHJpZGVbIiArIGkgKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIixvZmZzZXQpfSIpOwogIHZhciBkID0gbmV3IEZ1bmN0aW9uKCJDVE9SX0xJU1QiLCAiT1JERVIiLCByLmpvaW4oYApgKSk7CiAgcmV0dXJuIGQoTVtuXSwgSCk7Cn0KZnVuY3Rpb24gcShuKSB7CiAgaWYgKEwobikpCiAgICByZXR1cm4gImJ1ZmZlciI7CiAgaWYgKFApCiAgICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSkgewogICAgICBjYXNlICJbb2JqZWN0IEZsb2F0NjRBcnJheV0iOgogICAgICAgIHJldHVybiAiZmxvYXQ2NCI7CiAgICAgIGNhc2UgIltvYmplY3QgRmxvYXQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJmbG9hdDMyIjsKICAgICAgY2FzZSAiW29iamVjdCBJbnQ4QXJyYXldIjoKICAgICAgICByZXR1cm4gImludDgiOwogICAgICBjYXNlICJbb2JqZWN0IEludDE2QXJyYXldIjoKICAgICAgICByZXR1cm4gImludDE2IjsKICAgICAgY2FzZSAiW29iamVjdCBJbnQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJpbnQzMiI7CiAgICAgIGNhc2UgIltvYmplY3QgVWludDhBcnJheV0iOgogICAgICAgIHJldHVybiAidWludDgiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQxNkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50MTYiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50MzIiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50OF9jbGFtcGVkIjsKICAgICAgY2FzZSAiW29iamVjdCBCaWdJbnQ2NEFycmF5XSI6CiAgICAgICAgcmV0dXJuICJiaWdpbnQ2NCI7CiAgICAgIGNhc2UgIltvYmplY3QgQmlnVWludDY0QXJyYXldIjoKICAgICAgICByZXR1cm4gImJpZ3VpbnQ2NCI7CiAgICB9CiAgcmV0dXJuIEFycmF5LmlzQXJyYXkobikgPyAiYXJyYXkiIDogImdlbmVyaWMiOwp9CnZhciBNID0gewogIGZsb2F0MzI6IFtdLAogIGZsb2F0NjQ6IFtdLAogIGludDg6IFtdLAogIGludDE2OiBbXSwKICBpbnQzMjogW10sCiAgdWludDg6IFtdLAogIHVpbnQxNjogW10sCiAgdWludDMyOiBbXSwKICBhcnJheTogW10sCiAgdWludDhfY2xhbXBlZDogW10sCiAgYmlnaW50NjQ6IFtdLAogIGJpZ3VpbnQ2NDogW10sCiAgYnVmZmVyOiBbXSwKICBnZW5lcmljOiBbXQp9OwpmdW5jdGlvbiBHKG4sIGUsIHQsIG8pIHsKICBpZiAobiA9PT0gdm9pZCAwKSB7CiAgICB2YXIgaCA9IE0uYXJyYXlbMF07CiAgICByZXR1cm4gaChbXSk7CiAgfSBlbHNlCiAgICB0eXBlb2YgbiA9PSAibnVtYmVyIiAmJiAobiA9IFtuXSk7CiAgZSA9PT0gdm9pZCAwICYmIChlID0gW24ubGVuZ3RoXSk7CiAgdmFyIHIgPSBlLmxlbmd0aDsKICBpZiAodCA9PT0gdm9pZCAwKSB7CiAgICB0ID0gbmV3IEFycmF5KHIpOwogICAgZm9yICh2YXIgcyA9IHIgLSAxLCBmID0gMTsgcyA+PSAwOyAtLXMpCiAgICAgIHRbc10gPSBmLCBmICo9IGVbc107CiAgfQogIGlmIChvID09PSB2b2lkIDApIHsKICAgIG8gPSAwOwogICAgZm9yICh2YXIgcyA9IDA7IHMgPCByOyArK3MpCiAgICAgIHRbc10gPCAwICYmIChvIC09IChlW3NdIC0gMSkgKiB0W3NdKTsKICB9CiAgZm9yICh2YXIgYyA9IHEobiksIHUgPSBNW2NdOyB1Lmxlbmd0aCA8PSByICsgMTsgKQogICAgdS5wdXNoKE4oYywgdS5sZW5ndGggLSAxKSk7CiAgdmFyIGggPSB1W3IgKyAxXTsKICByZXR1cm4gaChuLCBlLCB0LCBvKTsKfQp2YXIgUSA9IEcsIEogPSAvKiBAX19QVVJFX18gKi8gRihRKTsKY2xhc3MgSyB7CiAgY29uc3RydWN0b3IoZSA9IDI1NykgewogICAgXyh0aGlzLCAiZ3JpZFNpemUiKTsKICAgIF8odGhpcywgIm51bVRyaWFuZ2xlcyIpOwogICAgXyh0aGlzLCAibnVtUGFyZW50VHJpYW5nbGVzIik7CiAgICBfKHRoaXMsICJpbmRpY2VzIik7CiAgICBfKHRoaXMsICJjb29yZHMiKTsKICAgIHRoaXMuZ3JpZFNpemUgPSBlOwogICAgY29uc3QgdCA9IGUgLSAxOwogICAgaWYgKHQgJiB0IC0gMSkKICAgICAgdGhyb3cgbmV3IEVycm9yKAogICAgICAgIGBFeHBlY3RlZCBncmlkIHNpemUgdG8gYmUgMl5uKzEsIGdvdCAke2V9LmAKICAgICAgKTsKICAgIHRoaXMubnVtVHJpYW5nbGVzID0gdCAqIHQgKiAyIC0gMiwgdGhpcy5udW1QYXJlbnRUcmlhbmdsZXMgPSB0aGlzLm51bVRyaWFuZ2xlcyAtIHQgKiB0LCB0aGlzLmluZGljZXMgPSBuZXcgVWludDMyQXJyYXkodGhpcy5ncmlkU2l6ZSAqIHRoaXMuZ3JpZFNpemUpLCB0aGlzLmNvb3JkcyA9IG5ldyBVaW50MTZBcnJheSh0aGlzLm51bVRyaWFuZ2xlcyAqIDQpOwogICAgZm9yIChsZXQgbyA9IDA7IG8gPCB0aGlzLm51bVRyaWFuZ2xlczsgbysrKSB7CiAgICAgIGxldCByID0gbyArIDIsIHMgPSAwLCBmID0gMCwgYyA9IDAsIHUgPSAwLCBoID0gMCwgcCA9IDA7CiAgICAgIGZvciAociAmIDEgPyBjID0gdSA9IGggPSB0IDogcyA9IGYgPSBwID0gdDsgKHIgPj49IDEpID4gMTsgKSB7CiAgICAgICAgY29uc3QgYSA9IHMgKyBjID4+IDEsIGIgPSBmICsgdSA+PiAxOwogICAgICAgIHIgJiAxID8gKGMgPSBzLCB1ID0gZiwgcyA9IGgsIGYgPSBwKSA6IChzID0gYywgZiA9IHUsIGMgPSBoLCB1ID0gcCksIGggPSBhLCBwID0gYjsKICAgICAgfQogICAgICBjb25zdCBsID0gbyAqIDQ7CiAgICAgIHRoaXMuY29vcmRzW2wgKyAwXSA9IHMsIHRoaXMuY29vcmRzW2wgKyAxXSA9IGYsIHRoaXMuY29vcmRzW2wgKyAyXSA9IGMsIHRoaXMuY29vcmRzW2wgKyAzXSA9IHU7CiAgICB9CiAgfQogIGNyZWF0ZVRpbGUoZSkgewogICAgcmV0dXJuIG5ldyBXKGUsIHRoaXMpOwogIH0KfQpjbGFzcyBXIHsKICBjb25zdHJ1Y3RvcihlLCB0KSB7CiAgICBfKHRoaXMsICJ0ZXJyYWluIik7CiAgICBfKHRoaXMsICJtYXJ0aW5pIik7CiAgICBfKHRoaXMsICJlcnJvcnMiKTsKICAgIGNvbnN0IG8gPSB0LmdyaWRTaXplOwogICAgaWYgKGUubGVuZ3RoICE9PSBvICogbykKICAgICAgdGhyb3cgbmV3IEVycm9yKAogICAgICAgIGBFeHBlY3RlZCB0ZXJyYWluIGRhdGEgb2YgbGVuZ3RoICR7byAqIG99ICgke299IHggJHtvfSksIGdvdCAke2UubGVuZ3RofS5gCiAgICAgICk7CiAgICB0aGlzLnRlcnJhaW4gPSBlLCB0aGlzLm1hcnRpbmkgPSB0LCB0aGlzLmVycm9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoZS5sZW5ndGgpLCB0aGlzLnVwZGF0ZSgpOwogIH0KICB1cGRhdGUoKSB7CiAgICBjb25zdCB7IG51bVRyaWFuZ2xlczogZSwgbnVtUGFyZW50VHJpYW5nbGVzOiB0LCBjb29yZHM6IG8sIGdyaWRTaXplOiByIH0gPSB0aGlzLm1hcnRpbmksIHsgdGVycmFpbjogcywgZXJyb3JzOiBmIH0gPSB0aGlzOwogICAgZm9yIChsZXQgYyA9IGUgLSAxOyBjID49IDA7IGMtLSkgewogICAgICBjb25zdCB1ID0gYyAqIDQsIGggPSBvW3UgKyAwXSwgcCA9IG9bdSArIDFdLCBsID0gb1t1ICsgMl0sIGEgPSBvW3UgKyAzXSwgYiA9IGggKyBsID4+IDEsIGogPSBwICsgYSA+PiAxLCBkID0gYiArIGogLSBwLCBpID0gaiArIGggLSBiLCBnID0gKHNbcCAqIHIgKyBoXSArIHNbYSAqIHIgKyBsXSkgLyAyLCB2ID0gaiAqIHIgKyBiLCBtID0gTWF0aC5hYnMoZyAtIHNbdl0pOwogICAgICBpZiAoZlt2XSA9IE1hdGgubWF4KGZbdl0sIG0pLCBjIDwgdCkgewogICAgICAgIGNvbnN0IHkgPSAocCArIGkgPj4gMSkgKiByICsgKGggKyBkID4+IDEpLCB3ID0gKGEgKyBpID4+IDEpICogciArIChsICsgZCA+PiAxKTsKICAgICAgICBmW3ZdID0gTWF0aC5tYXgoZlt2XSwgZlt5XSwgZlt3XSk7CiAgICAgIH0KICAgIH0KICB9CiAgZ2V0TWVzaChlID0gMCwgdCkgewogICAgY29uc3QgeyBncmlkU2l6ZTogbywgaW5kaWNlczogciB9ID0gdGhpcy5tYXJ0aW5pLCB7IGVycm9yczogcyB9ID0gdGhpczsKICAgIGxldCBmID0gMCwgYyA9IDA7CiAgICBjb25zdCB1ID0gbyAtIDEsIGggPSB0IHx8IG87CiAgICByLmZpbGwoMCk7CiAgICBmdW5jdGlvbiBwKGQsIGksIGcsIHYsIG0sIHkpIHsKICAgICAgY29uc3QgdyA9IGQgKyBnID4+IDEsIEEgPSBpICsgdiA+PiAxLCBUID0gTWF0aC5hYnMoZCAtIG0pICsgTWF0aC5hYnMoaSAtIHkpOwogICAgICBUID4gMSAmJiBzW0EgKiBvICsgd10gPiBlIHx8IFQgPiBoID8gKHAobSwgeSwgZCwgaSwgdywgQSksIHAoZywgdiwgbSwgeSwgdywgQSkpIDogKHJbaSAqIG8gKyBkXSA9IHJbaSAqIG8gKyBkXSB8fCArK2YsIHJbdiAqIG8gKyBnXSA9IHJbdiAqIG8gKyBnXSB8fCArK2YsIHJbeSAqIG8gKyBtXSA9IHJbeSAqIG8gKyBtXSB8fCArK2YsIGMrKyk7CiAgICB9CiAgICBwKDAsIDAsIHUsIHUsIHUsIDApLCBwKHUsIHUsIDAsIDAsIDAsIHUpOwogICAgY29uc3QgbCA9IG5ldyBVaW50MTZBcnJheShmICogMiksIGEgPSBuZXcgVWludDMyQXJyYXkoYyAqIDMpOwogICAgbGV0IGIgPSAwOwogICAgZnVuY3Rpb24gaihkLCBpLCBnLCB2LCBtLCB5KSB7CiAgICAgIGNvbnN0IHcgPSBkICsgZyA+PiAxLCBBID0gaSArIHYgPj4gMSwgVCA9IE1hdGguYWJzKGQgLSBtKSArIE1hdGguYWJzKGkgLSB5KTsKICAgICAgaWYgKFQgPiAxICYmIHNbQSAqIG8gKyB3XSA+IGUgfHwgVCA+IGgpCiAgICAgICAgaihtLCB5LCBkLCBpLCB3LCBBKSwgaihnLCB2LCBtLCB5LCB3LCBBKTsKICAgICAgZWxzZSB7CiAgICAgICAgY29uc3QgSSA9IHJbaSAqIG8gKyBkXSAtIDEsIHogPSByW3YgKiBvICsgZ10gLSAxLCBTID0gclt5ICogbyArIG1dIC0gMTsKICAgICAgICBsWzIgKiBJXSA9IGQsIGxbMiAqIEkgKyAxXSA9IGksIGxbMiAqIHpdID0gZywgbFsyICogeiArIDFdID0gdiwgbFsyICogU10gPSBtLCBsWzIgKiBTICsgMV0gPSB5LCBhW2IrK10gPSBJLCBhW2IrK10gPSB6LCBhW2IrK10gPSBTOwogICAgICB9CiAgICB9CiAgICByZXR1cm4gaigwLCAwLCB1LCB1LCB1LCAwKSwgaih1LCB1LCAwLCAwLCAwLCB1KSwgeyB2ZXJ0aWNlczogbCwgdHJpYW5nbGVzOiBhIH07CiAgfQp9CmZ1bmN0aW9uIFgobiwgZSwgdCwgbykgewogIGNvbnN0IHIgPSBuLnNoYXBlWzBdICsgMSwgcyA9IG5ldyBGbG9hdDMyQXJyYXkociAqIHIpLCBmID0gbi5zaGFwZVswXTsKICBlID0gZSA/PyAwLjEsIHQgPSB0ID8/IC0xZTQ7CiAgZm9yIChsZXQgYyA9IDA7IGMgPCBmOyBjKyspCiAgICBmb3IgKGxldCB1ID0gMDsgdSA8IGY7IHUrKykgewogICAgICBjb25zdCBoID0gYywgcCA9IG4uZ2V0KHUsIGgsIDApLCBsID0gbi5nZXQodSwgaCwgMSksIGEgPSBuLmdldCh1LCBoLCAyKSwgYiA9IHAgKiAyNTYgKiAyNTYgKiBlICsgbCAqIDI1NiAqIGUgKyBhICogZSArIHQ7CiAgICAgIHAgPT09IDAgJiYgbCA9PT0gMCAmJiBhID09PSAwICYmIHR5cGVvZiBvID09ICJudW1iZXIiID8gc1tjICogciArIHVdID0gbyA6IHNbYyAqIHIgKyB1XSA9IGI7CiAgICB9CiAgZm9yIChsZXQgYyA9IDA7IGMgPCByIC0gMTsgYysrKQogICAgc1tyICogKHIgLSAxKSArIGNdID0gc1tyICogKHIgLSAyKSArIGNdOwogIGZvciAobGV0IGMgPSAwOyBjIDwgcjsgYysrKQogICAgc1tyICogYyArIHIgLSAxXSA9IHNbciAqIGMgKyByIC0gMl07CiAgcmV0dXJuIHM7Cn0KZnVuY3Rpb24gWShuLCBlLCB0KSB7CiAgY29uc3QgbyA9IFtdLCByID0gW10sIHMgPSBbXSwgZiA9IFtdLCBjID0gW10sIHUgPSBbXSwgaCA9IFtdOwogIGxldCBwID0gMSAvIDAsIGwgPSAtMSAvIDA7CiAgY29uc3QgYSA9IDMyNzY4IC8gdDsKICBmb3IgKGxldCBnID0gMDsgZyA8IGUudmVydGljZXMubGVuZ3RoIC8gMjsgZysrKSB7CiAgICBjb25zdCB2ID0gZywgbSA9IGUudmVydGljZXNbZyAqIDJdLCB5ID0gZS52ZXJ0aWNlc1tnICogMiArIDFdLCB3ID0gbi50ZXJyYWluW3kgKiAodCArIDEpICsgbV07CiAgICB3ID4gbCAmJiAobCA9IHcpLCB3IDwgcCAmJiAocCA9IHcpLCBzLnB1c2godyksIHkgPT0gMCAmJiBmLnB1c2godiksIHkgPT0gdCAmJiBjLnB1c2godiksIG0gPT0gMCAmJiBoLnB1c2godiksIG0gPT0gdCAmJiB1LnB1c2godik7CiAgICBsZXQgQSA9IG0gKiBhLCBUID0gKHQgLSB5KSAqIGE7CiAgICBvLnB1c2goQSksIHIucHVzaChUKTsKICB9CiAgY29uc3QgYiA9IGwgLSBwLCBqID0gcy5tYXAoKGcpID0+IGIgPCAxID8gMCA6IChnIC0gcCkgKiAoMzI3NjcgLyBiKSksIGQgPSBuZXcgVWludDE2QXJyYXkoZS50cmlhbmdsZXMpLCBpID0gbmV3IFVpbnQxNkFycmF5KAogICAgLy92ZXJ0cwogICAgWy4uLm8sIC4uLnIsIC4uLmpdCiAgKTsKICByZXR1cm4gewogICAgbWluaW11bUhlaWdodDogcCwKICAgIG1heGltdW1IZWlnaHQ6IGwsCiAgICBxdWFudGl6ZWRWZXJ0aWNlczogaSwKICAgIGluZGljZXM6IGQsCiAgICB3ZXN0SW5kaWNlczogaCwKICAgIHNvdXRoSW5kaWNlczogYywKICAgIGVhc3RJbmRpY2VzOiB1LAogICAgbm9ydGhJbmRpY2VzOiBmCiAgfTsKfQpsZXQgeDsKZnVuY3Rpb24gWihuKSB7CiAgY29uc3QgeyBpbWFnZURhdGE6IGUsIHRpbGVTaXplOiB0ID0gMjU2LCBlcnJvckxldmVsOiBvLCBpbnRlcnZhbDogciwgb2Zmc2V0OiBzLCBub0RhdGFIZWlnaHQ6IGYgfSA9IG4sIGMgPSBKKAogICAgbmV3IFVpbnQ4QXJyYXkoZSksCiAgICBbdCwgdCwgNF0sCiAgICBbNCwgNCAqIHQsIDFdLAogICAgMAogICk7CiAgeCA/PyAoeCA9IG5ldyBLKHQgKyAxKSk7CiAgY29uc3QgdSA9IFgoYywgciwgcywgZiksIGggPSB4LmNyZWF0ZVRpbGUodSksIHAgPSBoLmdldE1lc2gobywgbi5tYXhMZW5ndGgpOwogIHJldHVybiBZKGgsIHAsIHQpOwp9CmNvbnN0IFUgPSBzZWxmOwpVLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG4pIHsKICBjb25zdCB7IGlkOiBlLCBwYXlsb2FkOiB0IH0gPSBuLmRhdGE7CiAgaWYgKGUgPT0gbnVsbCkKICAgIHJldHVybjsKICBsZXQgbyA9IFtdLCByID0gbnVsbDsKICB0cnkgewogICAgciA9IFoodCksIG8ucHVzaChyLmluZGljZXMuYnVmZmVyKSwgby5wdXNoKHIucXVhbnRpemVkVmVydGljZXMuYnVmZmVyKSwgVS5wb3N0TWVzc2FnZSh7IGlkOiBlLCBwYXlsb2FkOiByIH0sIG8pOwogIH0gY2F0Y2ggKHMpIHsKICAgIFUucG9zdE1lc3NhZ2UoeyBpZDogZSwgZXJyOiBTdHJpbmcocykgfSk7CiAgfSBmaW5hbGx5IHsKICAgIHIgPSBudWxsLCBvID0gW107CiAgfQp9Owo=", k = typeof window < "u" && window.Blob && new Blob([atob(D)], { type: "text/javascript;charset=utf-8" });
function q() {
  let t;
  try {
    if (t = k && (window.URL || window.webkitURL).createObjectURL(k), !t)
      throw "";
    return new Worker(t);
  } catch {
    return new Worker("data:application/javascript;base64," + D, { type: "module" });
  } finally {
    t && (window.URL || window.webkitURL).revokeObjectURL(t);
  }
}
const V = {}, Y = {};
let _ = 0;
async function $(t, I, i) {
  const e = _++, g = {
    id: e,
    payload: I
  };
  return new Promise(function(r, c) {
    V[e] = r, Y[e] = c, t.postMessage(g, i);
  });
}
function II(t) {
  const { id: I, err: i, payload: e } = t.data;
  if (e) {
    const g = V[I];
    g && g(e);
  } else {
    const g = Y[I];
    g && g(i || "Got nothing");
  }
  delete V[I], delete Y[I];
}
class iI {
  constructor(I = new q()) {
    A(this, "worker");
    this.worker = I, this.worker.onmessage = II;
  }
  /**
   * todo:完善泛型提示
   * @param params 
   * @param transferableObjects 
   * @returns 
   */
  async scheduleTask(I, i) {
    return await $(this.worker, I, i);
  }
}
function gI(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function tI(t) {
  for (var I = new Array(t), i = 0; i < t; ++i)
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
var rI = function(t) {
  return t != null && (M(t) || sI(t) || !!t._isBuffer);
};
function M(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function sI(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && M(t.slice(0, 0));
}
var oI = eI, CI = rI, nI = typeof Float64Array < "u";
function cI(t, I) {
  return t[0] - I[0];
}
function aI() {
  var t = this.stride, I = new Array(t.length), i;
  for (i = 0; i < I.length; ++i)
    I[i] = [Math.abs(t[i]), i];
  I.sort(cI);
  var e = new Array(I.length);
  for (i = 0; i < e.length; ++i)
    e[i] = I[i][1];
  return e;
}
function AI(t, I) {
  var i = ["View", I, "d", t].join("");
  I < 0 && (i = "View_Nil" + t);
  var e = t === "generic";
  if (I === -1) {
    var g = "function " + i + "(a){this.data=a;};var proto=" + i + ".prototype;proto.dtype='" + t + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + i + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + i + "(a){return new " + i + "(a);}", m = new Function(g);
    return m();
  } else if (I === 0) {
    var g = "function " + i + "(a,d) {this.data = a;this.offset = d};var proto=" + i + ".prototype;proto.dtype='" + t + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + i + "_copy() {return new " + i + "(this.data,this.offset)};proto.pick=function " + i + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + i + "_get(){return " + (e ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + i + "_set(v){return " + (e ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + i + "(a,b,c,d){return new " + i + "(a,d)}", m = new Function("TrivialArray", g);
    return m(S[t][0]);
  }
  var g = ["'use strict'"], r = oI(I), c = r.map(function(o) {
    return "i" + o;
  }), C = "this.offset+" + r.map(function(o) {
    return "this.stride[" + o + "]*i" + o;
  }).join("+"), n = r.map(function(o) {
    return "b" + o;
  }).join(","), a = r.map(function(o) {
    return "c" + o;
  }).join(",");
  g.push(
    "function " + i + "(a," + n + "," + a + ",d){this.data=a",
    "this.shape=[" + n + "]",
    "this.stride=[" + a + "]",
    "this.offset=d|0}",
    "var proto=" + i + ".prototype",
    "proto.dtype='" + t + "'",
    "proto.dimension=" + I
  ), g.push(
    "Object.defineProperty(proto,'size',{get:function " + i + "_size(){return " + r.map(function(o) {
      return "this.shape[" + o + "]";
    }).join("*"),
    "}})"
  ), I === 1 ? g.push("proto.order=[0]") : (g.push("Object.defineProperty(proto,'order',{get:"), I < 4 ? (g.push("function " + i + "_order(){"), I === 2 ? g.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : I === 3 && g.push(
    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
  )) : g.push("ORDER})")), g.push(
    "proto.set=function " + i + "_set(" + c.join(",") + ",v){"
  ), e ? g.push("return this.data.set(" + C + ",v)}") : g.push("return this.data[" + C + "]=v}"), g.push("proto.get=function " + i + "_get(" + c.join(",") + "){"), e ? g.push("return this.data.get(" + C + ")}") : g.push("return this.data[" + C + "]}"), g.push(
    "proto.index=function " + i + "_index(",
    c.join(),
    "){return " + C + "}"
  ), g.push("proto.hi=function " + i + "_hi(" + c.join(",") + "){return new " + i + "(this.data," + r.map(function(o) {
    return ["(typeof i", o, "!=='number'||i", o, "<0)?this.shape[", o, "]:i", o, "|0"].join("");
  }).join(",") + "," + r.map(function(o) {
    return "this.stride[" + o + "]";
  }).join(",") + ",this.offset)}");
  var l = r.map(function(o) {
    return "a" + o + "=this.shape[" + o + "]";
  }), u = r.map(function(o) {
    return "c" + o + "=this.stride[" + o + "]";
  });
  g.push("proto.lo=function " + i + "_lo(" + c.join(",") + "){var b=this.offset,d=0," + l.join(",") + "," + u.join(","));
  for (var s = 0; s < I; ++s)
    g.push(
      "if(typeof i" + s + "==='number'&&i" + s + ">=0){d=i" + s + "|0;b+=c" + s + "*d;a" + s + "-=d}"
    );
  g.push("return new " + i + "(this.data," + r.map(function(o) {
    return "a" + o;
  }).join(",") + "," + r.map(function(o) {
    return "c" + o;
  }).join(",") + ",b)}"), g.push("proto.step=function " + i + "_step(" + c.join(",") + "){var " + r.map(function(o) {
    return "a" + o + "=this.shape[" + o + "]";
  }).join(",") + "," + r.map(function(o) {
    return "b" + o + "=this.stride[" + o + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
  for (var s = 0; s < I; ++s)
    g.push(
      "if(typeof i" + s + "==='number'){d=i" + s + "|0;if(d<0){c+=b" + s + "*(a" + s + "-1);a" + s + "=ceil(-a" + s + "/d)}else{a" + s + "=ceil(a" + s + "/d)}b" + s + "*=d}"
    );
  g.push("return new " + i + "(this.data," + r.map(function(o) {
    return "a" + o;
  }).join(",") + "," + r.map(function(o) {
    return "b" + o;
  }).join(",") + ",c)}");
  for (var d = new Array(I), p = new Array(I), s = 0; s < I; ++s)
    d[s] = "a[i" + s + "]", p[s] = "b[i" + s + "]";
  g.push(
    "proto.transpose=function " + i + "_transpose(" + c + "){" + c.map(function(o, h) {
      return o + "=(" + o + "===undefined?" + h + ":" + o + "|0)";
    }).join(";"),
    "var a=this.shape,b=this.stride;return new " + i + "(this.data," + d.join(",") + "," + p.join(",") + ",this.offset)}"
  ), g.push("proto.pick=function " + i + "_pick(" + c + "){var a=[],b=[],c=this.offset");
  for (var s = 0; s < I; ++s)
    g.push("if(typeof i" + s + "==='number'&&i" + s + ">=0){c=(c+this.stride[" + s + "]*i" + s + ")|0}else{a.push(this.shape[" + s + "]);b.push(this.stride[" + s + "])}");
  g.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), g.push("return function construct_" + i + "(data,shape,stride,offset){return new " + i + "(data," + r.map(function(o) {
    return "shape[" + o + "]";
  }).join(",") + "," + r.map(function(o) {
    return "stride[" + o + "]";
  }).join(",") + ",offset)}");
  var m = new Function("CTOR_LIST", "ORDER", g.join(`
`));
  return m(S[t], aI);
}
function lI(t) {
  if (CI(t))
    return "buffer";
  if (nI)
    switch (Object.prototype.toString.call(t)) {
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
  return Array.isArray(t) ? "array" : "generic";
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
function uI(t, I, i, e) {
  if (t === void 0) {
    var a = S.array[0];
    return a([]);
  } else
    typeof t == "number" && (t = [t]);
  I === void 0 && (I = [t.length]);
  var g = I.length;
  if (i === void 0) {
    i = new Array(g);
    for (var r = g - 1, c = 1; r >= 0; --r)
      i[r] = c, c *= I[r];
  }
  if (e === void 0) {
    e = 0;
    for (var r = 0; r < g; ++r)
      i[r] < 0 && (e -= (I[r] - 1) * i[r]);
  }
  for (var C = lI(t), n = S[C]; n.length <= g + 1; )
    n.push(AI(C, n.length - 1));
  var a = n[g + 1];
  return a(t, I, i, e);
}
var dI = uI;
const mI = /* @__PURE__ */ gI(dI);
class hI {
  constructor(I = 257) {
    A(this, "gridSize");
    A(this, "numTriangles");
    A(this, "numParentTriangles");
    A(this, "indices");
    A(this, "coords");
    this.gridSize = I;
    const i = I - 1;
    if (i & i - 1)
      throw new Error(
        `Expected grid size to be 2^n+1, got ${I}.`
      );
    this.numTriangles = i * i * 2 - 2, this.numParentTriangles = this.numTriangles - i * i, this.indices = new Uint32Array(this.gridSize * this.gridSize), this.coords = new Uint16Array(this.numTriangles * 4);
    for (let e = 0; e < this.numTriangles; e++) {
      let g = e + 2, r = 0, c = 0, C = 0, n = 0, a = 0, l = 0;
      for (g & 1 ? C = n = a = i : r = c = l = i; (g >>= 1) > 1; ) {
        const s = r + C >> 1, d = c + n >> 1;
        g & 1 ? (C = r, n = c, r = a, c = l) : (r = C, c = n, C = a, n = l), a = s, l = d;
      }
      const u = e * 4;
      this.coords[u + 0] = r, this.coords[u + 1] = c, this.coords[u + 2] = C, this.coords[u + 3] = n;
    }
  }
  createTile(I) {
    return new yI(I, this);
  }
}
class yI {
  constructor(I, i) {
    A(this, "terrain");
    A(this, "martini");
    A(this, "errors");
    const e = i.gridSize;
    if (I.length !== e * e)
      throw new Error(
        `Expected terrain data of length ${e * e} (${e} x ${e}), got ${I.length}.`
      );
    this.terrain = I, this.martini = i, this.errors = new Float32Array(I.length), this.update();
  }
  update() {
    const { numTriangles: I, numParentTriangles: i, coords: e, gridSize: g } = this.martini, { terrain: r, errors: c } = this;
    for (let C = I - 1; C >= 0; C--) {
      const n = C * 4, a = e[n + 0], l = e[n + 1], u = e[n + 2], s = e[n + 3], d = a + u >> 1, p = l + s >> 1, m = d + p - l, o = p + a - d, h = (r[l * g + a] + r[s * g + u]) / 2, y = p * g + d, b = Math.abs(h - r[y]);
      if (c[y] = Math.max(c[y], b), C < i) {
        const B = (l + o >> 1) * g + (a + m >> 1), G = (s + o >> 1) * g + (u + m >> 1);
        c[y] = Math.max(c[y], c[B], c[G]);
      }
    }
  }
  getMesh(I = 0, i) {
    const { gridSize: e, indices: g } = this.martini, { errors: r } = this;
    let c = 0, C = 0;
    const n = e - 1, a = i || e;
    g.fill(0);
    function l(m, o, h, y, b, B) {
      const G = m + h >> 1, K = o + y >> 1, Z = Math.abs(m - b) + Math.abs(o - B);
      Z > 1 && r[K * e + G] > I || Z > a ? (l(b, B, m, o, G, K), l(h, y, b, B, G, K)) : (g[o * e + m] = g[o * e + m] || ++c, g[y * e + h] = g[y * e + h] || ++c, g[B * e + b] = g[B * e + b] || ++c, C++);
    }
    l(0, 0, n, n, n, 0), l(n, n, 0, 0, 0, n);
    const u = new Uint16Array(c * 2), s = new Uint32Array(C * 3);
    let d = 0;
    function p(m, o, h, y, b, B) {
      const G = m + h >> 1, K = o + y >> 1, Z = Math.abs(m - b) + Math.abs(o - B);
      if (Z > 1 && r[K * e + G] > I || Z > a)
        p(b, B, m, o, G, K), p(h, y, b, B, G, K);
      else {
        const w = g[o * e + m] - 1, X = g[y * e + h] - 1, f = g[B * e + b] - 1;
        u[2 * w] = m, u[2 * w + 1] = o, u[2 * X] = h, u[2 * X + 1] = y, u[2 * f] = b, u[2 * f + 1] = B, s[d++] = w, s[d++] = X, s[d++] = f;
      }
    }
    return p(0, 0, n, n, n, 0), p(n, n, 0, 0, 0, n), { vertices: u, triangles: s };
  }
}
function BI(t, I, i, e) {
  const g = t.shape[0] + 1, r = new Float32Array(g * g), c = t.shape[0];
  I = I ?? 0.1, i = i ?? -1e4;
  for (let C = 0; C < c; C++)
    for (let n = 0; n < c; n++) {
      const a = C, l = t.get(n, a, 0), u = t.get(n, a, 1), s = t.get(n, a, 2), d = l * 256 * 256 * I + u * 256 * I + s * I + i;
      l === 0 && u === 0 && s === 0 && typeof e == "number" ? r[C * g + n] = e : r[C * g + n] = d;
    }
  for (let C = 0; C < g - 1; C++)
    r[g * (g - 1) + C] = r[g * (g - 2) + C];
  for (let C = 0; C < g; C++)
    r[g * C + g - 1] = r[g * C + g - 2];
  return r;
}
function bI(t) {
  t = Math.max(t, 2);
  const I = Math.pow(t - 1, 2) * 2, i = Math.pow(t, 2), e = new Uint16Array(i * 3), g = new Uint16Array(I * 3), r = [], c = [], C = [], n = [];
  let a = 0;
  for (let l = 0; l < i; l++) {
    let u = l % t, s = Math.floor(l / t);
    const d = t * u + s;
    e[d] = u * 32768 / (t - 1), e[i + d] = s * 32768 / (t - 1), e[2 * i + d] = 0, s == 0 && r.push(d), u == 0 && c.push(d), u == t - 1 && C.push(d), s == t - 1 && n.push(d);
    const p = l - s * t;
    p != t - 1 && (g[a * 3] = l, g[a * 3 + 1] = l + t + 1, g[a * 3 + 2] = l + 1, a++), p != 0 && (g[a * 3] = l - 1, g[a * 3 + 1] = l + t - 1, g[a * 3 + 2] = l + t, a++);
  }
  return {
    minimumHeight: 0,
    maximumHeight: 0,
    quantizedVertices: e,
    indices: g,
    westIndices: r,
    southIndices: c,
    eastIndices: C,
    northIndices: n
  };
}
let L = [];
function pI(t) {
  if (t in L)
    return L[t];
  {
    const I = bI(t);
    return L[t] = I, I;
  }
}
function GI(t, I, i) {
  const e = [], g = [], r = [], c = [], C = [], n = [], a = [];
  let l = 1 / 0, u = -1 / 0;
  const s = 32768 / i;
  for (let h = 0; h < I.vertices.length / 2; h++) {
    const y = h, b = I.vertices[h * 2], B = I.vertices[h * 2 + 1], G = t.terrain[B * (i + 1) + b];
    G > u && (u = G), G < l && (l = G), r.push(G), B == 0 && c.push(y), B == i && C.push(y), b == 0 && a.push(y), b == i && n.push(y);
    let K = b * s, Z = (i - B) * s;
    e.push(K), g.push(Z);
  }
  const d = u - l, p = r.map((h) => d < 1 ? 0 : (h - l) * (32767 / d)), m = new Uint16Array(I.triangles), o = new Uint16Array(
    //verts
    [...e, ...g, ...p]
  );
  return {
    minimumHeight: l,
    maximumHeight: u,
    quantizedVertices: o,
    indices: m,
    westIndices: a,
    southIndices: C,
    eastIndices: n,
    northIndices: c
  };
}
let J;
function KI(t) {
  const { imageData: I, tileSize: i = 256, errorLevel: e, interval: g, offset: r, noDataHeight: c } = t, C = mI(
    new Uint8Array(I),
    [i, i, 4],
    [4, 4 * i, 1],
    0
  );
  J ?? (J = new hI(i + 1));
  const n = BI(C, g, r, c), a = J.createTile(n), l = a.getMesh(e, t.maxLength);
  return GI(a, l, i);
}
class ZI extends v {
  tileXYToRectangle(I, i, e, g) {
    let r = super.tileXYToRectangle(I, i, e);
    return i == 0 && (r.north = Math.PI / 2), i + 1 == Math.pow(2, e) && (r.south = -Math.PI / 2), r;
  }
}
class XI {
  constructor(I) {
    A(this, "hasWaterMask", !1);
    A(this, "hasVertexNormals", !1);
    A(this, "credit", new F("Mapbox"));
    A(this, "ready");
    A(this, "readyPromise");
    A(this, "errorEvent", new N());
    A(this, "tilingScheme");
    A(this, "ellipsoid");
    A(this, "workerFarm", null);
    A(this, "inProgressWorkers", 0);
    A(this, "levelOfDetailScalar");
    A(this, "maxWorkers", 5);
    A(this, "minError", 0.1);
    A(this, "minZoomLevel");
    A(this, "fillPoles", !0);
    A(this, "_errorAtMinZoom", 1e3);
    A(this, "resource");
    A(this, "interval");
    A(this, "offset");
    A(this, "RADIUS_SCALAR", 1);
    A(this, "requestVertexNormals");
    A(this, "requestWaterMask");
    A(this, "availability", !1);
    A(this, "retryCallback");
    A(this, "retryAttempts");
    A(this, "noDataHeight");
    this.retryAttempts = I == null ? void 0 : I.retryAttempts, this.retryCallback = I == null ? void 0 : I.retryCallback, this.noDataHeight = I == null ? void 0 : I.noDataHeight, this.resource = new U({ url: I.url, retryAttempts: this.retryAttempts, retryCallback: this.retryCallback }), this.interval = I.interval ?? 0.1, this.offset = I.offset ?? -1e4, this.maxWorkers = I.maxWorkers ?? 5, this.minZoomLevel = I.minZoomLevel ?? 3, this.fillPoles = I.fillPoles ?? !0, this.levelOfDetailScalar = (I.detailScalar ?? 4) + T.EPSILON5, this.ready = !0, this.availability = !0, this.readyPromise = Promise.resolve(!0), this.minError = I.minimumErrorLevel ?? 0.1, this.requestVertexNormals = I.requestVertexNormals, this.requestWaterMask = I.requestWaterMask, this.errorEvent.addEventListener(console.log, this), this.ellipsoid = I.ellipsoid ?? Q.WGS84, this.maxWorkers > 0 && (this.workerFarm = new iI());
    let i = v;
    this.fillPoles && (i = ZI), this.tilingScheme = new i({
      numberOfLevelZeroTilesX: 1,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: this.ellipsoid
    }), this._errorAtMinZoom = this.errorAtZoom(this.minZoomLevel);
  }
  requestTileGeometry(I, i, e, g) {
    if (e < this.minZoomLevel || this.scaledErrorForTile(I, i, e) > this._errorAtMinZoom)
      return Promise.resolve(this.emptyMesh(I, i, e));
    if (!(this.inProgressWorkers > this.maxWorkers))
      return this.inProgressWorkers += 1, this.processTile(I, i, e).finally(() => {
        this.inProgressWorkers -= 1;
      });
  }
  async processTile(I, i, e) {
    try {
      const { tileSize: g, getTilePixels: r } = this.resource;
      let c = await r({ x: I, y: i, z: e });
      if (!c)
        throw Error(`no pixels at x: ${I}, y: ${i}, z: ${e}`);
      let C = c.data;
      const n = this.tilingScheme.tileXYToRectangle(I, i, e), a = this.errorAtZoom(e);
      let l = this.maxVertexDistance(n);
      const u = {
        imageData: C,
        maxLength: l,
        x: I,
        y: i,
        z: e,
        errorLevel: a,
        ellipsoidRadius: this.ellipsoid.maximumRadius,
        tileSize: g,
        interval: this.interval,
        offset: this.offset,
        noDataHeight: this.noDataHeight
      };
      let s;
      return this.workerFarm != null ? s = await this.workerFarm.scheduleTask(u, [C.buffer]) : s = KI(u), C = void 0, c = void 0, this.createQuantizedMeshData(n, a, s);
    } catch {
      return this.emptyMesh(I, i, e);
    }
  }
  errorAtZoom(I) {
    return Math.max(
      this.getLevelMaximumGeometricError(I) / this.levelOfDetailScalar,
      this.minError
    );
  }
  scaledErrorForTile(I, i, e) {
    const g = this.tilingScheme.tileXYToRectangle(I, i, e), r = H.center(g);
    return this.errorAtZoom(e) / Math.pow(1 - Math.sin(r.latitude), 2);
  }
  maxVertexDistance(I) {
    return Math.ceil(2 / I.height);
  }
  emptyMesh(I, i, e) {
    const g = this.tilingScheme.tileXYToRectangle(I, i, e), r = H.center(g), c = Math.min(Math.abs(Math.sin(r.latitude)), 0.995);
    let C = Math.max(
      Math.ceil(200 / (e + 1) * Math.pow(1 - c, 0.25)),
      4
    );
    const n = pI(C), a = this.errorAtZoom(e);
    return this.createQuantizedMeshData(g, a, n);
  }
  createQuantizedMeshData(I, i, e) {
    const {
      minimumHeight: g,
      maximumHeight: r,
      quantizedVertices: c,
      indices: C,
      westIndices: n,
      southIndices: a,
      eastIndices: l,
      northIndices: u
    } = e, d = i * 20, p = H.center(I), m = I.width / 2;
    let h = Math.cos(m) * this.ellipsoid.maximumRadius + r;
    m > Math.PI / 4 && (h = (1 + m) * this.ellipsoid.maximumRadius);
    const y = new W(
      p.longitude,
      p.latitude,
      h
      // Scaling factor of two just to be sure.
    ), b = this.ellipsoid.transformPositionToScaledSpace(
      W.toCartesian(y)
    );
    let B = j.fromRectangle(
      I,
      g,
      r,
      this.tilingScheme.ellipsoid
    ), G = x.fromOrientedBoundingBox(B);
    return new E({
      minimumHeight: g,
      maximumHeight: r,
      quantizedVertices: c,
      indices: C,
      boundingSphere: G,
      orientedBoundingBox: B,
      horizonOcclusionPoint: b,
      westIndices: n,
      southIndices: a,
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
    ), e = this.resource.tileSize / 256;
    return i / e / (1 << I);
  }
  getTileDataAvailable(I, i, e) {
    return this.resource.getTileDataAvailable({ x: I, y: i, z: e });
  }
}
export {
  U as DefaultHeightmapResource,
  XI as MartiniTerrainProvider,
  iI as WorkerFarm
};
