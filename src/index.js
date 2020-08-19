const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//const porta = process.env.PORT || 3000;
const porta =  3000;

const cursos = [
    {id: 1, nome:'curso 1'},
    {id: 2, nome:'curso 2'},
    {id: 3, nome:'curso 3'},
    {id: 4, nome:'curso 4'},
];
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//direciona ao index
app.get("/",(req,res) => {
    res.sendFile('/front/index.html',{root:__dirname});
});

//retorna todo o array
app.get("/api",(req,res) => {
    res.send(cursos);
});

//retorna o array na posição id
app.get("/api/:id", (req,res) =>{
    const  curso = cursos.find(c => c.id === parseInt(req.params.id));
    if(!curso){
        res.status(404).send(" 404 - Não encontrado");
    }
    res.send(curso);
});

//adiciona ao array
app.post('/api',(req,res)=>{
    if(!req.body.nome){
        res.status(400).send("Invalido");
        return;
    }
    const curso = {
        id: cursos.length+1,
        nome: req.body.nome
    };
    cursos.push(curso);
    res.send(curso);
})

//atualizar
app.put('/api/:id',(req,res)=>{
    //convere se ta td certo
    const  curso = cursos.find(c => c.id === parseInt(req.params.id));
    if(!curso){
        return res.status(404).send(" 404 - Não encontrado");
    }
    //deveria validar
    if(!req.body.nome){
        return res.status(400).send("Invalido");
        
    }
    //update
    curso.nome = req.body.nome;
    res.send(curso);
});

app.delete('/api/:id',(req,res)=>{
    const  curso = cursos.find(c => c.id === parseInt(req.params.id));
    if(!curso){
        return res.status(404).send(" 404 - Não encontrado");
    }
    const index = cursos.indexOf(curso);
    cursos.splice(index,1);
    res.send(curso);
});



app.listen(process.env.PORT || porta);