import {PoccoIO} from "./PoccoIO.mjs"

(async function() {
  var poccoIO = new PoccoIO();
  // var obj = await poccoIO.read("data.json");
  /** @type {Array} */
  var ary = await poccoIO.read("doc.json");
  var classDefs = ary
    .filter(v => v.kind == "class")
    .map(v => {
      var properties = v.classDef.properties.map(p => {
        // console.log(p.jsDoc);
        return {
          propertyName: p.name,
          type: p.jsDoc?.tags.filter(t => t.kind == "type").map(t => t.type)[0] || "any"
        }
      })
      var location = decodeURI(v.location.filename)
      return {
        className: v.name,
        extends: v.classDef.extends,
        properties: properties,
        location: location,
        package: location.split("/").at(-1),
        org: v
      }
    });
  console.log(classDefs);

  console.log("classDiagram\n" + classDefs.map(v => {
    const lines = [`  class ${v.className}{`];
    v.properties
      .map(p => `    +${p.type} ${p.propertyName}`).forEach(p => lines.push(p))
    lines.push("  }")
    const ignoreTypes = new Set(["any", "string", "boolean", "number", "Date"])
    v.properties
      .filter(p => !ignoreTypes.has(p.type) )
      .map(p => `  ${v.className} --> ${p.type.split("[]").join("")}`).forEach(p => lines.push(p))
    return lines.join("\n")
  }).join("\n"))

})()