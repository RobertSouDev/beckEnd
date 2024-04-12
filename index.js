// const http = require('http') // importando uma biblioteca do node criar novo servidor em uma determinada porta REQUIRE('HTTP')

// const fs = require('fs') // server paar escrever e ler arquivos no seu SO

// const PORT = 3000
// const FILE_PATH = "data.json" // caminho do arquivo

// const server = http.createServer((req, res) => {
//     // teste scopo a gente tem acessor  a qualquer requisao do servidor

//     const { method, url, header } = req;



//     let body = []

//     req.on('data', (chunk) => {
//         body.push(chunk);
//     }).on('end', () => {
//         body = Buffer.concat(body).toString();
//         if (method === "GET" && url === "/items") {
//             fs.readFile(FILE_PATH, 'utf8', (err, data) => {
//                 if (err) {
//                     res.writeHead(500, { 'Content-Type': 'application/json' })
//                     res.end(JSON.stringify({ message: "Internal Server Error" }))
//                     return
//                 }

//                 res.writeHead(200, { 'Content-Type': 'application/json' })
//                 res.end(data);
//                 return;
//             })
//         } else if (method === "POST" && url === "/items") {
//             fs.readFile(FILE_PATH, 'utf8', (err, data) => {
//                 if (err) {
//                     res.writeHead(500, { 'Content-Type': 'application/json' });
//                     res.end(JSON.stringify({ message: "Internal Server Error" }))
//                     return
//                 }

//                 res.writeHead(201, { 'Content-type': 'apllication/json' })
//                 res.end(JSON.stringify({ message: "item create" }))
//                 return
//             })
//         }   
//     })
// })


// server.listen(PORT, () => {
//     console.log(`Server ir running on http://localhost:${PORT}`);
// }) 

//Como usamos api rest através da linguagem js - Criação de uma api da maneira mais tradicional, hard, primitiva, "obsoleta"

//Vai criar um servidor em nossa máquina
const http = require("http"); //1) Vai criar um servidor em nossa máquina
const fs = require('fs') //fs = file system ---> serve para escrever e ler arquivos em seu sistema operacional


const FILE_PATH = "data.json" // caminho do arquivo

const PORT = 3000; //cria uma porta

// 2) Criação do escopo de meu servidor, ou seja, o que vai acontecer em meu servidor, aqui vou programar o que vai acontecer ao 
// receber a minha requisição
// Essas duas variáveis nessa função de callback. Nesse req vai me fornecer os dados de quem fez a requisição, corpo, ip, quem chamou, 
//a url, tudo de quem pediu. Já o res vai ser a minha resposta para essa chamada do servidor, por exemplo eu responder uma resposta de status
//200 por exemplo para sucesso, um devolver um texto.
const server = http.createServer((req, res)=>{

    const {method, url, headers} = req; //O req: O objeto req representa a requisição HTTP recebida pelo servidor.

    let body = []


    //as transferencias de dados se dão por pacotes, pedaços por pedaços, tipo o youtube carregando, que assim tenho certa economia de
    //dados, vem por pacoteds de bytes (chunk = pedaço). Para fazer com que isso aconteça assim, podemos usar os eventos. 
    //O método on() é usado para escutar eventos em objetos no Node.js.
    // e o end, ao final, 
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();

        if(method === "GET" && url === "/items"){
            fs.readFile(FILE_PATH, 'utf8', (err, data) => {
                if(err){
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Internal Server Error'}));
                    return;
                }

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
                return;
            });         
        } else if( method === "POST" && url === "/items"){
            fs.readFile(FILE_PATH, 'utf8', (err, data) => {
                if(err){
                    res.writeHead(500, {'Content-Type':'application/json'});
                    res.end(json.stringify({massage:'Internal Server Error'}));
                    return;
                }

                let items = JSON.parse(data);
                items.push(JSON.parse(body));

                fs.writeFile(FILE_PATH, JSON.stringify(items), (err) => {
                    if(err){
                        res.writeHead(500, {'Content-Type':'application/json'});
                        res.end(json.stringify({massage:'Internal Server Error'}));
                        return;
                    }

                res.writeHead(201, {"Content-Type":"application/json"});
                res.end(JSON.stringify({message: "Item created"}));

            })
        })
    }
    

    // //Status da resposta, objeto com os headers 
    // res.writeHead(200, {
    //     'Content-Type':'text/html'
    // });
    // //este res.end('alguma coisa em html) serve para eu retornar algo para a tela do meu usuário, encerra de modo que eu
    // res.end('<h1>Hello World</h1>');

})
})
  
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})