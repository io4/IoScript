const fs = require("fs");

var read = function(debug, vars, variable){
  vars[vars.arguments.data.split(";")[1]] = new variable(fs.readFileSync(vars.arguments.data.split(";")[0]).toString());
  return vars;
}
var write = function(debug, vars, variable){
  fs.writeFileSync(vars.arguments.data.split(";")[0],vars[vars.arguments.data.split(";")[1]]);
  return vars;
}
module.exports = {
  read: read,
  write: write
};
