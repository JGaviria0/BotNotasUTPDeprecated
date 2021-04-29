const { Builder, By, Key, util, Capabilities} = require("selenium-webdriver")

const url = 'https://app4.utp.edu.co/pe/'
const url2 = 'https://app4.utp.edu.co/reportes/ryc/ReporteDetalladoNotasxEstudiante.php'

const login = (user, psw) => {
    let promise = new Promise(async(res, rej) => {
        let driver = await new Builder().forBrowser("chrome").build()
        await driver.manage().window().maximize()
        await driver.get(url)
        await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[1]/input")).sendKeys(psw)
        await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[2]/input")).sendKeys(user)
        await (await driver.findElement(By.xpath("/html/body/div[1]/div[5]/div[2]/div[1]/form/div[5]/button[1]/span[2]"))).click()   
        res(driver);
    })
    return promise  
}

exports.login=login
