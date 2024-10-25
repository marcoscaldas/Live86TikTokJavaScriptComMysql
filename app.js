const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path  = require('path');

const app = express();
const port = 3000;

//CONFIGURAR CONEXAO COM O BANCO
const connection = mysql.createConnection( { 
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'aula'
    //port: '3306'

 });

 //CONECTAR AO BANCO DE DADOS
 connection.connect(err =>{
    if(err){
        console.error('Erro ao conectar ao banco!');
        return;
    }
    console.log('Conectado ao banco!');
 });

//CONFIGURAR O BODY-PARSER
app.use( bodyParser.urlencoded( { extended: true }));


//CONFIGURAR O ARQUIVO ESTATICO
app.use( express.static( path.join(__dirname)));


// SERVIR O FORMULARIO
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

//PROCESSAR OS DADOS DO FORMULARIO

app.post('/inserirCliente', (req, res)=>{  

       const { nome, email, telefone, endereco } = req.body;
       const sql = 'CALL inserirCliente(?, ?, ?, ?)'; 
       connection.query(sql, [nome, email, telefone, endereco], (err, results)=>{

        if(err){
            console.error('Erro ao inserir cliente:', err);
            res.send('Erro ao inserir cliente.');
            return;
        }
        res.send('Cliente inserido com sucesso!');

       });

    });












 //INICIAR O SERVIDOR
app.listen(port,()=>{  
    console.log(`Servidor rodando em http://localhost:${port} `);
});






