const { Telegraf }  = require('telegraf')
const ut = require("./src/utilities.js")
const init_scraping = require("./src/botInicio.js")
const spawn = require('child_process').spawn
const fs = require('fs');
const { resolve } = require('path');

const keyFile = JSON.parse(fs.readFileSync('./src/keyFile.json').toString())

const bot = new Telegraf(keyFile.tokenTelegram)

bot.start((ctx) => {
    ctx.reply('Bienvenido \nPara usar el bot, digite el siguiente comando: \n\n/notas cedula contraseña \n\nEstas son las credenciales del portal estudiantil.')
})

envioNotas = (ctx, user, psw) => {  
    return new Promise (resolve => {
        init_scraping.takeNotas(user, psw).then( async result => {
            spawn('python', ['src/Concatenar.py'])
            setTimeout(async () => {
                if ( fs.existsSync("./src/notas/notas.jpg")){
                    await ctx.replyWithPhoto({source: 'src/notas/notas.jpg'});
                    await ctx.reply("Para mayor facilidad en tu próxima consulta ingresa en este enlace:\n/notas_"+user+"_"+psw) 
                                        
                    setTimeout(() => {
                        ut.deleteall()
                    }, 1000);
                    console.log("Enviado con exito a " + ctx.from.first_name)
                    ctx.telegram.sendMessage(keyFile.idPhoneNumber, "Enviado con exito a " + ctx.from.first_name + " " + ctx.from.id)
                    resolve(ctx)
                    
                } else {
                    console.log("Enviado sin exito a " + ctx.from.first_name) 
                    setTimeout(() => {
                        ut.deleteall()
                    }, 1000);
                    ctx.reply('Al parecer la pagina de la universidad no dio respuesta, intenta unos minutos más tarde.')
                    ctx.telegram.sendMessage(keyFile.idPhoneNumber, "Enviado sin exito a " + ctx.from.first_name + " " + ctx.from.id)
                    resolve(ctx)
                }
            }, 2000);      
        }).catch(async err => {
            await ctx.reply("Usuario o contraseña incorrecta. Intente de nuevo.") 
            resolve(ctx)
        })            
    })
}

bot.command('notas', async (ctx) => {
    if (ctx.message.text.toString().trim().length <= 6) {
        ctx.reply('Para ver sus notas, debe usar el comando asi: \n\n/notas cedula contraseña \n\nEstas son las credenciales del portal estudiantil.') 
    } else {
        const loading = ctx.reply('Este proceso puede tardar hasta 30s, ya que la página de la universidad es muy lenta.\n\nLoading...\n\nRecuerda que estás en una versión beta, si ocurre algún error no dudes hacernos saber tu inconveniente.')
        const args = ctx.message.text.replace(/ +(?= )/g, "").trim().split(/ +/g)
        await envioNotas(ctx, args[1], args[2])
    }
})

bot.use(async (ctx, next) => {
    const loading = ctx.reply('Este proceso puede tardar hasta 30s, ya que la página de la universidad es muy lenta.\n\nLoading...\n\nRecuerda que estás en una versión beta, si ocurre algún error no dudes hacernos saber tu inconveniente.')
    let msg = ctx.message.text
    let cont = 0
    let credenciales = []
    let credencial = ""
    if (msg.startsWith('/notas_')){
        for (let i = 0; i<msg.length; i++){
            if(msg[i] == '_' && cont < 2){
                cont++
                credenciales.push(credencial)
                credencial = ""
            } else {
                credencial = credencial + msg[i]
            }
        }
        credenciales.push(credencial)
        await envioNotas(ctx, credenciales[1], credenciales[2])
    }
})

bot.launch()
