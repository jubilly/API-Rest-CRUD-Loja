var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000,
    con = require('./connection-db'),
    md5 = require('md5');;

var cors = require('cors');
const { request, response } = require('express');

var server = app.listen(port, function(){
    server.address().address
    server.address().port
    console.log("Servidor funcionando");
});

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get('/', (request, response) => {
  response.json( 'teste da rota index da api :DD')
  console.log('teste da rota index da api')
});

function connectionSGBD (sql, response) {
  con.query(sql, function(error, rows, results){
    if(error){
      response.json(error);
    }
    else{
      console.log(rows)
      response.json(rows);
    }
  })
}

app.get('/listagemfuncionario',(request, response)=>{
    var sql = `select * from funcionarios`;
    connectionSGBD(sql, response);
})

app.post('/cadastrofuncionario', (request, response) =>{
    var sql,
    nome = request.body.nome,
    cpf = request.body.cpf,
    rg = request.body.rg,
    endereco = request.body.endereco,
    salario = parseFloat(request.body.salario),
    telefone = request.body.telefone,
    cargo = request.body.cargo;
    console.log(nome, cpf, rg, endereco,salario, telefone, cargo)
    sql = `insert into funcionarios (Nome, CPF, RG, Endereco, salario, telefone, cargo) values ('${nome}', '${cpf}', '${rg}', '${endereco}', ${salario}, '${telefone}', '${cargo}')`;
    connectionSGBD(sql, response);
})

app.post('/editarfuncionario', (request, response) => {
  var id = request.body.id, 
      nome = request.body.nome,
      cpf = request.body.cpf,
      rg = request.body.rg,
      endereco = request.body.endereco,
      salario = request.body.salario,
      telefone = request.body.telefone,
      cargo = request.body.cargo;
  console.log(id, nome, cpf, rg, endereco, salario, telefone, cargo)
  console.log(cargo)
  var selectTable = `update funcionarios set Nome = '${nome}', CPF = '${cpf}', RG = '${rg}', Endereco = '${endereco}', salario ='${salario}', telefone='${telefone}', cargo = '${cargo}' where Id = ${id};`;
  connectionSGBD(selectTable, response)
})

app.post('/buscafuncionario', (request,response)=>{
    var datafilter = request.body.data;
    var sql = `SELECT * FROM funcionarios 
      where Nome LIKE '%${datafilter}%'`; 
   console.log(datafilter)
  connectionSGBD(sql, response)
})

app.post('/cadastrocliente', (request, response) =>{
    var sql,
    nome = request.body.nome,
    rg = request.body.rg,
    endereco = request.body.endereco,
    telefone = request.body.telefone,
    tipocliente = request.body.tipocliente,
    telefone = request.body.telefone,
    razaosocial = request.body.razaosocial,
    cnpj = request.body.cnpj,
    cpf = request.body.cpf;
    console.log(nome,rg,endereco,telefone, razaosocial)
    sql = `
    insert into cliente (nome, endereco, telefone, RG, TipoCliente, RazaoSocial, CNPJ, CPF) values 
  ('${nome}', '${endereco}', '${telefone}', '${rg}', '${tipocliente}', '${razaosocial}', '${cnpj}', '${cpf}');
    `;
    connectionSGBD(sql, response);
})

app.get('/listagemcliente',(request, response)=>{
  var sql = `select * from cliente`;
  connectionSGBD(sql, response);
})

app.post('/editarcliente', (request, response) => {
  var id = request.body.id, 
      nome = request.body.nome,
      cpf = request.body.cpf,
      cnpj = request.body.cnpj,
      rg = request.body.rg,
      endereco = request.body.endereco,
      tipocliente = request.body.tipocliente,
      telefone = request.body.telefone,
      razaosocial = request.body.razaosocial;

      console.log(nome, cpf, cnpj, rg, endereco, tipocliente, telefone, razaosocial)

  var selectTable = `update cliente set nome = '${nome}', endereco = '${endereco}', telefone = '${telefone}', RG = '${rg}', TipoCliente='${tipocliente}', RazaoSocial='${razaosocial}', CNPJ='${cnpj}', CPF='${cpf}' where Id_cliente = ${id};`;
  connectionSGBD(selectTable, response)
})

app.post('/cadastroproduto', (request, response) =>{
  var sql,
  nome = request.body.nome,
  cod_barras = request.body.cod_barras,
  valor  = request.body.valor,
  descricao  = request.body.descricao,
  vencimento  = request.body.vencimento,
  tipoproduto  = request.body.tipoproduto,
  fabricante = request.body.fabricante;
  sql = ` insert into produtos (Nome, Valor, Fabricante, 
    Descricao, Cod_Barras, Vencimento, TipoProduto) values 
    ('${nome}', ${valor}, '${fabricante}', '${descricao}', 
    '${cod_barras}', '${vencimento}', '${tipoproduto}');`;
  connectionSGBD(sql, response);
})

app.get('/listagemprodutos',(request, response)=>{
  var sql = `select * from produtos`;
  connectionSGBD(sql, response);
})

app.post('/editarprodutos', (request, response) => {
  var id = request.body.id, 
      nome = request.body.nome,
      cod_barras = request.body.cod_barras,
      valor  = request.body.valor,
      descricao  = request.body.descricao,
      cod_barras  = request.body.cod_barras,
      vencimento  = request.body.vencimento,
      tipoproduto  = request.body.tipoproduto,
      fabricante = request.body.fabricante;

  var selectTable = `update produtos set Nome = '${nome}', 
      Valor = '${valor}', Fabricante = '${fabricante}', 
      Descricao = '${descricao}', Cod_barras='${cod_barras}', 
      Vencimento='${vencimento}', TipoProduto='${tipoproduto}' 
      where Id = ${id};`;
  connectionSGBD(selectTable, response)
})