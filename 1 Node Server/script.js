const http = require("http");
const server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type" : "text/html"});
    res.write("<h1>Welcome Node Server</h1>");
    res.end();
});
server.listen(8000,(req,res)=>{
    console.log("================================");
    console.log("Node Server Running");
    console.log("================================");
    
})