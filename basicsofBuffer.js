let value1 = "ABC";
const bufferValue1 = Buffer.from(value1);

let value2 = " XYZ";
const bufferValue2 = Buffer.from(value2);
console.log(bufferValue1, bufferValue2);

let combinedBuffer = Buffer.concat([bufferValue1, bufferValue2]);
console.log(combinedBuffer.toString());
