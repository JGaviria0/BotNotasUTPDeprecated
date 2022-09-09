let request = require("request-promise")
const cookiesJar = request.jar()
request = request.defaults({ jar: cookiesJar })

async function main () {
    const result = await request.get({url: "https://app4.utp.edu.co/", "rejectUnauthorized": false})
    const cookiesString = cookiesJar.getCookieString({url: "https://app4.utp.edu.co/", "rejectUnauthorized": false})
    console.log(cookiesString)
}

main()