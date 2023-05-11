const fs = require('fs');
const http = require('http');
const url = require('url');

// SERVER   
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview
    if(pathName == "/" || pathName == "/overview"){
        res.end("This is the OVERIVEW");
    }

    // Product
    else if(pathName == "/product"){
        res.end("This is the PRODUCT");
    }

    // Api
    else if(pathName == "/api"){
        res.writeHead(200, {
            "Content-type" : "application/json"
        })
        res.end(data);
    }

    // Page not found
    else{
        res.writeHead(400, {
            "Content-type": "text/html"
        })
        res.end("<h2>PAGE NOT FOUND!</h2>")
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to you on port 8000!");
})