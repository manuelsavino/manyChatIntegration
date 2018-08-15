var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3030,
    body = require('body-parser')
fs = require('fs');

app.use(body.urlencoded({ extended: true }))


app.get("/:phone", function(req, res){
    var request = JSON.stringify(req.params.phone)
    var link = "https://Google.com"
    var respons = 
    {
        "version": "v2",
        "content": {
            "messages": [
                {
                    "type": "text",
                    "text": `Here is your link:`
                }
            ]
        }
    }
    res.json(respons)
})

app.post('/', function (req, res) {
    var request = JSON.stringify(req.body.phone)
    var respons =
    {
        "version": "v2",
        "content": {
            "messages": [
                {
                    "type": "text",
                    "text": `Here is your link:`
                }
            ]
        }
    }
    res.json(respons)
    // res.send(request)
})

app.get("/search/:phone", function (req, res) {
    var request = req.params.phone
    fs.appendFile("results.txt", request, function (err) {
        console.log(err);
    })
    var respons = {
        "version": "v2",
        "content": {
            "messages": [
                {
                    "type": "text",
                    "text": request
                }
            ]
        }
    }
    res.status(200).json(JSON.parse(respons))
    fs.readFile("results.txt", "utf8", function (err, data) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
})

app.listen(PORT, function () {
    console.log("Server listening on port", PORT)
})