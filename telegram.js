const { Telegraf }  = require('telegraf')
const ut = require("./utilities.js")
const init_scraping = require("./botInicio.js")
const fs = require('fs');

const keyFile = JSON.parse(fs.readFileSync('./keyFile.json').toString())

const bot = new Telegraf(keyFile.tokenTelegram)

bot.start((ctx) => {
    ctx.reply('Bienvenido \nPara usar el bot, digite el siguiente comando: \n\n/notas cedula contraseña \n\nEstas son las credenciales del portal estudiantil.')
})

bot.command('notas', async (ctx) => {

    if (ctx.message.text.toString().trim().length <= 6) {
        ctx.reply('Para ver sus notas, debe usar el comando asi: \n\n/notas cedula contraseña \n\nEstas son las credenciales del portal estudiantil.') 
    } else {
        const loading = ctx.reply('Este proceso puede tardar hasta 30s, ya que la página de la universidad es muy lenta.\n\nLoading...')
        const args = ctx.message.text.replace(/ +(?= )/g, "").trim().split(/ +/g);
        ut.crearCsv( args[1], args[2]) 
        
        init_scraping.openUTP().then( async (resultado) => {
            setTimeout(async () => {
                if ( fs.existsSync("./notas/notas.jpg")){
                    await ctx.replyWithPhoto({source: 'notas/notas.jpg'});
                    // await ctx.replyWithPhoto({source: 'screenshotRecortado2.png'});
                    // setTimeout(() => {
                    //     fs.unlink('screenshotRecortado.png',function(err){
                    //         if(err) return console.log(err);
                    //     }); 
                    //     fs.unlink('screenshotRecortado2.png',function(err){
                    //         if(err) return console.log(err);
                    //     });  
                    // }, 1000);
                    console.log("Enviado con exito a " + ctx.from.first_name) 
                 
                } else {
                    console.log("Enviado sin exito a " + ctx.from.first_name) 
                    ctx.reply('Al parecer la pagina de la universidad no dio respuesta, intenta unos minutos mas tarde.')
                }
            }, 27000);
        })              
    }
})
bot.launch()
