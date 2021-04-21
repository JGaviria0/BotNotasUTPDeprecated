const { Telegraf }  = require('telegraf')
const ut = require("./src/utilities.js")
const init_scraping = require("./src/botInicio.js")
const spawn = require('child_process').spawn
const fs = require('fs');

const keyFile = JSON.parse(fs.readFileSync('./src/keyFile.json').toString())

const bot = new Telegraf(keyFile.tokenTelegram)

bot.start((ctx) => {
    ctx.reply('Bienvenido \nPara usar el bot, digite el siguiente comando: \n\n/notas cedula contraseña \n\nEstas son las credenciales del portal estudiantil.')
})

bot.command('notas', async (ctx) => {

    if (ctx.message.text.toString().trim().length <= 6) {
        ctx.reply('Para ver sus notas, debe usar el comando asi: \n\n/notas cedula contraseña \n\nEstas son las credenciales del portal estudiantil.') 
    } else {
        const loading = ctx.reply('Este proceso puede tardar hasta 30s, ya que la página de la universidad es muy lenta.\n\nLoading...\n\nRecuerda que estas en una versión beta, si ocurre algún error no dudes hacernos saber tu inconveniente.')
        const args = ctx.message.text.replace(/ +(?= )/g, "").trim().split(/ +/g)
        ut.crearCsv( args[1], args[2]) 
        
        init_scraping.openUTP().then( async (resultado) => {
            setTimeout(async () => {
                spawn('python', ['./src/Concatenar.py'])
                if ( fs.existsSync("./src/notas/notas.jpg")){
                    await ctx.replyWithPhoto({source: 'src/notas/notas.jpg'});
                    setTimeout(() => {
                        ut.deleteall()
                        ut.crearCsv("","")
                    }, 1000);
                    console.log("Enviado con exito a " + ctx.from.first_name) 
                 
                } else {
                    console.log("Enviado sin exito a " + ctx.from.first_name) 
                    ut.crearCsv("","")
                    ut.deleteall()
                    ctx.reply('Al parecer la pagina de la universidad no dio respuesta, intenta unos minutos mas tarde.')
                }
            }, 27000);
        })              
    }
})
bot.launch()
