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
    console.log("reached in one of the update methods of express----")
    // dispatchPage("update", res)
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
        img: "/Users/biniamarefaine/Downloads/app01 2/my-first-app/src/app/images/download.png",
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
        ],
        course: [
            {
                _id: 01,
                coursename: "MWA",
                studentid: "CS572",
            },{
                _id: 02,
                coursename: "FPP",
                studentid: "CS390",
            }
        ]


    },
    {
        _id:2,
        firstname: "Eyob",
        lastname: "Arefaine",
        studentid: 112323,
        studententry: "spring",
        img: "/Users/biniamarefaine/Downloads/app01 2/my-first-app/src/app/images/download.png",
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
        ],
        course: [
            {
                _id: 01,
                coursename: "MWA",
                studentid: "CS572",
            },{
                _id: 02,
                coursename: "FPP",
                studentid: "CS390",
            }
        ]


    }
    ]
    
    // dispatchPage("get-all-students", res)
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
        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.studentid = req.body.studentid;
        student.studententry = req.body.studententry;
    }

    console.log(student)
    res.status(201).json(student);

    // dispatchPage("update", res)
}

module.exports.registerStudent = function(req,res){

    if(req.body){

        console.log(req.body.firstname)
        var student = {
            // _id: isValidObjectId,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            img : req.body.img,
            // studententry : req.body.studententry
        }


        console.log(student)


    }
        
    console.log("in the register----")
    res.status(201).json(student);
    // dispatchPage("create-profile", res)
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
        ],
        course: [
            {
                _id: 01,
                coursename: "MWA",
                studentid: "CS572",
            },{
                _id: 02,
                coursename: "FPP",
                studentid: "CS390",
            }
        ]

    }
   
    res.status(200).json(student.attendance)
}

module.exports.getAttendance = function(req, res){
        var attendance = [
            {
            _id:1,
            lastname: "Arefaine",
            studentid: 112323,
            attendance: "Present",
    
        },
        {
            _id:2,
            lastname: "Abraham",
            studentid: 114352,
            attendance: "Absent",
    
        },
        {
            _id:3,
            lastname: "Tomas",
            studentid: 116756,
            attendance: "Present",
    
        }
        ]

    res.status(200).json(attendance)
    
}

module.exports.getOneById = function(req,res){

var studentId = req.params.id;
    
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
        attendance: "Present",
        studentid: 112323,
    },{
        _id: 02,
        date: "2020-09-10",
        attendance: "Present",
        studentid: 112323,
    },{
        _id: 03,
        date: "2020-09-11",
        attendance: "Absent",
        studentid: 112323,
    }
],
course: [
    {
        _id: 01,
        coursename: "MWA",
        coursecode: "CS572",
    },{
        _id: 02,
        coursename: "FPP",
        coursecode: "CS390",
    },{
        _id: 03,
        coursename: "DBMS",
        coursecode: "CS390",
    },{
        _id: 04,
        coursename: "SWE",
        coursecode: "CS422",
    }
]

}

    console.log(studentId +"===="+ student._id)


    if(student._id == studentId){
        console.log("done perfectly====")
        res.status(200).json(student);
    }else{
    res.status(404).json({message : "not found"});
    }


}

module.exports.getAllCourses = function(req,res){

    var courses=[
        {
            _id: 01,
            coursename: "MWA",
            coursecode: "CS572",
        },{
            _id: 02,
            coursename: "FPP",
            coursecode: "CS390",
        }
    ]

    res.status(200).json(courses)
}

module.exports.addOneCourse = function(req, res){

    if(req.body){
        console.log(req.body.coursename)
        var course = {
            coursename : req.body.coursename,
            coursecode : req.body.coursecode,
           
        }
        console.log(course)
        console.log("in the course register----")
        res.status(201).json(course);

    }else{
        res.status(404).json({message:"Body not provided"});
    }
        
}

module.exports.getCourseById = function(req, res){
    var courseId = req.params.id;
    console.log(courseId + "-=-=-=")
    var courses=
        {
            _id: 01,
            coursename: "MWA",
            coursecode: "CS572",
        }

    
        res.status(200).json(courses)
    
}



