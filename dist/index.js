import { Resource as D, Credit as R, Event as z, Math as F, Ellipsoid as P, Rectangle as f, Cartographic as Y, OrientedBoundingBox as N, BoundingSphere as j, QuantizedMeshTerrainData as Q, TerrainProvider as T, WebMercatorTilingScheme as W } from "cesium";
class x {
  constructor(I) {
    this.tileSize = 256, this.skipOddLevels = !1, this.getTilePixels = async (i) => {
      const t = await this.loadImage(i);
      return this.getPixels(t);
    }, this.resource = D.createIfNeeded(I.url), this.skipOddLevels = I.skipOddLevels ?? !1, this.tileSize = I.tileSize ?? 256, this.maxZoom = I.maxZoom ?? 15, this.contextQueue = [], this.retryAttempts = I == null ? void 0 : I.retryAttempts, this.retryCallback = I == null ? void 0 : I.retryCallback;
  }
  getCanvas() {
    let I = this.contextQueue.pop();
    if (I == null) {
      const i = document.createElement("canvas");
      i.width = this.tileSize, i.height = this.tileSize;
      const t = i.getContext("2d");
      t && (I = {
        canvas: i,
        context: t
      });
    }
    return I;
  }
  getPixels(I) {
    const i = this.getCanvas();
    if (!i || !I)
      return;
    const { context: t } = i;
    t.drawImage(I, 0, 0, this.tileSize, this.tileSize);
    const g = t.getImageData(0, 0, this.tileSize, this.tileSize);
    return t.clearRect(0, 0, this.tileSize, this.tileSize), this.contextQueue.push(i), g;
  }
  loadImage(I) {
    var g;
    const { z: i, y: t } = I;
    return (g = this.resource) == null ? void 0 : g.getDerivedResource({
      templateValues: {
        ...I,
        reverseY: Math.pow(2, i) - t - 1
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
const M = "ZnVuY3Rpb24gQyhuKSB7CiAgcmV0dXJuIG4gJiYgbi5fX2VzTW9kdWxlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLCAiZGVmYXVsdCIpID8gbi5kZWZhdWx0IDogbjsKfQpmdW5jdGlvbiBPKG4pIHsKICBmb3IgKHZhciBlID0gbmV3IEFycmF5KG4pLCB0ID0gMDsgdCA8IG47ICsrdCkKICAgIGVbdF0gPSB0OwogIHJldHVybiBlOwp9CnZhciBFID0gTzsKLyohCiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXIKICoKICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz4KICogQGxpY2Vuc2UgIE1JVAogKi8KdmFyIEYgPSBmdW5jdGlvbihuKSB7CiAgcmV0dXJuIG4gIT0gbnVsbCAmJiAoeChuKSB8fCBCKG4pIHx8ICEhbi5faXNCdWZmZXIpOwp9OwpmdW5jdGlvbiB4KG4pIHsKICByZXR1cm4gISFuLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBuLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09ICJmdW5jdGlvbiIgJiYgbi5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihuKTsKfQpmdW5jdGlvbiBCKG4pIHsKICByZXR1cm4gdHlwZW9mIG4ucmVhZEZsb2F0TEUgPT0gImZ1bmN0aW9uIiAmJiB0eXBlb2Ygbi5zbGljZSA9PSAiZnVuY3Rpb24iICYmIHgobi5zbGljZSgwLCAwKSk7Cn0KdmFyIFIgPSBFLCBrID0gRiwgRCA9IHR5cGVvZiBGbG9hdDY0QXJyYXkgPCAidSI7CmZ1bmN0aW9uICQobiwgZSkgewogIHJldHVybiBuWzBdIC0gZVswXTsKfQpmdW5jdGlvbiBMKCkgewogIHZhciBuID0gdGhpcy5zdHJpZGUsIGUgPSBuZXcgQXJyYXkobi5sZW5ndGgpLCB0OwogIGZvciAodCA9IDA7IHQgPCBlLmxlbmd0aDsgKyt0KQogICAgZVt0XSA9IFtNYXRoLmFicyhuW3RdKSwgdF07CiAgZS5zb3J0KCQpOwogIHZhciBvID0gbmV3IEFycmF5KGUubGVuZ3RoKTsKICBmb3IgKHQgPSAwOyB0IDwgby5sZW5ndGg7ICsrdCkKICAgIG9bdF0gPSBlW3RdWzFdOwogIHJldHVybiBvOwp9CmZ1bmN0aW9uIFAobiwgZSkgewogIHZhciB0ID0gWyJWaWV3IiwgZSwgImQiLCBuXS5qb2luKCIiKTsKICBlIDwgMCAmJiAodCA9ICJWaWV3X05pbCIgKyBuKTsKICB2YXIgbyA9IG4gPT09ICJnZW5lcmljIjsKICBpZiAoZSA9PT0gLTEpIHsKICAgIHZhciByID0gImZ1bmN0aW9uICIgKyB0ICsgIihhKXt0aGlzLmRhdGE9YTt9O3ZhciBwcm90bz0iICsgdCArICIucHJvdG90eXBlO3Byb3RvLmR0eXBlPSciICsgbiArICInO3Byb3RvLmluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIC0xfTtwcm90by5zaXplPTA7cHJvdG8uZGltZW5zaW9uPS0xO3Byb3RvLnNoYXBlPXByb3RvLnN0cmlkZT1wcm90by5vcmRlcj1bXTtwcm90by5sbz1wcm90by5oaT1wcm90by50cmFuc3Bvc2U9cHJvdG8uc3RlcD1mdW5jdGlvbigpe3JldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSk7fTtwcm90by5nZXQ9cHJvdG8uc2V0PWZ1bmN0aW9uKCl7fTtwcm90by5waWNrPWZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9O3JldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfIiArIHQgKyAiKGEpe3JldHVybiBuZXcgIiArIHQgKyAiKGEpO30iLCBkID0gbmV3IEZ1bmN0aW9uKHIpOwogICAgcmV0dXJuIGQoKTsKICB9IGVsc2UgaWYgKGUgPT09IDApIHsKICAgIHZhciByID0gImZ1bmN0aW9uICIgKyB0ICsgIihhLGQpIHt0aGlzLmRhdGEgPSBhO3RoaXMub2Zmc2V0ID0gZH07dmFyIHByb3RvPSIgKyB0ICsgIi5wcm90b3R5cGU7cHJvdG8uZHR5cGU9JyIgKyBuICsgIic7cHJvdG8uaW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vZmZzZXR9O3Byb3RvLmRpbWVuc2lvbj0wO3Byb3RvLnNpemU9MTtwcm90by5zaGFwZT1wcm90by5zdHJpZGU9cHJvdG8ub3JkZXI9W107cHJvdG8ubG89cHJvdG8uaGk9cHJvdG8udHJhbnNwb3NlPXByb3RvLnN0ZXA9ZnVuY3Rpb24gIiArIHQgKyAiX2NvcHkoKSB7cmV0dXJuIG5ldyAiICsgdCArICIodGhpcy5kYXRhLHRoaXMub2Zmc2V0KX07cHJvdG8ucGljaz1mdW5jdGlvbiAiICsgdCArICJfcGljaygpe3JldHVybiBUcml2aWFsQXJyYXkodGhpcy5kYXRhKTt9O3Byb3RvLnZhbHVlT2Y9cHJvdG8uZ2V0PWZ1bmN0aW9uICIgKyB0ICsgIl9nZXQoKXtyZXR1cm4gIiArIChvID8gInRoaXMuZGF0YS5nZXQodGhpcy5vZmZzZXQpIiA6ICJ0aGlzLmRhdGFbdGhpcy5vZmZzZXRdIikgKyAifTtwcm90by5zZXQ9ZnVuY3Rpb24gIiArIHQgKyAiX3NldCh2KXtyZXR1cm4gIiArIChvID8gInRoaXMuZGF0YS5zZXQodGhpcy5vZmZzZXQsdikiIDogInRoaXMuZGF0YVt0aGlzLm9mZnNldF09diIpICsgIn07cmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF8iICsgdCArICIoYSxiLGMsZCl7cmV0dXJuIG5ldyAiICsgdCArICIoYSxkKX0iLCBkID0gbmV3IEZ1bmN0aW9uKCJUcml2aWFsQXJyYXkiLCByKTsKICAgIHJldHVybiBkKFRbbl1bMF0pOwogIH0KICB2YXIgciA9IFsiJ3VzZSBzdHJpY3QnIl0sIHMgPSBSKGUpLCBmID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJpIiArIGk7CiAgfSksIGMgPSAidGhpcy5vZmZzZXQrIiArIHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiAidGhpcy5zdHJpZGVbIiArIGkgKyAiXSppIiArIGk7CiAgfSkuam9pbigiKyIpLCB1ID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJiIiArIGk7CiAgfSkuam9pbigiLCIpLCBoID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJjIiArIGk7CiAgfSkuam9pbigiLCIpOwogIHIucHVzaCgKICAgICJmdW5jdGlvbiAiICsgdCArICIoYSwiICsgdSArICIsIiArIGggKyAiLGQpe3RoaXMuZGF0YT1hIiwKICAgICJ0aGlzLnNoYXBlPVsiICsgdSArICJdIiwKICAgICJ0aGlzLnN0cmlkZT1bIiArIGggKyAiXSIsCiAgICAidGhpcy5vZmZzZXQ9ZHwwfSIsCiAgICAidmFyIHByb3RvPSIgKyB0ICsgIi5wcm90b3R5cGUiLAogICAgInByb3RvLmR0eXBlPSciICsgbiArICInIiwKICAgICJwcm90by5kaW1lbnNpb249IiArIGUKICApLCByLnB1c2goCiAgICAiT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCdzaXplJyx7Z2V0OmZ1bmN0aW9uICIgKyB0ICsgIl9zaXplKCl7cmV0dXJuICIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICAgIHJldHVybiAidGhpcy5zaGFwZVsiICsgaSArICJdIjsKICAgIH0pLmpvaW4oIioiKSwKICAgICJ9fSkiCiAgKSwgZSA9PT0gMSA/IHIucHVzaCgicHJvdG8ub3JkZXI9WzBdIikgOiAoci5wdXNoKCJPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sJ29yZGVyJyx7Z2V0OiIpLCBlIDwgNCA/IChyLnB1c2goImZ1bmN0aW9uICIgKyB0ICsgIl9vcmRlcigpeyIpLCBlID09PSAyID8gci5wdXNoKCJyZXR1cm4gKE1hdGguYWJzKHRoaXMuc3RyaWRlWzBdKT5NYXRoLmFicyh0aGlzLnN0cmlkZVsxXSkpP1sxLDBdOlswLDFdfX0pIikgOiBlID09PSAzICYmIHIucHVzaCgKICAgICJ2YXIgczA9TWF0aC5hYnModGhpcy5zdHJpZGVbMF0pLHMxPU1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSxzMj1NYXRoLmFicyh0aGlzLnN0cmlkZVsyXSk7aWYoczA+czEpe2lmKHMxPnMyKXtyZXR1cm4gWzIsMSwwXTt9ZWxzZSBpZihzMD5zMil7cmV0dXJuIFsxLDIsMF07fWVsc2V7cmV0dXJuIFsxLDAsMl07fX1lbHNlIGlmKHMwPnMyKXtyZXR1cm4gWzIsMCwxXTt9ZWxzZSBpZihzMj5zMSl7cmV0dXJuIFswLDEsMl07fWVsc2V7cmV0dXJuIFswLDIsMV07fX19KSIKICApKSA6IHIucHVzaCgiT1JERVJ9KSIpKSwgci5wdXNoKAogICAgInByb3RvLnNldD1mdW5jdGlvbiAiICsgdCArICJfc2V0KCIgKyBmLmpvaW4oIiwiKSArICIsdil7IgogICksIG8gPyByLnB1c2goInJldHVybiB0aGlzLmRhdGEuc2V0KCIgKyBjICsgIix2KX0iKSA6IHIucHVzaCgicmV0dXJuIHRoaXMuZGF0YVsiICsgYyArICJdPXZ9IiksIHIucHVzaCgicHJvdG8uZ2V0PWZ1bmN0aW9uICIgKyB0ICsgIl9nZXQoIiArIGYuam9pbigiLCIpICsgIil7IiksIG8gPyByLnB1c2goInJldHVybiB0aGlzLmRhdGEuZ2V0KCIgKyBjICsgIil9IikgOiByLnB1c2goInJldHVybiB0aGlzLmRhdGFbIiArIGMgKyAiXX0iKSwgci5wdXNoKAogICAgInByb3RvLmluZGV4PWZ1bmN0aW9uICIgKyB0ICsgIl9pbmRleCgiLAogICAgZi5qb2luKCksCiAgICAiKXtyZXR1cm4gIiArIGMgKyAifSIKICApLCByLnB1c2goInByb3RvLmhpPWZ1bmN0aW9uICIgKyB0ICsgIl9oaSgiICsgZi5qb2luKCIsIikgKyAiKXtyZXR1cm4gbmV3ICIgKyB0ICsgIih0aGlzLmRhdGEsIiArIHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiBbIih0eXBlb2YgaSIsIGksICIhPT0nbnVtYmVyJ3x8aSIsIGksICI8MCk/dGhpcy5zaGFwZVsiLCBpLCAiXTppIiwgaSwgInwwIl0uam9pbigiIik7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJ0aGlzLnN0cmlkZVsiICsgaSArICJdIjsKICB9KS5qb2luKCIsIikgKyAiLHRoaXMub2Zmc2V0KX0iKTsKICB2YXIgcCA9IHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiAiYSIgKyBpICsgIj10aGlzLnNoYXBlWyIgKyBpICsgIl0iOwogIH0pLCBsID0gcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJjIiArIGkgKyAiPXRoaXMuc3RyaWRlWyIgKyBpICsgIl0iOwogIH0pOwogIHIucHVzaCgicHJvdG8ubG89ZnVuY3Rpb24gIiArIHQgKyAiX2xvKCIgKyBmLmpvaW4oIiwiKSArICIpe3ZhciBiPXRoaXMub2Zmc2V0LGQ9MCwiICsgcC5qb2luKCIsIikgKyAiLCIgKyBsLmpvaW4oIiwiKSk7CiAgZm9yICh2YXIgYSA9IDA7IGEgPCBlOyArK2EpCiAgICByLnB1c2goCiAgICAgICJpZih0eXBlb2YgaSIgKyBhICsgIj09PSdudW1iZXInJiZpIiArIGEgKyAiPj0wKXtkPWkiICsgYSArICJ8MDtiKz1jIiArIGEgKyAiKmQ7YSIgKyBhICsgIi09ZH0iCiAgICApOwogIHIucHVzaCgicmV0dXJuIG5ldyAiICsgdCArICIodGhpcy5kYXRhLCIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImEiICsgaTsKICB9KS5qb2luKCIsIikgKyAiLCIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImMiICsgaTsKICB9KS5qb2luKCIsIikgKyAiLGIpfSIpLCByLnB1c2goInByb3RvLnN0ZXA9ZnVuY3Rpb24gIiArIHQgKyAiX3N0ZXAoIiArIGYuam9pbigiLCIpICsgIil7dmFyICIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImEiICsgaSArICI9dGhpcy5zaGFwZVsiICsgaSArICJdIjsKICB9KS5qb2luKCIsIikgKyAiLCIgKyBzLm1hcChmdW5jdGlvbihpKSB7CiAgICByZXR1cm4gImIiICsgaSArICI9dGhpcy5zdHJpZGVbIiArIGkgKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIixjPXRoaXMub2Zmc2V0LGQ9MCxjZWlsPU1hdGguY2VpbCIpOwogIGZvciAodmFyIGEgPSAwOyBhIDwgZTsgKythKQogICAgci5wdXNoKAogICAgICAiaWYodHlwZW9mIGkiICsgYSArICI9PT0nbnVtYmVyJyl7ZD1pIiArIGEgKyAifDA7aWYoZDwwKXtjKz1iIiArIGEgKyAiKihhIiArIGEgKyAiLTEpO2EiICsgYSArICI9Y2VpbCgtYSIgKyBhICsgIi9kKX1lbHNle2EiICsgYSArICI9Y2VpbChhIiArIGEgKyAiL2QpfWIiICsgYSArICIqPWR9IgogICAgKTsKICByLnB1c2goInJldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJhIiArIGk7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJiIiArIGk7CiAgfSkuam9pbigiLCIpICsgIixjKX0iKTsKICBmb3IgKHZhciBiID0gbmV3IEFycmF5KGUpLCBqID0gbmV3IEFycmF5KGUpLCBhID0gMDsgYSA8IGU7ICsrYSkKICAgIGJbYV0gPSAiYVtpIiArIGEgKyAiXSIsIGpbYV0gPSAiYltpIiArIGEgKyAiXSI7CiAgci5wdXNoKAogICAgInByb3RvLnRyYW5zcG9zZT1mdW5jdGlvbiAiICsgdCArICJfdHJhbnNwb3NlKCIgKyBmICsgIil7IiArIGYubWFwKGZ1bmN0aW9uKGksIGcpIHsKICAgICAgcmV0dXJuIGkgKyAiPSgiICsgaSArICI9PT11bmRlZmluZWQ/IiArIGcgKyAiOiIgKyBpICsgInwwKSI7CiAgICB9KS5qb2luKCI7IiksCiAgICAidmFyIGE9dGhpcy5zaGFwZSxiPXRoaXMuc3RyaWRlO3JldHVybiBuZXcgIiArIHQgKyAiKHRoaXMuZGF0YSwiICsgYi5qb2luKCIsIikgKyAiLCIgKyBqLmpvaW4oIiwiKSArICIsdGhpcy5vZmZzZXQpfSIKICApLCByLnB1c2goInByb3RvLnBpY2s9ZnVuY3Rpb24gIiArIHQgKyAiX3BpY2soIiArIGYgKyAiKXt2YXIgYT1bXSxiPVtdLGM9dGhpcy5vZmZzZXQiKTsKICBmb3IgKHZhciBhID0gMDsgYSA8IGU7ICsrYSkKICAgIHIucHVzaCgiaWYodHlwZW9mIGkiICsgYSArICI9PT0nbnVtYmVyJyYmaSIgKyBhICsgIj49MCl7Yz0oYyt0aGlzLnN0cmlkZVsiICsgYSArICJdKmkiICsgYSArICIpfDB9ZWxzZXthLnB1c2godGhpcy5zaGFwZVsiICsgYSArICJdKTtiLnB1c2godGhpcy5zdHJpZGVbIiArIGEgKyAiXSl9Iik7CiAgci5wdXNoKCJ2YXIgY3Rvcj1DVE9SX0xJU1RbYS5sZW5ndGgrMV07cmV0dXJuIGN0b3IodGhpcy5kYXRhLGEsYixjKX0iKSwgci5wdXNoKCJyZXR1cm4gZnVuY3Rpb24gY29uc3RydWN0XyIgKyB0ICsgIihkYXRhLHNoYXBlLHN0cmlkZSxvZmZzZXQpe3JldHVybiBuZXcgIiArIHQgKyAiKGRhdGEsIiArIHMubWFwKGZ1bmN0aW9uKGkpIHsKICAgIHJldHVybiAic2hhcGVbIiArIGkgKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIiwiICsgcy5tYXAoZnVuY3Rpb24oaSkgewogICAgcmV0dXJuICJzdHJpZGVbIiArIGkgKyAiXSI7CiAgfSkuam9pbigiLCIpICsgIixvZmZzZXQpfSIpOwogIHZhciBkID0gbmV3IEZ1bmN0aW9uKCJDVE9SX0xJU1QiLCAiT1JERVIiLCByLmpvaW4oYApgKSk7CiAgcmV0dXJuIGQoVFtuXSwgTCk7Cn0KZnVuY3Rpb24gVihuKSB7CiAgaWYgKGsobikpCiAgICByZXR1cm4gImJ1ZmZlciI7CiAgaWYgKEQpCiAgICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSkgewogICAgICBjYXNlICJbb2JqZWN0IEZsb2F0NjRBcnJheV0iOgogICAgICAgIHJldHVybiAiZmxvYXQ2NCI7CiAgICAgIGNhc2UgIltvYmplY3QgRmxvYXQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJmbG9hdDMyIjsKICAgICAgY2FzZSAiW29iamVjdCBJbnQ4QXJyYXldIjoKICAgICAgICByZXR1cm4gImludDgiOwogICAgICBjYXNlICJbb2JqZWN0IEludDE2QXJyYXldIjoKICAgICAgICByZXR1cm4gImludDE2IjsKICAgICAgY2FzZSAiW29iamVjdCBJbnQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJpbnQzMiI7CiAgICAgIGNhc2UgIltvYmplY3QgVWludDhBcnJheV0iOgogICAgICAgIHJldHVybiAidWludDgiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQxNkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50MTYiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQzMkFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50MzIiOwogICAgICBjYXNlICJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XSI6CiAgICAgICAgcmV0dXJuICJ1aW50OF9jbGFtcGVkIjsKICAgICAgY2FzZSAiW29iamVjdCBCaWdJbnQ2NEFycmF5XSI6CiAgICAgICAgcmV0dXJuICJiaWdpbnQ2NCI7CiAgICAgIGNhc2UgIltvYmplY3QgQmlnVWludDY0QXJyYXldIjoKICAgICAgICByZXR1cm4gImJpZ3VpbnQ2NCI7CiAgICB9CiAgcmV0dXJuIEFycmF5LmlzQXJyYXkobikgPyAiYXJyYXkiIDogImdlbmVyaWMiOwp9CnZhciBUID0gewogIGZsb2F0MzI6IFtdLAogIGZsb2F0NjQ6IFtdLAogIGludDg6IFtdLAogIGludDE2OiBbXSwKICBpbnQzMjogW10sCiAgdWludDg6IFtdLAogIHVpbnQxNjogW10sCiAgdWludDMyOiBbXSwKICBhcnJheTogW10sCiAgdWludDhfY2xhbXBlZDogW10sCiAgYmlnaW50NjQ6IFtdLAogIGJpZ3VpbnQ2NDogW10sCiAgYnVmZmVyOiBbXSwKICBnZW5lcmljOiBbXQp9OwpmdW5jdGlvbiBIKG4sIGUsIHQsIG8pIHsKICBpZiAobiA9PT0gdm9pZCAwKSB7CiAgICB2YXIgaCA9IFQuYXJyYXlbMF07CiAgICByZXR1cm4gaChbXSk7CiAgfSBlbHNlCiAgICB0eXBlb2YgbiA9PSAibnVtYmVyIiAmJiAobiA9IFtuXSk7CiAgZSA9PT0gdm9pZCAwICYmIChlID0gW24ubGVuZ3RoXSk7CiAgdmFyIHIgPSBlLmxlbmd0aDsKICBpZiAodCA9PT0gdm9pZCAwKSB7CiAgICB0ID0gbmV3IEFycmF5KHIpOwogICAgZm9yICh2YXIgcyA9IHIgLSAxLCBmID0gMTsgcyA+PSAwOyAtLXMpCiAgICAgIHRbc10gPSBmLCBmICo9IGVbc107CiAgfQogIGlmIChvID09PSB2b2lkIDApIHsKICAgIG8gPSAwOwogICAgZm9yICh2YXIgcyA9IDA7IHMgPCByOyArK3MpCiAgICAgIHRbc10gPCAwICYmIChvIC09IChlW3NdIC0gMSkgKiB0W3NdKTsKICB9CiAgZm9yICh2YXIgYyA9IFYobiksIHUgPSBUW2NdOyB1Lmxlbmd0aCA8PSByICsgMTsgKQogICAgdS5wdXNoKFAoYywgdS5sZW5ndGggLSAxKSk7CiAgdmFyIGggPSB1W3IgKyAxXTsKICByZXR1cm4gaChuLCBlLCB0LCBvKTsKfQp2YXIgTiA9IEgsIHEgPSAvKiBAX19QVVJFX18gKi8gQyhOKTsKY2xhc3MgRyB7CiAgY29uc3RydWN0b3IoZSA9IDI1NykgewogICAgdGhpcy5ncmlkU2l6ZSA9IGU7CiAgICBjb25zdCB0ID0gZSAtIDE7CiAgICBpZiAodCAmIHQgLSAxKQogICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGdyaWQgc2l6ZSB0byBiZSAyXm4rMSwgZ290ICR7ZX0uYCk7CiAgICB0aGlzLm51bVRyaWFuZ2xlcyA9IHQgKiB0ICogMiAtIDIsIHRoaXMubnVtUGFyZW50VHJpYW5nbGVzID0gdGhpcy5udW1UcmlhbmdsZXMgLSB0ICogdCwgdGhpcy5pbmRpY2VzID0gbmV3IFVpbnQzMkFycmF5KHRoaXMuZ3JpZFNpemUgKiB0aGlzLmdyaWRTaXplKSwgdGhpcy5jb29yZHMgPSBuZXcgVWludDE2QXJyYXkodGhpcy5udW1UcmlhbmdsZXMgKiA0KTsKICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5udW1UcmlhbmdsZXM7IG8rKykgewogICAgICBsZXQgciA9IG8gKyAyLCBzID0gMCwgZiA9IDAsIGMgPSAwLCB1ID0gMCwgaCA9IDAsIHAgPSAwOwogICAgICBmb3IgKHIgJiAxID8gYyA9IHUgPSBoID0gdCA6IHMgPSBmID0gcCA9IHQ7IChyID4+PSAxKSA+IDE7ICkgewogICAgICAgIGNvbnN0IGEgPSBzICsgYyA+PiAxLCBiID0gZiArIHUgPj4gMTsKICAgICAgICByICYgMSA/IChjID0gcywgdSA9IGYsIHMgPSBoLCBmID0gcCkgOiAocyA9IGMsIGYgPSB1LCBjID0gaCwgdSA9IHApLCBoID0gYSwgcCA9IGI7CiAgICAgIH0KICAgICAgY29uc3QgbCA9IG8gKiA0OwogICAgICB0aGlzLmNvb3Jkc1tsICsgMF0gPSBzLCB0aGlzLmNvb3Jkc1tsICsgMV0gPSBmLCB0aGlzLmNvb3Jkc1tsICsgMl0gPSBjLCB0aGlzLmNvb3Jkc1tsICsgM10gPSB1OwogICAgfQogIH0KICBjcmVhdGVUaWxlKGUpIHsKICAgIHJldHVybiBuZXcgUShlLCB0aGlzKTsKICB9Cn0KY2xhc3MgUSB7CiAgY29uc3RydWN0b3IoZSwgdCkgewogICAgY29uc3QgbyA9IHQuZ3JpZFNpemU7CiAgICBpZiAoZS5sZW5ndGggIT09IG8gKiBvKQogICAgICB0aHJvdyBuZXcgRXJyb3IoCiAgICAgICAgYEV4cGVjdGVkIHRlcnJhaW4gZGF0YSBvZiBsZW5ndGggJHtvICogb30gKCR7b30geCAke299KSwgZ290ICR7ZS5sZW5ndGh9LmAKICAgICAgKTsKICAgIHRoaXMudGVycmFpbiA9IGUsIHRoaXMubWFydGluaSA9IHQsIHRoaXMuZXJyb3JzID0gbmV3IEZsb2F0MzJBcnJheShlLmxlbmd0aCksIHRoaXMudXBkYXRlKCk7CiAgfQogIHVwZGF0ZSgpIHsKICAgIGNvbnN0IHsKICAgICAgbnVtVHJpYW5nbGVzOiBlLAogICAgICBudW1QYXJlbnRUcmlhbmdsZXM6IHQsCiAgICAgIGNvb3JkczogbywKICAgICAgZ3JpZFNpemU6IHIKICAgIH0gPSB0aGlzLm1hcnRpbmksIHsgdGVycmFpbjogcywgZXJyb3JzOiBmIH0gPSB0aGlzOwogICAgZm9yIChsZXQgYyA9IGUgLSAxOyBjID49IDA7IGMtLSkgewogICAgICBjb25zdCB1ID0gYyAqIDQsIGggPSBvW3UgKyAwXSwgcCA9IG9bdSArIDFdLCBsID0gb1t1ICsgMl0sIGEgPSBvW3UgKyAzXSwgYiA9IGggKyBsID4+IDEsIGogPSBwICsgYSA+PiAxLCBkID0gYiArIGogLSBwLCBpID0gaiArIGggLSBiLCBnID0gKHNbcCAqIHIgKyBoXSArIHNbYSAqIHIgKyBsXSkgLyAyLCB2ID0gaiAqIHIgKyBiLCB5ID0gTWF0aC5hYnMoZyAtIHNbdl0pOwogICAgICBpZiAoZlt2XSA9IE1hdGgubWF4KGZbdl0sIHkpLCBjIDwgdCkgewogICAgICAgIGNvbnN0IG0gPSAocCArIGkgPj4gMSkgKiByICsgKGggKyBkID4+IDEpLCB3ID0gKGEgKyBpID4+IDEpICogciArIChsICsgZCA+PiAxKTsKICAgICAgICBmW3ZdID0gTWF0aC5tYXgoCiAgICAgICAgICBmW3ZdLAogICAgICAgICAgZlttXSwKICAgICAgICAgIGZbd10KICAgICAgICApOwogICAgICB9CiAgICB9CiAgfQogIGdldE1lc2goZSA9IDAsIHQpIHsKICAgIGNvbnN0IHsgZ3JpZFNpemU6IG8sIGluZGljZXM6IHIgfSA9IHRoaXMubWFydGluaSwgeyBlcnJvcnM6IHMgfSA9IHRoaXM7CiAgICBsZXQgZiA9IDAsIGMgPSAwOwogICAgY29uc3QgdSA9IG8gLSAxLCBoID0gdCB8fCBvOwogICAgci5maWxsKDApOwogICAgZnVuY3Rpb24gcChkLCBpLCBnLCB2LCB5LCBtKSB7CiAgICAgIGNvbnN0IHcgPSBkICsgZyA+PiAxLCBBID0gaSArIHYgPj4gMSwgXyA9IE1hdGguYWJzKGQgLSB5KSArIE1hdGguYWJzKGkgLSBtKTsKICAgICAgXyA+IDEgJiYgc1tBICogbyArIHddID4gZSB8fCBfID4gaCA/IChwKHksIG0sIGQsIGksIHcsIEEpLCBwKGcsIHYsIHksIG0sIHcsIEEpKSA6IChyW2kgKiBvICsgZF0gPSByW2kgKiBvICsgZF0gfHwgKytmLCByW3YgKiBvICsgZ10gPSByW3YgKiBvICsgZ10gfHwgKytmLCByW20gKiBvICsgeV0gPSByW20gKiBvICsgeV0gfHwgKytmLCBjKyspOwogICAgfQogICAgcCgwLCAwLCB1LCB1LCB1LCAwKSwgcCh1LCB1LCAwLCAwLCAwLCB1KTsKICAgIGNvbnN0IGwgPSBuZXcgVWludDE2QXJyYXkoZiAqIDIpLCBhID0gbmV3IFVpbnQzMkFycmF5KGMgKiAzKTsKICAgIGxldCBiID0gMDsKICAgIGZ1bmN0aW9uIGooZCwgaSwgZywgdiwgeSwgbSkgewogICAgICBjb25zdCB3ID0gZCArIGcgPj4gMSwgQSA9IGkgKyB2ID4+IDEsIF8gPSBNYXRoLmFicyhkIC0geSkgKyBNYXRoLmFicyhpIC0gbSk7CiAgICAgIGlmIChfID4gMSAmJiBzW0EgKiBvICsgd10gPiBlIHx8IF8gPiBoKQogICAgICAgIGooeSwgbSwgZCwgaSwgdywgQSksIGooZywgdiwgeSwgbSwgdywgQSk7CiAgICAgIGVsc2UgewogICAgICAgIGNvbnN0IE0gPSByW2kgKiBvICsgZF0gLSAxLCBJID0gclt2ICogbyArIGddIC0gMSwgeiA9IHJbbSAqIG8gKyB5XSAtIDE7CiAgICAgICAgbFsyICogTV0gPSBkLCBsWzIgKiBNICsgMV0gPSBpLCBsWzIgKiBJXSA9IGcsIGxbMiAqIEkgKyAxXSA9IHYsIGxbMiAqIHpdID0geSwgbFsyICogeiArIDFdID0gbSwgYVtiKytdID0gTSwgYVtiKytdID0gSSwgYVtiKytdID0gejsKICAgICAgfQogICAgfQogICAgcmV0dXJuIGooMCwgMCwgdSwgdSwgdSwgMCksIGoodSwgdSwgMCwgMCwgMCwgdSksIHsgdmVydGljZXM6IGwsIHRyaWFuZ2xlczogYSB9OwogIH0KfQpmdW5jdGlvbiBKKG4sIGUsIHQsIG8pIHsKICBjb25zdCByID0gbi5zaGFwZVswXSArIDEsIHMgPSBuZXcgRmxvYXQzMkFycmF5KHIgKiByKSwgZiA9IG4uc2hhcGVbMF07CiAgZSA9IGUgPz8gMC4xLCB0ID0gdCA/PyAtMWU0OwogIGZvciAobGV0IGMgPSAwOyBjIDwgZjsgYysrKQogICAgZm9yIChsZXQgdSA9IDA7IHUgPCBmOyB1KyspIHsKICAgICAgY29uc3QgaCA9IGMsIHAgPSBuLmdldCh1LCBoLCAwKSwgbCA9IG4uZ2V0KHUsIGgsIDEpLCBhID0gbi5nZXQodSwgaCwgMiksIGIgPSBwICogMjU2ICogMjU2ICogZSArIGwgKiAyNTYgKiBlICsgYSAqIGUgKyB0OwogICAgICBwID09PSAwICYmIGwgPT09IDAgJiYgYSA9PT0gMCAmJiB0eXBlb2YgbyA9PSAibnVtYmVyIiA/IHNbYyAqIHIgKyB1XSA9IG8gOiBzW2MgKiByICsgdV0gPSBiOwogICAgfQogIGZvciAobGV0IGMgPSAwOyBjIDwgciAtIDE7IGMrKykKICAgIHNbciAqIChyIC0gMSkgKyBjXSA9IHNbciAqIChyIC0gMikgKyBjXTsKICBmb3IgKGxldCBjID0gMDsgYyA8IHI7IGMrKykKICAgIHNbciAqIGMgKyByIC0gMV0gPSBzW3IgKiBjICsgciAtIDJdOwogIHJldHVybiBzOwp9CmZ1bmN0aW9uIEsobiwgZSwgdCkgewogIGNvbnN0IG8gPSBbXSwgciA9IFtdLCBzID0gW10sIGYgPSBbXSwgYyA9IFtdLCB1ID0gW10sIGggPSBbXTsKICBsZXQgcCA9IDEgLyAwLCBsID0gLTEgLyAwOwogIGNvbnN0IGEgPSAzMjc2OCAvIHQ7CiAgZm9yIChsZXQgZyA9IDA7IGcgPCBlLnZlcnRpY2VzLmxlbmd0aCAvIDI7IGcrKykgewogICAgY29uc3QgdiA9IGcsIHkgPSBlLnZlcnRpY2VzW2cgKiAyXSwgbSA9IGUudmVydGljZXNbZyAqIDIgKyAxXSwgdyA9IG4udGVycmFpblttICogKHQgKyAxKSArIHldOwogICAgdyA+IGwgJiYgKGwgPSB3KSwgdyA8IHAgJiYgKHAgPSB3KSwgcy5wdXNoKHcpLCBtID09IDAgJiYgZi5wdXNoKHYpLCBtID09IHQgJiYgYy5wdXNoKHYpLCB5ID09IDAgJiYgaC5wdXNoKHYpLCB5ID09IHQgJiYgdS5wdXNoKHYpOwogICAgbGV0IEEgPSB5ICogYSwgXyA9ICh0IC0gbSkgKiBhOwogICAgby5wdXNoKEEpLCByLnB1c2goXyk7CiAgfQogIGNvbnN0IGIgPSBsIC0gcCwgaiA9IHMubWFwKChnKSA9PiBiIDwgMSA/IDAgOiAoZyAtIHApICogKDMyNzY3IC8gYikpLCBkID0gbmV3IFVpbnQxNkFycmF5KGUudHJpYW5nbGVzKSwgaSA9IG5ldyBVaW50MTZBcnJheSgKICAgIC8vdmVydHMKICAgIFsuLi5vLCAuLi5yLCAuLi5qXQogICk7CiAgcmV0dXJuIHsKICAgIG1pbmltdW1IZWlnaHQ6IHAsCiAgICBtYXhpbXVtSGVpZ2h0OiBsLAogICAgcXVhbnRpemVkVmVydGljZXM6IGksCiAgICBpbmRpY2VzOiBkLAogICAgd2VzdEluZGljZXM6IGgsCiAgICBzb3V0aEluZGljZXM6IGMsCiAgICBlYXN0SW5kaWNlczogdSwKICAgIG5vcnRoSW5kaWNlczogZgogIH07Cn0KbGV0IFU7CmZ1bmN0aW9uIFcobikgewogIGNvbnN0IHsKICAgIGltYWdlRGF0YTogZSwKICAgIHRpbGVTaXplOiB0ID0gMjU2LAogICAgZXJyb3JMZXZlbDogbywKICAgIGludGVydmFsOiByLAogICAgb2Zmc2V0OiBzLAogICAgbm9EYXRhSGVpZ2h0OiBmCiAgfSA9IG4sIGMgPSBxKAogICAgbmV3IFVpbnQ4QXJyYXkoZSksCiAgICBbdCwgdCwgNF0sCiAgICBbNCwgNCAqIHQsIDFdLAogICAgMAogICk7CiAgVSA/PyAoVSA9IG5ldyBHKHQgKyAxKSk7CiAgY29uc3QgdSA9IEooYywgciwgcywgZiksIGggPSBVLmNyZWF0ZVRpbGUodSksIHAgPSBoLmdldE1lc2gobywgbi5tYXhMZW5ndGgpOwogIHJldHVybiBLKGgsIHAsIHQpOwp9CmNvbnN0IFMgPSBzZWxmOwpTLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG4pIHsKICBjb25zdCB7IGlkOiBlLCBwYXlsb2FkOiB0IH0gPSBuLmRhdGE7CiAgaWYgKGUgPT0gbnVsbCkKICAgIHJldHVybjsKICBsZXQgbyA9IFtdLCByID0gbnVsbDsKICB0cnkgewogICAgciA9IFcodCksIG8ucHVzaChyLmluZGljZXMuYnVmZmVyKSwgby5wdXNoKHIucXVhbnRpemVkVmVydGljZXMuYnVmZmVyKSwgUy5wb3N0TWVzc2FnZSh7IGlkOiBlLCBwYXlsb2FkOiByIH0sIG8pOwogIH0gY2F0Y2ggKHMpIHsKICAgIFMucG9zdE1lc3NhZ2UoeyBpZDogZSwgZXJyOiBTdHJpbmcocykgfSk7CiAgfSBmaW5hbGx5IHsKICAgIHIgPSBudWxsLCBvID0gW107CiAgfQp9Owo=", E = (e) => Uint8Array.from(atob(e), (I) => I.charCodeAt(0)), v = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", E(M)], { type: "text/javascript;charset=utf-8" });
function O(e) {
  let I;
  try {
    if (I = v && (window.URL || window.webkitURL).createObjectURL(v), !I)
      throw "";
    const i = new Worker(I, {
      type: "module",
      name: e == null ? void 0 : e.name
    });
    return i.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(I);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + M,
      {
        type: "module",
        name: e == null ? void 0 : e.name
      }
    );
  }
}
const V = {}, L = {};
let U = 0;
async function q(e, I, i) {
  const t = U++, g = {
    id: t,
    payload: I
  };
  return new Promise(function(s, c) {
    V[t] = s, L[t] = c, e.postMessage(g, i);
  });
}
function _(e) {
  const { id: I, err: i, payload: t } = e.data;
  if (t) {
    const g = V[I];
    g && g(t);
  } else {
    const g = L[I];
    g && g(i || "Got nothing");
  }
  delete V[I], delete L[I];
}
class $ {
  constructor(I = new O()) {
    this.worker = I, this.worker.onmessage = _;
  }
  /**
   * todo:完善泛型标注
   * @param params
   * @param transferableObjects
   * @returns
   */
  async scheduleTask(I, i) {
    return await q(this.worker, I, i);
  }
}
function II(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function iI(e) {
  for (var I = new Array(e), i = 0; i < e; ++i)
    I[i] = i;
  return I;
}
var gI = iI;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var tI = function(e) {
  return e != null && (J(e) || eI(e) || !!e._isBuffer);
};
function J(e) {
  return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function eI(e) {
  return typeof e.readFloatLE == "function" && typeof e.slice == "function" && J(e.slice(0, 0));
}
var sI = gI, rI = tI, oI = typeof Float64Array < "u";
function CI(e, I) {
  return e[0] - I[0];
}
function nI() {
  var e = this.stride, I = new Array(e.length), i;
  for (i = 0; i < I.length; ++i)
    I[i] = [Math.abs(e[i]), i];
  I.sort(CI);
  var t = new Array(I.length);
  for (i = 0; i < t.length; ++i)
    t[i] = I[i][1];
  return t;
}
function cI(e, I) {
  var i = ["View", I, "d", e].join("");
  I < 0 && (i = "View_Nil" + e);
  var t = e === "generic";
  if (I === -1) {
    var g = "function " + i + "(a){this.data=a;};var proto=" + i + ".prototype;proto.dtype='" + e + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + i + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + i + "(a){return new " + i + "(a);}", u = new Function(g);
    return u();
  } else if (I === 0) {
    var g = "function " + i + "(a,d) {this.data = a;this.offset = d};var proto=" + i + ".prototype;proto.dtype='" + e + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + i + "_copy() {return new " + i + "(this.data,this.offset)};proto.pick=function " + i + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + i + "_get(){return " + (t ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + i + "_set(v){return " + (t ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + i + "(a,b,c,d){return new " + i + "(a,d)}", u = new Function("TrivialArray", g);
    return u(S[e][0]);
  }
  var g = ["'use strict'"], s = sI(I), c = s.map(function(o) {
    return "i" + o;
  }), C = "this.offset+" + s.map(function(o) {
    return "this.stride[" + o + "]*i" + o;
  }).join("+"), n = s.map(function(o) {
    return "b" + o;
  }).join(","), A = s.map(function(o) {
    return "c" + o;
  }).join(",");
  g.push(
    "function " + i + "(a," + n + "," + A + ",d){this.data=a",
    "this.shape=[" + n + "]",
    "this.stride=[" + A + "]",
    "this.offset=d|0}",
    "var proto=" + i + ".prototype",
    "proto.dtype='" + e + "'",
    "proto.dimension=" + I
  ), g.push(
    "Object.defineProperty(proto,'size',{get:function " + i + "_size(){return " + s.map(function(o) {
      return "this.shape[" + o + "]";
    }).join("*"),
    "}})"
  ), I === 1 ? g.push("proto.order=[0]") : (g.push("Object.defineProperty(proto,'order',{get:"), I < 4 ? (g.push("function " + i + "_order(){"), I === 2 ? g.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : I === 3 && g.push(
    "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
  )) : g.push("ORDER})")), g.push(
    "proto.set=function " + i + "_set(" + c.join(",") + ",v){"
  ), t ? g.push("return this.data.set(" + C + ",v)}") : g.push("return this.data[" + C + "]=v}"), g.push("proto.get=function " + i + "_get(" + c.join(",") + "){"), t ? g.push("return this.data.get(" + C + ")}") : g.push("return this.data[" + C + "]}"), g.push(
    "proto.index=function " + i + "_index(",
    c.join(),
    "){return " + C + "}"
  ), g.push("proto.hi=function " + i + "_hi(" + c.join(",") + "){return new " + i + "(this.data," + s.map(function(o) {
    return ["(typeof i", o, "!=='number'||i", o, "<0)?this.shape[", o, "]:i", o, "|0"].join("");
  }).join(",") + "," + s.map(function(o) {
    return "this.stride[" + o + "]";
  }).join(",") + ",this.offset)}");
  var a = s.map(function(o) {
    return "a" + o + "=this.shape[" + o + "]";
  }), l = s.map(function(o) {
    return "c" + o + "=this.stride[" + o + "]";
  });
  g.push("proto.lo=function " + i + "_lo(" + c.join(",") + "){var b=this.offset,d=0," + a.join(",") + "," + l.join(","));
  for (var r = 0; r < I; ++r)
    g.push(
      "if(typeof i" + r + "==='number'&&i" + r + ">=0){d=i" + r + "|0;b+=c" + r + "*d;a" + r + "-=d}"
    );
  g.push("return new " + i + "(this.data," + s.map(function(o) {
    return "a" + o;
  }).join(",") + "," + s.map(function(o) {
    return "c" + o;
  }).join(",") + ",b)}"), g.push("proto.step=function " + i + "_step(" + c.join(",") + "){var " + s.map(function(o) {
    return "a" + o + "=this.shape[" + o + "]";
  }).join(",") + "," + s.map(function(o) {
    return "b" + o + "=this.stride[" + o + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
  for (var r = 0; r < I; ++r)
    g.push(
      "if(typeof i" + r + "==='number'){d=i" + r + "|0;if(d<0){c+=b" + r + "*(a" + r + "-1);a" + r + "=ceil(-a" + r + "/d)}else{a" + r + "=ceil(a" + r + "/d)}b" + r + "*=d}"
    );
  g.push("return new " + i + "(this.data," + s.map(function(o) {
    return "a" + o;
  }).join(",") + "," + s.map(function(o) {
    return "b" + o;
  }).join(",") + ",c)}");
  for (var d = new Array(I), B = new Array(I), r = 0; r < I; ++r)
    d[r] = "a[i" + r + "]", B[r] = "b[i" + r + "]";
  g.push(
    "proto.transpose=function " + i + "_transpose(" + c + "){" + c.map(function(o, m) {
      return o + "=(" + o + "===undefined?" + m + ":" + o + "|0)";
    }).join(";"),
    "var a=this.shape,b=this.stride;return new " + i + "(this.data," + d.join(",") + "," + B.join(",") + ",this.offset)}"
  ), g.push("proto.pick=function " + i + "_pick(" + c + "){var a=[],b=[],c=this.offset");
  for (var r = 0; r < I; ++r)
    g.push("if(typeof i" + r + "==='number'&&i" + r + ">=0){c=(c+this.stride[" + r + "]*i" + r + ")|0}else{a.push(this.shape[" + r + "]);b.push(this.stride[" + r + "])}");
  g.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), g.push("return function construct_" + i + "(data,shape,stride,offset){return new " + i + "(data," + s.map(function(o) {
    return "shape[" + o + "]";
  }).join(",") + "," + s.map(function(o) {
    return "stride[" + o + "]";
  }).join(",") + ",offset)}");
  var u = new Function("CTOR_LIST", "ORDER", g.join(`
`));
  return u(S[e], nI);
}
function AI(e) {
  if (rI(e))
    return "buffer";
  if (oI)
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
function aI(e, I, i, t) {
  if (e === void 0) {
    var A = S.array[0];
    return A([]);
  } else
    typeof e == "number" && (e = [e]);
  I === void 0 && (I = [e.length]);
  var g = I.length;
  if (i === void 0) {
    i = new Array(g);
    for (var s = g - 1, c = 1; s >= 0; --s)
      i[s] = c, c *= I[s];
  }
  if (t === void 0) {
    t = 0;
    for (var s = 0; s < g; ++s)
      i[s] < 0 && (t -= (I[s] - 1) * i[s]);
  }
  for (var C = AI(e), n = S[C]; n.length <= g + 1; )
    n.push(cI(C, n.length - 1));
  var A = n[g + 1];
  return A(e, I, i, t);
}
var lI = aI;
const dI = /* @__PURE__ */ II(lI);
class uI {
  constructor(I = 257) {
    this.gridSize = I;
    const i = I - 1;
    if (i & i - 1)
      throw new Error(`Expected grid size to be 2^n+1, got ${I}.`);
    this.numTriangles = i * i * 2 - 2, this.numParentTriangles = this.numTriangles - i * i, this.indices = new Uint32Array(this.gridSize * this.gridSize), this.coords = new Uint16Array(this.numTriangles * 4);
    for (let t = 0; t < this.numTriangles; t++) {
      let g = t + 2, s = 0, c = 0, C = 0, n = 0, A = 0, a = 0;
      for (g & 1 ? C = n = A = i : s = c = a = i; (g >>= 1) > 1; ) {
        const r = s + C >> 1, d = c + n >> 1;
        g & 1 ? (C = s, n = c, s = A, c = a) : (s = C, c = n, C = A, n = a), A = r, a = d;
      }
      const l = t * 4;
      this.coords[l + 0] = s, this.coords[l + 1] = c, this.coords[l + 2] = C, this.coords[l + 3] = n;
    }
  }
  createTile(I) {
    return new mI(I, this);
  }
}
class mI {
  constructor(I, i) {
    const t = i.gridSize;
    if (I.length !== t * t)
      throw new Error(
        `Expected terrain data of length ${t * t} (${t} x ${t}), got ${I.length}.`
      );
    this.terrain = I, this.martini = i, this.errors = new Float32Array(I.length), this.update();
  }
  update() {
    const {
      numTriangles: I,
      numParentTriangles: i,
      coords: t,
      gridSize: g
    } = this.martini, { terrain: s, errors: c } = this;
    for (let C = I - 1; C >= 0; C--) {
      const n = C * 4, A = t[n + 0], a = t[n + 1], l = t[n + 2], r = t[n + 3], d = A + l >> 1, B = a + r >> 1, u = d + B - a, o = B + A - d, m = (s[a * g + A] + s[r * g + l]) / 2, h = B * g + d, b = Math.abs(m - s[h]);
      if (c[h] = Math.max(c[h], b), C < i) {
        const y = (a + o >> 1) * g + (A + u >> 1), p = (r + o >> 1) * g + (l + u >> 1);
        c[h] = Math.max(
          c[h],
          c[y],
          c[p]
        );
      }
    }
  }
  getMesh(I = 0, i) {
    const { gridSize: t, indices: g } = this.martini, { errors: s } = this;
    let c = 0, C = 0;
    const n = t - 1, A = i || t;
    g.fill(0);
    function a(u, o, m, h, b, y) {
      const p = u + m >> 1, K = o + h >> 1, G = Math.abs(u - b) + Math.abs(o - y);
      G > 1 && s[K * t + p] > I || G > A ? (a(b, y, u, o, p, K), a(m, h, b, y, p, K)) : (g[o * t + u] = g[o * t + u] || ++c, g[h * t + m] = g[h * t + m] || ++c, g[y * t + b] = g[y * t + b] || ++c, C++);
    }
    a(0, 0, n, n, n, 0), a(n, n, 0, 0, 0, n);
    const l = new Uint16Array(c * 2), r = new Uint32Array(C * 3);
    let d = 0;
    function B(u, o, m, h, b, y) {
      const p = u + m >> 1, K = o + h >> 1, G = Math.abs(u - b) + Math.abs(o - y);
      if (G > 1 && s[K * t + p] > I || G > A)
        B(b, y, u, o, p, K), B(m, h, b, y, p, K);
      else {
        const Z = g[o * t + u] - 1, w = g[h * t + m] - 1, X = g[y * t + b] - 1;
        l[2 * Z] = u, l[2 * Z + 1] = o, l[2 * w] = m, l[2 * w + 1] = h, l[2 * X] = b, l[2 * X + 1] = y, r[d++] = Z, r[d++] = w, r[d++] = X;
      }
    }
    return B(0, 0, n, n, n, 0), B(n, n, 0, 0, 0, n), { vertices: l, triangles: r };
  }
}
function hI(e, I, i, t) {
  const g = e.shape[0] + 1, s = new Float32Array(g * g), c = e.shape[0];
  I = I ?? 0.1, i = i ?? -1e4;
  for (let C = 0; C < c; C++)
    for (let n = 0; n < c; n++) {
      const A = C, a = e.get(n, A, 0), l = e.get(n, A, 1), r = e.get(n, A, 2), d = a * 256 * 256 * I + l * 256 * I + r * I + i;
      a === 0 && l === 0 && r === 0 && typeof t == "number" ? s[C * g + n] = t : s[C * g + n] = d;
    }
  for (let C = 0; C < g - 1; C++)
    s[g * (g - 1) + C] = s[g * (g - 2) + C];
  for (let C = 0; C < g; C++)
    s[g * C + g - 1] = s[g * C + g - 2];
  return s;
}
function yI(e) {
  e = Math.max(e, 2);
  const I = Math.pow(e - 1, 2) * 2, i = Math.pow(e, 2), t = new Uint16Array(i * 3), g = new Uint16Array(I * 3), s = [], c = [], C = [], n = [];
  let A = 0;
  for (let a = 0; a < i; a++) {
    let l = a % e, r = Math.floor(a / e);
    const d = e * l + r;
    t[d] = l * 32768 / (e - 1), t[i + d] = r * 32768 / (e - 1), t[2 * i + d] = 0, r == 0 && s.push(d), l == 0 && c.push(d), l == e - 1 && C.push(d), r == e - 1 && n.push(d);
    const B = a - r * e;
    B != e - 1 && (g[A * 3] = a, g[A * 3 + 1] = a + e + 1, g[A * 3 + 2] = a + 1, A++), B != 0 && (g[A * 3] = a - 1, g[A * 3 + 1] = a + e - 1, g[A * 3 + 2] = a + e, A++);
  }
  return {
    minimumHeight: 0,
    maximumHeight: 0,
    quantizedVertices: t,
    indices: g,
    westIndices: s,
    southIndices: c,
    eastIndices: C,
    northIndices: n
  };
}
let H = [];
function bI(e) {
  if (e in H)
    return H[e];
  {
    const I = yI(e);
    return H[e] = I, I;
  }
}
function BI(e, I, i) {
  const t = [], g = [], s = [], c = [], C = [], n = [], A = [];
  let a = 1 / 0, l = -1 / 0;
  const r = 32768 / i;
  for (let m = 0; m < I.vertices.length / 2; m++) {
    const h = m, b = I.vertices[m * 2], y = I.vertices[m * 2 + 1], p = e.terrain[y * (i + 1) + b];
    p > l && (l = p), p < a && (a = p), s.push(p), y == 0 && c.push(h), y == i && C.push(h), b == 0 && A.push(h), b == i && n.push(h);
    let K = b * r, G = (i - y) * r;
    t.push(K), g.push(G);
  }
  const d = l - a, B = s.map((m) => d < 1 ? 0 : (m - a) * (32767 / d)), u = new Uint16Array(I.triangles), o = new Uint16Array(
    //verts
    [...t, ...g, ...B]
  );
  return {
    minimumHeight: a,
    maximumHeight: l,
    quantizedVertices: o,
    indices: u,
    westIndices: A,
    southIndices: C,
    eastIndices: n,
    northIndices: c
  };
}
let k;
function pI(e) {
  const {
    imageData: I,
    tileSize: i = 256,
    errorLevel: t,
    interval: g,
    offset: s,
    noDataHeight: c
  } = e, C = dI(
    new Uint8Array(I),
    [i, i, 4],
    [4, 4 * i, 1],
    0
  );
  k ?? (k = new uI(i + 1));
  const n = hI(C, g, s, c), A = k.createTile(n), a = A.getMesh(t, e.maxLength);
  return BI(A, a, i);
}
class KI extends W {
  tileXYToRectangle(I, i, t, g) {
    let s = super.tileXYToRectangle(I, i, t);
    return i == 0 && (s.north = Math.PI / 2), i + 1 == Math.pow(2, t) && (s.south = -Math.PI / 2), s;
  }
}
class SI {
  constructor(I) {
    this.hasWaterMask = !1, this.hasVertexNormals = !1, this.credit = new R("Mapbox"), this.errorEvent = new z(), this.workerFarm = null, this.inProgressWorkers = 0, this.maxWorkers = 5, this.minError = 0.1, this.fillPoles = !0, this._errorAtMinZoom = 1e3, this.RADIUS_SCALAR = 1, this.availability = !1, this.retryAttempts = I == null ? void 0 : I.retryAttempts, this.retryCallback = I == null ? void 0 : I.retryCallback, this.noDataHeight = I == null ? void 0 : I.noDataHeight, this.zeroMeshError = I == null ? void 0 : I.zeroMeshError, this.tileImageWidth = I == null ? void 0 : I.tileImageWidth, this.resource = new x({
      url: I.url,
      retryAttempts: this.retryAttempts,
      retryCallback: this.retryCallback
    }), this.interval = I.interval ?? 0.1, this.offset = I.offset ?? -1e4, this.maxWorkers = I.maxWorkers ?? 5, this.minZoomLevel = I.minZoomLevel ?? 3, this.fillPoles = I.fillPoles ?? !0, this.levelOfDetailScalar = (I.detailScalar ?? 4) + F.EPSILON5, this.ready = !0, this.availability = !0, this.readyPromise = Promise.resolve(!0), this.minError = I.minimumErrorLevel ?? 0.1, this.requestVertexNormals = I.requestVertexNormals, this.requestWaterMask = I.requestWaterMask, this.errorEvent.addEventListener(console.log, this), this.ellipsoid = I.ellipsoid ?? P.WGS84, this.maxWorkers > 0 && (this.workerFarm = new $());
    let i = W;
    this.fillPoles && (i = KI), this.tilingScheme = new i({
      numberOfLevelZeroTilesX: 1,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: this.ellipsoid
    }), this._errorAtMinZoom = this.errorAtZoom(this.minZoomLevel);
  }
  requestTileGeometry(I, i, t, g) {
    if (t < this.minZoomLevel || this.scaledErrorForTile(I, i, t) > this._errorAtMinZoom)
      return Promise.resolve(this.emptyMesh(I, i, t));
    if (!(this.inProgressWorkers > this.maxWorkers))
      return this.inProgressWorkers += 1, this.processTile(I, i, t).finally(() => {
        this.inProgressWorkers -= 1;
      });
  }
  async processTile(I, i, t) {
    try {
      const { tileSize: g, getTilePixels: s } = this.resource;
      let c = await s({ x: I, y: i, z: t });
      if (!c)
        throw Error(`no pixels at x: ${I}, y: ${i}, z: ${t}`);
      let C = c.data;
      const n = this.tilingScheme.tileXYToRectangle(I, i, t), A = this.zeroMeshError ? 0 : this.errorAtZoom(t);
      let a = this.maxVertexDistance(n);
      const l = {
        imageData: C,
        maxLength: a,
        x: I,
        y: i,
        z: t,
        errorLevel: A,
        ellipsoidRadius: this.ellipsoid.maximumRadius,
        tileSize: g,
        interval: this.interval,
        offset: this.offset,
        noDataHeight: this.noDataHeight
      };
      let r;
      return this.workerFarm != null ? r = await this.workerFarm.scheduleTask(l, [C.buffer]) : r = pI(l), C = void 0, c = void 0, this.createQuantizedMeshData(n, A, r);
    } catch {
      return this.emptyMesh(I, i, t);
    }
  }
  errorAtZoom(I) {
    return Math.max(
      this.getLevelMaximumGeometricError(I) / this.levelOfDetailScalar,
      this.minError
    );
  }
  scaledErrorForTile(I, i, t) {
    const g = this.tilingScheme.tileXYToRectangle(I, i, t), s = f.center(g);
    return this.errorAtZoom(t) / Math.pow(1 - Math.sin(s.latitude), 2);
  }
  maxVertexDistance(I) {
    return Math.ceil(2 / I.height);
  }
  emptyMesh(I, i, t) {
    const g = this.tilingScheme.tileXYToRectangle(I, i, t), s = f.center(g), c = Math.min(Math.abs(Math.sin(s.latitude)), 0.995);
    let C = Math.max(
      Math.ceil(200 / (t + 1) * Math.pow(1 - c, 0.25)),
      4
    );
    const n = bI(C), A = this.errorAtZoom(t);
    return this.createQuantizedMeshData(g, A, n);
  }
  createQuantizedMeshData(I, i, t) {
    const {
      minimumHeight: g,
      maximumHeight: s,
      quantizedVertices: c,
      indices: C,
      westIndices: n,
      southIndices: A,
      eastIndices: a,
      northIndices: l
    } = t, d = i * 20, B = f.center(I), u = I.width / 2;
    let m = Math.cos(u) * this.ellipsoid.maximumRadius + s;
    u > Math.PI / 4 && (m = (1 + u) * this.ellipsoid.maximumRadius);
    const h = new Y(
      B.longitude,
      B.latitude,
      m
      // Scaling factor of two just to be sure.
    ), b = this.ellipsoid.transformPositionToScaledSpace(
      Y.toCartesian(h)
    );
    let y = N.fromRectangle(
      I,
      g,
      s,
      this.tilingScheme.ellipsoid
    ), p = j.fromOrientedBoundingBox(y);
    return new Q({
      minimumHeight: g,
      maximumHeight: s,
      quantizedVertices: c,
      indices: C,
      boundingSphere: p,
      orientedBoundingBox: y,
      horizonOcclusionPoint: b,
      westIndices: n,
      southIndices: A,
      eastIndices: a,
      northIndices: l,
      westSkirtHeight: d,
      southSkirtHeight: d,
      eastSkirtHeight: d,
      northSkirtHeight: d,
      childTileMask: 15
    });
  }
  getLevelMaximumGeometricError(I) {
    const i = T.getEstimatedLevelZeroGeometricErrorForAHeightmap(
      this.tilingScheme.ellipsoid,
      this.tileImageWidth ?? 65,
      this.tilingScheme.getNumberOfXTilesAtLevel(0)
    ), t = this.resource.tileSize / 256;
    return i / t / (1 << I);
  }
  getTileDataAvailable(I, i, t) {
    return this.resource.getTileDataAvailable({ x: I, y: i, z: t });
  }
}
export {
  x as DefaultHeightmapResource,
  SI as MartiniTerrainProvider,
  $ as WorkerFarm
};
