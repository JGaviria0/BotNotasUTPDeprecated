const Discord = require("discord.js");
const client = new Discord.Client();
const spawn = require('child_process').spawn
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let fs = require('fs');
const path = require('path')
const FOLDER_TO_REMOVE = 'notas'

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
      .then(()=> console.log('The CSV file was written successfully'))
    
}

function ejecutarPy() {
  spawn('python', ['./Concatenar.py'])
}

function deleteall() {
  const directory = './src/notas';
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

//deleteall()
exports.crearCsv=crearCsv
exports.deleteall=deleteall