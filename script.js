const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Read stored name before responding
    fs.readFile("newform.txt", (err, data) => {
      let storedName = data.toString();

      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;
      res.end(`
        <h1>Previously Submitted: ${storedName}</h1>
        <form action="/message" method="POST">
          <label>Name:</label>
          <input type="text" name="username">
          <button type="submit">Add</button>
        </form>
      `);
    });
  } else if (req.url === "/message" && req.method === "POST") {
    let dataArray = [];

    req.on("data", (chunks) => {
      dataArray.push(chunks);
    });

    req.on("end", () => {
      let combinedBuffer = Buffer.concat(dataArray);
      let value = combinedBuffer.toString().split("=")[1];

      // Save the submitted name to a file
      fs.writeFile("newform.txt", value, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end(); // Ensure response ends here
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
