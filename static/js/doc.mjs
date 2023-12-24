import {PoccoIO} from "./PoccoIO.mjs"
// @ts-ignore
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({startOnLoad: false});

const rootPath = "/js/";

(async function() {
  var poccoIO = new PoccoIO();
  // var obj = await poccoIO.read("data.json");
  /** @type {Array} */
  var ary = await poccoIO.read("doc.json");
  var classDefs = ary
    .filter(v => v.kind == "class")
    .map(v => new ClassDef(v));
  console.log(classDefs);
  // @ts-ignore
  console.log(document.querySelector(".mermaid").innerHTML = toMermaidFlowchartText(classDefs));
  mermaid.init();
})()

/**
 * 
 * @param {ClassDef[]} classDefs 
 */
function toMermaidText(classDefs) {
  var text = "\nclassDiagram\n" + classDefs.map(v => {
    const lines = [];
    lines.push(`  namespace ${v.namespace} { class ${v.className} }`);

    if(v.isAbstract) {
      lines.push(`  <<Abstract>> ${v.className}`)
    }

    // プロパティ
    v.properties.map(p => `  ${v.className} : +${p.type} ${p.propertyName}`).forEach(p => lines.push(p))
    
    // メソッド
    v.methods.map(p => `  ${v.className} : +${p.returnType} ${p.methodName}()${p.isStatic ? "$" : ""}`).forEach(p => lines.push(p))

    // 依存関係
    const ignoreTypes = new Set(["any", "string", "boolean", "number", "Date", "void"])
    var dependecies = new Set();
    v.properties
      .map(p => p.type.split("[]").join(""))
      .filter(p => v.className != p)
      .filter(p => !ignoreTypes.has(p))
      .forEach(p => dependecies.add(p));
    v.methods
      .map(p => p.returnType.split("[]").join(""))
      .filter(p => v.className != p)
      .filter(p => !ignoreTypes.has(p))
      .forEach(p => dependecies.add(p));
    dependecies.forEach(p => lines.push(`  ${v.className} --> ${p}`));
    
    lines.push("") // 見やすくするための空行

    return lines.join("\n")
  }).join("\n")

  text = text.split(">").join("&gt;").split("<").join("&lt;");
  return text;
}

/**
 * 
 * @param {ClassDef[]} classDefs 
 */
function toMermaidFlowchartText(classDefs) {
  var text = "\nflowchart LR\n" + classDefs.map(v => {
    const lines = [];
    v.namespaces.forEach(n => lines.push(`subgraph ${n}`))
    lines.push(`${v.className}["${toInnerClassText(v)}"]`);
    v.namespaces.forEach(n => lines.push(`end`))

    // 依存関係
    const ignoreTypes = new Set(["any", "string", "boolean", "number", "Date", "void"])
    var dependecies = new Set();
    v.properties
      .map(p => p.type.split("[]").join(""))
      .filter(p => v.className != p)
      .filter(p => !ignoreTypes.has(p))
      .forEach(p => dependecies.add(p));
    v.methods
      .map(p => p.returnType.split("[]").join(""))
      .filter(p => v.className != p)
      .filter(p => !ignoreTypes.has(p))
      .forEach(p => dependecies.add(p));
    dependecies.forEach(p => lines.push(`  ${v.className} --> ${p}`));
    return lines.join("\n")
  }).join("\n")

  text = text.split(">").join("&gt;").split("<").join("&lt;").split("-hr-").join("<hr>");
  return text;
}

/**
 * 
 * @param {ClassDef} classDef 
 */
function toInnerClassText(classDef) {
  const propertylines = [];
  classDef.properties.map(p => `+${p.type} ${p.propertyName}`).forEach(p => propertylines.push(p));
  const methodlines = [];
  classDef.methods.map(p => `+${p.returnType} ${p.methodName}()${p.isStatic ? "$" : ""}`).forEach(p => methodlines.push(p))
  return `${classDef.className}${classDef.isAbstract ? "\n**abstract**" : ""}-hr-${propertylines.join("\n")}-hr-${methodlines.join("\n")}`.trim()
}

class ClassDef {
  className
  extends
  properties
  methods
  location
  package
  org
  isAbstract
  constructor(denoDocClassObj) {
    var properties = denoDocClassObj.classDef.properties.map(p => {
      return {
        propertyName: p.name,
        type: p.jsDoc?.tags.filter(t => t.kind == "type").map(t => t.type)[0] || "any"
      }
    })

    var methods = denoDocClassObj.classDef.methods.map(p => {
      /** @type {any[]} */
      const tags = p.jsDoc?.tags || [];
      var returnType = tags.filter(t => t.kind == "return").map(t => t.type)[0] || "void";
      // Promiseを消す。モデリングにおいて重要な情報でないため
      returnType = returnType.split("Promise<").join("").split(">").join("")
      return {methodName: p.name, returnType, isStatic: p.isStatic}
    })

    var location = decodeURI(denoDocClassObj.location.filename)

    var isAbstract = denoDocClassObj.jsDoc?.tags?.filter(v => v.kind == "unsupported" && v.value == "@abstract").length > 0;

    this.className = denoDocClassObj.name,
    this.extends = denoDocClassObj.classDef.extends,
    this.properties = properties,
    this.location = location,
    this.package = location.split("/").at(-1),
    this.org = denoDocClassObj
    this.methods = methods
    this.isAbstract = isAbstract
  }
  
  get namespace() {
    return this.location.split(rootPath)[1].split("/").at(-1)?.split(".").join("_");
  }
  get namespaces() {
    return this.location.split(rootPath)[1].split("/").map(v => v.split(".").join("_"));
  }
}

function denoDocで生成されたクラスオブジェクトを最小単位のクラスオブジェクトを生成する() {

}