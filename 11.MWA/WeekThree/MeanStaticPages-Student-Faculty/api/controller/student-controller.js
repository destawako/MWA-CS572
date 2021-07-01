var path = require("path")

const dispatchPage = function(pageName, res){
    console.log("Request students index page")
    const response = {
        status: 200,
        message: "index page"
    }

    res.status(response.status).sendFile(path.join(__dirname, "..","..", "public","students",pageName + ".html"))

}
module.exports.studentsIndex= function(req,res){
    console.log("inside ------")
    dispatchPage("index", res);
}


module.exports.login = function(req, res){

    var username = "biniam";
    var password = "biniam";

    var response = ""
    if(username && password){
        if(req.body.username === username && req.body.password === password){
            response = {message : "You have successfully logged in"}
            response = "you are authorized"

          
        }
        else{
            response = "you are an-authorized"
            
        }
       
    }
    dispatchPage("index", res)
    // res.status(200).json(response)

}

module.exports.create = function(req,res){
    dispatchPage("create-profile", res)
}

module.exports.loggedInStudent = function(req,res){
    dispatchPage("loggedInStudent", res)
}

module.exports.update = function(req,res){
    dispatchPage("update", res)
}

module.exports.qrcode = function(req,res){

    var qr = {
        url: "http://localhost:8080/attendance/students/qrcode",
        image: "/Users/biniamarefaine/Desktop/COM_PRO/11.MWA/WeekThree/MeanStaticPages-Student-Faculty/public/images/download.png"
    }
   res.status(200).json(qr)

    dispatchPage("qr-code", res)
}

module.exports.getAllStudents = function(req,res){
         

    var student = [
        {
        _id:1,
        firstname: "Biniam",
        lastname: "Arefaine",
        studentid: 112323,
        studententry: "fall",
    },
    {
        _id:2,
        firstname: "Eyob",
        lastname: "Arefaine",
        studentid: 112323,
        studententry: "spring"
    }
    ]
    
    dispatchPage("get-all-students", res)
    res.status(200).json(student)

}


module.exports.update = function(req,res){
    var studentid = req.params.id;
    console.log(studentid + "  === " + req.body.firstname)

    var student = 
        {
        _id:1,
        firstname: "Biniam",
        lastname: "Arefaine",
        studentid: 112323,
        studententry: "fall",
    }

    if(student){
        console.log("inside ----")

        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.studentid = req.body.studentid;
        student.studententry = req.body.studententry;
    }

    
    res.status(201).json(student);

    dispatchPage("update", res)
}

module.exports.registerStudent = function(req,res){

    if(req.body){

        var student = {
            _id: isValidObjectId,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            studentid : req.body.studentid,
            studententry : req.body.studententry
        }
    }
        
    res.status(201).json(student);
    dispatchPage("create-profile", res)
}

module.exports.deleteStudent = function(req, res){
    var student = {
        firstname: "Biniam",
        lastname: "Arefaine",
        studentid: 112323,
        studententry: "fall",
    }

  res.status(204).json(student);


}

module.exports.attendace = function(req,res){

    var response={
        message : "",
    }
    var student = 
        {
        _id:1,
        firstname: "Biniam",
        lastname: "Arefaine",
        studentid: 112323,
        studententry: "fall",
        date: "2020-09-09",
        attendance: [
            {
                _id: 01,
                date: "2020-09-09",
                attendance: true,
                studentid: 112323,
            },{
                _id: 02,
                date: "2020-09-10",
                attendance: false,
                studentid: 112323,
            }
        ]

    }
   
    res.status(200).json(student.attendance)
}




