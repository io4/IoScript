function parse (code, debug, context){
  var part = code.split("\n");
  var variables = context || {};
  var output = "";
  function variable(data, type, name){
    this.data = data;
    this.type = type || "String";
    this.name = name || "Anonymous";
    this.toString = function(){
      if(this.type == "String") return this.data;
      if(this.type == "Function") return `Function $(this.name): $(this.data)`
      if(this.type == "Binding") return "Native function"
      return this.data;
    }
  }
  for(var i = 0; i<part.length;i++){
    var parts = part[i].split(" ");
    function intOrString(s){
      if(parseInt(s.toString()).toString() == s.toString()){
        return parseInt(s.toString());
      } else return s.toString();
    }
    switch(parts[0]){
      case "set":
        if(parseInt(parts[3]).toString()==parts[3]) {
          variables[parts[1]] = new variable(parseInt(parts[3]),parts[1]);
        } else if(variables[parts[3]]){
          variables[parts[1]] = new variable(variables[parts[3]].data,parts[1]);
        } else {
          variables[parts[1]] = new variable(parts.slice(3),parts[1]);
        }
        break;
      case "print":
        if(variables[parts[1]]){
          output += variables[parts[1]].data.toString().replace(/\?\?/g," ").replace(/\*\*/g,"\n");
        } else {
          output += parts.slice(1).join(" ").replace(/\?\?/g," ").replace(/\*\*/g,"\n");
        }
        if (debug) console.log(variables[parts[1]],parts.slice(1).join(" "))
        break;
      case "func":
        variables[parts[1]] = new variable(parts.slice(2).join(" ").replace(/;/g,"\n"),"Function",parts[1]);
        break;
      case "call":
        if(variables[parts[1]]) {
          var vars = variables;
          vars.arguments = new variable(parts.slice(2).join(";"));
          if(variables[parts[1]].type == "Binding"){
            variables = variables[parts[1]].data(debug,vars,variable)
            break;
          }
          var out = parse(variables[parts[1]].data,debug,vars);
          variables = out.v;
          output+=out.o;
        }
        break;
      case "+":
        variables[parts[1]].data += intOrString(variables[parts[2]]?variables[parts[2]].data.toString():parts[2]);
        break;
      case "-":
        variables[parts[1]].data -= intOrString(variables[parts[2]]?variables[parts[2]].data.toString():parts[2]);
        break;
      case "*":
        variables[parts[1]].data *= intOrString(variables[parts[2]]?variables[parts[2]].data.toString():parts[2]);
        break;
      case "/":
        variables[parts[1]].data += intOrString(variables[parts[2]]?variables[parts[2]].data.toString():parts[2]);
        break;
      case "goto":
        i = parseInt(parts[1]);
        break;
      case "if":
        if(variables[parts[1]].data==variables[parts[2]].data) {
          if(variables[parts[3]]) {
            var vars = variables;
            var out = parse(variables[parts[3]].data,debug,vars);
            variables = out.v;
            output+=out.o;
          } else if(parts[3]=="die") {
            if (context) return {v:variables,o:output};
            return output;
          }
        } else {
          if(variables[parts[4]]) {
            var vars = variables;
            var out = parse(variables[parts[4]].data,debug,vars);
            variables = out.v;
            output+=out.o;
          } else if(parts[4]=="die") {
            if (context) return {v:variables,o:output};
            return output;
          }
        }
        break;
      case "die":
        if (context) return {v:variables,o:output};
        return output;
        break;
      case "get":
        var module = require("./modules/"+parts[1]);
        for(var x in module){
          variables[x] = new variable(module[x],"Binding",x);
        }
        break;
      }
      if(debug) console.log(variables);
      if(debug) console.log(output);
      if(debug) console.log(part[i]);
  }
  if (context) return {v:variables,o:output};
  return output;
}

console.log(parse(`
get fs
call read file.txt o
call write file2.txt o
`,true))
