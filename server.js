//Import npm packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

//HTTP request
app.use(morgan('tiny'));





//URL= http//localhost:2019/MyWebApp/<Dateipfad> unterhalb des Wurzelverzeichnisses <Pfad der ajaxserver.js Dateii/public
//app.use('/WingSever',express.static(__dirname +'/public'));


app.post('WingSever/save', function(req, res){
    var praxissemester = require('Praxissemester');
    var d = req.body.praxissemester;
    praxissemester.writeFile('temp.txt', data, (err) =>{
        if (err) console.log(err);
        console.log("Successfully written to File.");
    });
    //var data = praxissemester.writeFileSync('./data/FileSync', 'utf8');
    res.send('success');
}); 



app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});