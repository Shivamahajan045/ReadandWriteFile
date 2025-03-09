const fs = require("fs");
const requestHandler = (req, res) => {
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
    if (req.url == "/message" && req.method === "POST") {
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
};

const sum = (a, b) => {
  console.log(a + b);
};

module.exports = {
  handler: requestHandler,
  calSum: sum,
};

//direct export keyword

// module.exports.calSum = sum;
// module.exports.handler = requestHandler;
