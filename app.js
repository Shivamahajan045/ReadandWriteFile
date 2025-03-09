/*Buffers and streams  are used in handling large amount of data efficiently in Node.js
 Buffer - Temporary memory space allocatd to hold binary data
why use buffers
when dealing with binary data
when working with I/O operation
prevent excessive memory usage

Streams - continuous flow of data that can be processed piece by piece without keeping everything in memory
used to handle large files efficiently, improves performace by processing data
used in video streaming and large size file uploads

*/

const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<form action="/message" method="POST">
        <label id="username">Name:</label>
        <input type="text" name="username" />
        <button type="submit">Add</button>
      </form>
      `
    );
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");
      let dataChunks = [];
      req.on("data", (chunks) => {
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let combinedBuffer = Buffer.concat(dataChunks);
        let formData = combinedBuffer.toString().split("=")[1];
        fs.writeFile("formValues.txt", formData, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    } else {
      if (req.url == "/read") {
        //read from file
        fs.readFile("formValues.txt", (err, data) => {
          res.end(`<h1>${data.toString()}</h1>`);
        });
      }
    }
  }
});

server.listen(3000, () => {
  console.log("server is running!");
});
