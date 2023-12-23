export class PoccoIO {
  #portNumber
  constructor(portNumber = 8080) {
    this.#portNumber = portNumber;
  }
  async read(filename) {
    const res = await fetch(this.#createUrl(filename))
    if(await res.status >= 400) {
      throw new Error("not write: " + filename);
    }
    return await res.json();
  }
  async write(filename, obj) {
    const res = await fetch(
      this.#createUrl(filename), 
      {method: "POST", body: JSON.stringify(obj)}
    );
    if(await res.status >= 400) {
      throw new Error("not write: " + filename);
    }
  }
  #createUrl(filename) {
    return `http://localhost:${this.#portNumber}/file/${filename}`
  }
}