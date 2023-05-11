const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate.js')

// SERVER   

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');
const tempCard= fs.readFileSync('./templates/template-card.html', 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    // Overview
    if(pathname == "/" || pathname == "/overview"){
        res.writeHead(200, {
            "Content-type" : "text/html"
        })

        const htmlCard = productData.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", htmlCard);

        res.end(output);
    }

    // Product
    else if(pathname == "/product"){
        res.writeHead(200, {
            "Content-type" : "text/html"
        })
        const product = productData[query.id]
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }   

    // Api
    else if(pathname == "/api"){
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