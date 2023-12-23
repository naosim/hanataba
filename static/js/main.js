import {PoccoIO} from "./PoccoIO.mjs"

(async function() {
  var poccoIO = new PoccoIO();
  // var obj = await poccoIO.read("data.json");
  var obj = await poccoIO.write("data.json", {value: "bye-by1e"});
  console.log(obj);
})()




export class 単品 {
  花コード
  仕入れ先コード
}

export class 仕入れ先 {
  仕入れ先コード
}


