const { Builder, By, Key, util, Capabilities} = require("selenium-webdriver")
const fs = require('fs'); 
const csv = require('csv-parse');
const { time } = require("console");
const jimp = require('jimp');
const chrome = require('selenium-webdriver/chrome');
let opts = new chrome.Options();

const url = 'https://app4.utp.edu.co/pe/'
const url2 = 'https://app4.utp.edu.co/reportes/ryc/ReporteDetalladoNotasxEstudiante.php'
var user 
var psw

function credenciales() {
    const parseador = csv({
        delimiter: ',',//Delimitador, por defecto es la coma ,
        cast: true, // Intentar convertir las cadenas a tipos nativos
        comment: '#' // El carácter con el que comienzan las líneas de los comentarios, en caso de existir
    });

    parseador.on('readable', function () {
        let fila;
        var i =0;
        while (fila = parseador.read()) {
            i++
            if (i == 1) user = fila[0]
            if (i == 2) psw = fila[0]
        }
    });

    fs.createReadStream("Mensajes.csv") // Abrir archivo
    .pipe(parseador) 
    .on("end", function () {
        parseador.end();
    });
}

async function openUTP() {
    credenciales()
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.manage().window().maximize()
    await driver.get(url)
    await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[1]/input")).sendKeys(psw)
    await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[2]/input")).sendKeys(user)
    await (await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[5]/button[1]/span[2]"))).click()
    setTimeout(async function() {
        await driver.get(url2)
        let ele = await driver.findElement(By.xpath("/html/body/table/tbody/tr[4]"))
        let i = 4
         while (true) {
            try {
                await (await driver.findElement(By.xpath("/html/body/table/tbody/tr[" + String(i+1) + "]"))).click()
                ele = await driver.findElement(By.xpath("/html/body/table/tbody/tr[" + i + "]"))
                let encodedString = await ele.takeScreenshot(true)
                await fs.writeFileSync('./notas/image' + i +'.png' , encodedString, 'base64')
                console.log(i + " Si senior")
                
            } catch (err) {
                console.log("eppaaaa")
                break
            }
            i+=2
        }    
    }, 1000);
}

//openUTP()
exports.openUTP=openUTP
