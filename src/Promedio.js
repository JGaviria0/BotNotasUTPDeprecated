const session = require("./logingUTPPage.js")
const { Builder, By, Key, util, Capabilities} = require("selenium-webdriver")

async function prueba () {
    const url2 = 'https://app4.utp.edu.co/reportes/ryc/ReporteDetalladoNotasxEstudiante.php'
    session.login("Matias1811", "1004995317").then( async driver =>  {
        setTimeout(async function() {
            console.log(driver)
            driver.get(url2)
        }, 1000)
    })
}

prueba()
