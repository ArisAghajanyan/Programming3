var express = require("express");
var app = express();  
var server = require("http").Server(app);
var io = require("socket.io")(server); 
var massages = []; 

app.use(express.static("."));
app.get("/",function(req,res){
    res.redirect("index.htm");
});
server.listen(3000);

io.on("connection", function (socket) {
    for (var i in messages){
        io.sockets.emit("display message", massages[i]);

    }
    socket.on("send message", function (data) {
        massages.push(data);
        io.sockets.emit("display message", data);
        
    })
})