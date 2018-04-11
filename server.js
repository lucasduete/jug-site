// Importa Dependencias
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

// Define o express 
app.use(express.static(path.join(__dirname + '/src')));

// Para todas as Requisicoes GET, Reenvia para index.html
// ativando a PathLocationStrategy para acesso direto
// a sub-rotas

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});


// Define a Porta
app.set('port', port)


//escuta a porta
const server = http.createServer(app);
server.listen(port, () => console.log('Servidor Rodando na Porta : ' + port));