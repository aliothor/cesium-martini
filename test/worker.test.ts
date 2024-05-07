import { describe, it, expect, beforeAll } from "vitest";

describe("web worker test", () => {
  // it("init test", () => {
  //   const worker = new Worker("./worker.js", { type: "module" });
  //   let data;
  //   worker.onmessage = (e) => {
  //     console.log(e.data);
  //     data = e.data;
  //   };
  //   worker.postMessage("main data");
  //   // worker.terminate()
  //   expect(data).toBe(3);
  // });

  // it("fetch file", async () => {
  //   const resp = await fetch("./worker111.js", {
  //     method: "GET",
  //   });
  //   const text=await resp.text()
  //   expect(text).toBe(2)
  // });
});
