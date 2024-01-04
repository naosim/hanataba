var filepath = "./file/doc.json";
var text = await Deno.readTextFileSync(filepath);
console.log(Deno.cwd().split("\\").join("/"))
var newText = text.split(("file:///" + Deno.cwd().split("\\").join("/")).split("////").join("///")).join(".")
await Deno.writeTextFile(filepath, newText);