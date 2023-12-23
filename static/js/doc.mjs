import {PoccoIO} from "./PoccoIO.mjs"
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({startOnLoad: false});

(async function() {
  var poccoIO = new PoccoIO();
  // var obj = await poccoIO.read("data.json");
  /** @type {Array} */
  var ary = await poccoIO.read("doc.json");
  var classDefs = ary
    .filter(v => v.kind == "class")
    .map(v => new ClassDef(v));
  console.log(classDefs);

  var text = "\nclassDiagram\n" + classDefs.map(v => {
    const lines = [`  class ${v.className}{`];
    // プロパティ
    v.properties
      .map(p => `    +${p.type} ${p.propertyName}`).forEach(p => lines.push(p))
    
    
    // メソッド
    v.methods.map(p => `    +${p.methodName}()`).forEach(p => lines.push(p))

    lines.push("");// 空行が必要
    lines.push("  }")

    // 依存関係
    const ignoreTypes = new Set(["any", "string", "boolean", "number", "Date"])
    var dependecies = new Set();
    v.properties
      .filter(p => !ignoreTypes.has(p.type) )
      .forEach(p => dependecies.add(p.type.split("[]").join("")));
    dependecies.forEach(p => lines.push(`  ${v.className} --> ${p}`));
      // .map(p => `  ${v.className} --> ${p.type.split("[]").join("")}`).forEach(p => lines.push(p))
    return lines.join("\n")
  }).join("\n")

  text = text.split(">").join("&gt;");
  console.log(text);
  document.querySelector(".mermaid").innerHTML = text;
  mermaid.init();
})()

class ClassDef {
  className
  extends
  properties
  methods
  location
  package
  org
  constructor(denoDocClassObj) {
    var properties = denoDocClassObj.classDef.properties.map(p => {
      // console.log(p.jsDoc);
      return {
        propertyName: p.name,
        type: p.jsDoc?.tags.filter(t => t.kind == "type").map(t => t.type)[0] || "any"
      }
    })

    var methods = denoDocClassObj.classDef.methods.map(p => {
      return {methodName: p.name}
    })

    var location = decodeURI(denoDocClassObj.location.filename)

    this.className = denoDocClassObj.name,
    this.extends = denoDocClassObj.classDef.extends,
    this.properties = properties,
    this.location = location,
    this.package = location.split("/").at(-1),
    this.org = denoDocClassObj
    this.methods = methods
  }
}

function denoDocで生成されたクラスオブジェクトを最小単位のクラスオブジェクトを生成する() {

}