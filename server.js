var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3030,
    body = require('body-parser')
fs = require('fs');

app.use(body.urlencoded({ extended: true }))


app.get("/", function(req, res){
    var request = JSON.stringify(req.body.phone)

    var respons = {
        "type": "text",
        "text": "simple text with button",
        "buttons": [
            {
                "type": "url",
                "caption": request,
                "url": "https://manychat.com"
            }
        ]
    }
    res.json(JSON.parse(respons))
})

app.post('/', function (req, res) {
    var request = JSON.stringify(req.body.phone)
    fs.appendFile("results.txt", request, function (err) {
        console.log(err);
    })
    var respons = {
        "type": "text",
        "text": "simple text with button",
        "buttons": [
            {
                "type": "url",
                "caption": "External link",
                "url": "https://manychat.com"
            }
        ]
    }
    res.json(JSON.parse(respons))
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