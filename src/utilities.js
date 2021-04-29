const Discord = require("discord.js");
const client = new Discord.Client();
const spawn = require('child_process').spawn
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let fs = require('fs');
const path = require('path')
const FOLDER_TO_REMOVE = 'notas'

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
exports.deleteall=deleteall