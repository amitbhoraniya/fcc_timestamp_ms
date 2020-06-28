const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

if (!process.env.DISABLE_XORIGIN) {
    app.use(function(req, res, next) {
        var allowedOrigins = ['https://www.freecodecamp.com'];
        var origin = req.headers.origin || '*';
        if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        next();
    });
}

app.get('/api/timestamp', function(req, res) {
    var date = new Date();
    res.send({
        unix: date.getTime(),
        utc: date.toUTCString()
    })
})

app.get('/api/timestamp/:date', function(req, res) {
    var date = new Date();
    if (/^\d*$/.test(req.params.date)) {
        //if number
        date.setTime(req.params.date);
    } else {
        //else parse
        date = new Date(req.params.date);
    }
    // giving headers for JSON
    res.set({ 'Content-Type': 'application/json' })
    if (!date.getTime()) {
        // if the date is invalid
        res.send({ error: "Invalid Date" })
    } else {
        // if the date is valid
        res.send({
            unix: date.getTime(),
            utc: date.toUTCString()
        })
    }
})
app.listen(port, () =>
    console.log(`TimeStamp App listening at http://localhost:${port}`)
);