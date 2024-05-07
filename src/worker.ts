import { decodeTerrain } from "./worker-util";

const work = self as unknown as Worker;

work.onmessage = (msg) => {
  const { id, payload } = msg.data;
  if (id == null) return;
  let objects: ArrayBufferLike[] = [];
  let res = null;
  try {
    res = decodeTerrain(payload);
    objects.push(res.indices.buffer);
    objects.push(res.quantizedVertices.buffer);
    work.postMessage({ id, payload: res }, objects);
  } catch (err: unknown) {
    work.postMessage({ id, err: String(err) });
  } finally {
    res = null;
    objects = [];
  }
};
