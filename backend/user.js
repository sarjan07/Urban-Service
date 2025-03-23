console.log("user file loaded...")
var userName = "Ram"
var userAge = 23

const printUserData =(a) => {
    console.log("Print userdata function called from user.js",a)
}

module.exports = {
    userName,userAge,printUserData
}
