const { Builder, By, Key, util, Capabilities} = require("selenium-webdriver")
const fs = require('fs'); 
const ut = require("./utilities.js")
const session = require("./logingUTPPage.js")
const csv = require('csv-parse');
const { time } = require("console");
const jimp = require('jimp');
const chrome = require('selenium-webdriver/chrome');
const { spawn } = require('child_process');
const PythonShell = require('python-shell');
let opts = new chrome.Options();

const url = 'https://app4.utp.edu.co/pe/'
const url2 = 'https://app4.utp.edu.co/reportes/ryc/ReporteDetalladoNotasxEstudiante.php'

const takeNotas = (user, psw) => {
    let promise = new Promise(async(res, rej) => {
        session.login(psw, user).then( async driver =>  {
            setTimeout(async function() {
                await driver.get(url2)
                try {
                    let ele = await driver.findElement(By.xpath("/html/body/table/tbody/tr[4]"))
                } catch (err) {
                    console.log("Contrasenia incorrecta.")
                    rej(err)
                }
                let i = 4
                while (true) {
                    try {
                        await (await driver.findElement(By.xpath("/html/body/table/tbody/tr[" + String(i+1) + "]"))).click()
                        ele = await driver.findElement(By.xpath("/html/body/table/tbody/tr[" + i + "]"))
                        let encodedString = await ele.takeScreenshot(true)
                        await fs.writeFileSync('./src/notas/image' + i +'.png' , encodedString, 'base64')
                        
                    } catch (err) {
                        res(ele)
                        break
                    }
                    i+=2
                }
                driver.quit()  
            }, 1000)
        }) 
        
    })
    return promise           
}

exports.takeNotas=takeNotas
