let express = require('express');
let server = express();

var praxissemester = require('Praxissemester');

//URL= http//localhost:2019/MyWebApp/<Dateipfad> unterhalb des Wurzelverzeichnisses <Pfad der ajaxserver.js Dateii/public
server.use('/WingSever',express.static(__dirname +'/public'));


server.post('WingSever/save', function(req, res){
    var d = req.body.praxissemester;
    praxissemester.writeFile('temp.txt', data, (err) =>{
        if (err) console.log(err);
        console.log("Successfully written to File.");
    });
    //var data = praxissemester.writeFileSync('./data/FileSync', 'utf8');
    res.send('success');
}); 



server.listen(2019,() => {
    console.log('Server running at 2019');
});