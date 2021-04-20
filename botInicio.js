const { Builder, By, Key, util, Capabilities} = require("selenium-webdriver")
const fs = require('fs'); 
const csv = require('csv-parse');
const { time } = require("console");
const gm = require("gm")
const jimp = require('jimp');

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
    // psw = '1004995317'
    // user = 'Matias1811'

    let driver = await new Builder().forBrowser("chrome").build()
    await driver.manage().window().maximize()
    await driver.get(url)
    await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[1]/input")).sendKeys(psw)
    await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[2]/input")).sendKeys(user)
    await (await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[5]/button[1]/span[2]"))).click()
    setTimeout(async function() {
        await driver.get(url2)
        await driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('screenshot.png', image, 'base64', function(err) {
                    if (err) console.log(err);
                });
            }
        );
        await (await driver.findElement(By.xpath("/html/body/table/tbody/tr[18]/td/div"))).click()
        await driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('screenshot2.png', image, 'base64', function(err) {
                    if (err) console.log(err);
                });
            }
        );
        return new Promise( async (res, rej) => {
            const img = await jimp.read('screenshot.png')
            await img.crop(639, 0, 630, 925).write('screenshotRecortado.png')
            const img2 = await jimp.read('screenshot2.png')
            await img2.crop(639, 0, 630, 925).write('screenshotRecortado2.png')
            await driver.quit()
            res(img)
        })
    }, 1000);
}


exports.openUTP=openUTP


