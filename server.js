#!/usr/bin/env node

/**
 * Servidor HTTP simple para desarrollo local
 * Soluciona problemas de localStorage con file://
 *
 * Uso: node server.js
 * Luego abre: http://localhost:8080/control.html
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './control.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Error del servidor: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║     Servidor Local - Ping Pong Overlay Premium        ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`  🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log('');
    console.log('  📂 Archivos disponibles:');
    console.log(`     • Control Panel:  http://localhost:${PORT}/control.html`);
    console.log(`     • Overlay:        http://localhost:${PORT}/index.html`);
    console.log(`     • Test Licencia:  http://localhost:${PORT}/test-license.html`);
    console.log('');
    console.log('  💡 Presiona Ctrl+C para detener el servidor');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
});
