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
const routes = require("./routes");
const server = http.createServer(routes);

routes.testFunction(2, 3);

server.listen(3000, () => {
  console.log("server is running!");
});
