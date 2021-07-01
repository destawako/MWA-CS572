const { isValidObjectId } = require("mongoose")
var path = require("path")

const dispatchPage = function(pageName, res){
    console.log("Request students index page")
    const response = {
        status: 200,
        message: "faculty page"
    }

res.status(response.status).sendFile(path.join(__dirname, "..","..", "public","faculty",pageName + ".html"))

}

module.exports.login = function(req, res){

    dispatchPage("faculty-login", res)
}

module.exports.qrCamera = function(req, res){
    res.status(200).json({message:"Camera is opne"})

    dispatchPage("qr-reader-camera", res)
}

module.exports.attendance= function(req, res){
    dispatchPage("attendance", res)
}


