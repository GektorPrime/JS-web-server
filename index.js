const http = require('http');
const path = require('path');
const fs = require('fs');
const { fileURLToPath } = require('url');

const server = http.createServer((req, res) => {
    //Build file path
    let fliePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    );
    
    //Ext of the file
    let extname = path.extname(fliePath);
    //init content type
    let contentType = 'text/html';
    //check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/pjpg';
            break;
    }

    //read file
    fs.readFile(fliePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html' });
                    res.end(content, 'utf8'); 
                })
            } else {
                //some server errror
                res.writeHead(500);
                res.end(`Server Error:`, err.code);
            }
        } else {
            //success
            res.writeHead(200, {'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
// console.log(fliePath);
// res.end();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port',PORT));