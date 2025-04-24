// Doing the same thing with http
const http = require("http");
const myServer = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            res.end("This is index page");
            break;
        case '/about':
            res.end("This is about page!");
            break;
        default:
            res.end("Error 404 | Page not found");
    }
});
myServer.listen(8000, () => {
    console.log("Server is running");
})