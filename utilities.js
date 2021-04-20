const Discord = require("discord.js");
const client = new Discord.Client();
const spawn = require('child_process').spawn
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let fs = require('fs');

function crearCsv( cc, psw) {
  
    const csvWriter = createCsvWriter({
      path: 'Mensajes.csv',
      header: [
        {id: 'mensaje', title: 'mensaje'}, 
      ]
    });
  
    const data = [
      {
        mensaje: cc
      }, {
        mensaje: psw
      }
    ];

    csvWriter
      .writeRecords(data)
      .then(()=> console.log('The CSV file was written successfully'));
    
}

const ejecutarPy = () => {
    return new Promise ((resolve, reject) => {
      spawn('python', ['./botInicioPlataforma.py'])
      setTimeout(() => {
        resolve("listo")
      }, 27000);
    })
}



exports.crearCsv=crearCsv