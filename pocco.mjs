import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const reqPath = req.url;
  const sanitizedPath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, sanitizedPath);

  if (req.method === 'POST') {
    if(sanitizedPath.indexOf("file") == -1) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error writing to file');
      return;
    }
    // POSTリクエストの場合はデータを受信してファイルを上書き保存
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      
      // ファイルの書き込み
      fs.writeFile(filePath, body, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error writing to file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('File updated successfully');
        }
      });
    });
  } else if (req.method === 'GET') {
    // GETリクエストの場合はファイルを読み込んで返す
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        const fileExtension = path.extname(filePath).toLowerCase();
        let contentType = 'text/plain';
        if (fileExtension === '.html') contentType = 'text/html';
        else if (fileExtension === '.js') contentType = 'application/javascript';
        else if (fileExtension === '.mjs') contentType = 'application/javascript';
        else if (fileExtension === '.json') contentType = 'application/json';
        else if (fileExtension === '.css') contentType = 'text/css';
        else if (fileExtension === '.jpg') contentType = 'image/jpeg';
        else if (fileExtension === '.png') contentType = 'image/png';
        else if (fileExtension === '.gif') contentType = 'image/gif';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    // サポートされていないメソッドの場合はエラーレスポンスを返す
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Unsupported method');
  }
});

const port = process.argv[2] || 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});