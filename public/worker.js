/**
 * worker
 * @param {MessageEvent} e 
 */
self.onmessage = (e) => {
    console.log(e.data)
    postMessage('worker data')
};
