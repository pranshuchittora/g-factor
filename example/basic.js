const gfactor = require("../dist/index").default;

process.env.SIZE = '90000000000000000000'
console.log(gfactor('./'));
console.log(gfactor('../'));
// console.log(gfactor('../../'));
