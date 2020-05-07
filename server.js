//Import npm packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//HTTP request
app.use(morgan('tiny'));
app.use(cors());


//URL= http//localhost:2019/MyWebApp/<Dateipfad> unterhalb des Wurzelverzeichnisses <Pfad der ajaxserver.js Dateii/public
//app.use('/WingSever',express.static(__dirname +'/public'));

/*app.get('/api', (req, res) =>{
    const data = {
        username: 'accimeesterlin',
        age: 5
    };
    res.json(data);
});

app.get('/api/name', (req, res) =>{
    const data = {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});*/

app.post('/api/save', function(req, res){
    var praxissemester = require('./client/public/data/praxissemester.json');
    var d = req.body.praxissemester;
    
    praxissemester.writeFile('temp.txt', d, (err) =>{
        if (err) {
            console.log(err);
        console.log("Successfully written to File.");
        }
    });
    //var data = praxissemester.writeFileSync('./data/FileSync', 'utf8');
    res.send('success');
});



app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});