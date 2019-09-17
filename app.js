const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {

    var firstName = req.body.FName;
    var lastName = req.body.LName;
    var email = req.body.email;

    console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/a7a968cdd9",
        method: "POST",
        headers: {
            "Authorization": "emr bf8c99419c9cc1476a000b811aa5cae8-us4"
        },
        body: jsonData

    }

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else 
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }else{
    
            res.sendFile(__dirname + "/failure.html");  
        }
    })


})


//bf8c99419c9cc1476a000b811aa5cae8-us4

//a7a968cdd9



app.listen(port, () => console.log(`Server running on port ${port}!`))