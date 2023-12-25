deno doc --json ./static/js/**/*.mjs ./static/js/**/**/*.mjs > file/doc.json
deno repl --allow-read --allow-write << __EOF__
var filepath = "./file/doc.json";
var text = await Deno.readTextFileSync(filepath);
var newText = text.split("file://" + Deno.cwd()).join(".")
await Deno.writeTextFile(filepath, newText);
__EOF__