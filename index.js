const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

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