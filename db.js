const mysql = require('mysql2/promise')

async function connectDB() {

    if(global.connection && global.connection.state !== 'disconnected') {

        return global.connection

    }

    const connection = await mysql.createConnection({

        host: 'localhost',
        port:3306,
        user:'root',
        password:'',
        database:'padaria'

    });

    global.connection = connection
    return global.connection

}

async function listProdutos(){

    const connection = await connectDB()
    const [registros] = await connection.query('select * from produto;')
    return registros

}

async function insertProduto(produto){

    const connection = await connectDB()
    const sql = "insert into produto (prodnome, prodpreco, prodqtd) values (?,?,?);"
    return await connection.query(sql, [produto.name, produto.preco, produto.qtd])

}

async function deleteProduto(codigo){

    const connection = await connectDB()
    const sql = "delete from produto where prodcodigo=?;"
    return await connection.query(sql,[codigo])

}

module.exports = { listProdutos, insertProduto, deleteProduto }