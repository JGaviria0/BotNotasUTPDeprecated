const Discord = require("discord.js");
const client = new Discord.Client();
const spawn = require('child_process').spawn
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ut = require("../utilities.js")
let fs = require('fs');
const keyFile = JSON.parse(fs.readFileSync('./keyFile.json').toString())


//No esta en funcionamiento
const prefix = "!"

fs.readFile('archivo.txt', 'utf-8', (err, data) => {
  const token = data
});
 
client.on("ready", () => { 
   console.log("Estoy listo!");
});
 
client.on("message", async (message) => {

  const args = message.content.replace(/ +(?= )/g, "").slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  if(message.content.startsWith(prefix + "notas")) {
    
    ut.crearCsv( args[0], args[1]) 
    const loading = await message.channel.send("Loading...");
    ut.scraping().then( () => {
      const img =  new Discord.MessageAttachment("screenshotRecortado.png")
      message.channel.send(img)
      setTimeout(() => {
        fs.unlink('screenshotRecortado.png',function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
        });  
      }, 2000);
      const img2 = new Discord.MessageAttachment("screenshotRecortado2.png")
      message.channel.send(img2)
      setTimeout(() => {
        fs.unlink('screenshotRecortado2.png',function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
        });  
      }, 2000);
      loading.delete().catch(console.error);
    })
  } 
 });
 
 client.login(keyFile.tokenDiscord);