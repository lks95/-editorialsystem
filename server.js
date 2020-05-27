const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/praxissemester', require('./routes/praxissemester').router);
app.use('/api/auslandssemester', require('./routes/auslandssemester').router);
app.use('/api/projekte', require('./routes/projekte').router);
app.use('/api/team', require('./routes/team').router);
app.use('/api/projects', require('./routes/projekte').router);
app.use('/api/news', require('./routes/news').router);

//define api endpoints for termine and archive

//post api endpoint termine
app.post('/api/termine', (req, res)=>{
    let data = JSON.stringify(req.body);
    console.log(data);
    fs.writeFile('./data/dates.json', data, (err)=>{
        if(err){
            res.status(500).send(err);
        }
    })
    res.json(JSON.parse(data));
});

//get api endpoint termine
app.get('/api/termine', (req, res)=>{
    fs.readFile('./data/dates.json', (err, data)=> {
        if (err) {
            res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
})


//post api endpoint termine archive
app.post('/api/termine/archive', (req, res)=>{
    let data = JSON.stringify(req.body);
    fs.writeFile('./data/archive/dates.json', data, (err)=>{
        if(err){
            res.status(500).send(err);
        }
    })
    res.json(JSON.parse(data));
});

//get api endpoint termine archive
/*app.get('/api/termine/archive', (req, res)=>{
    fs.readFile('./data/archive/dates.json', (err, data)=> {
        if (err) {
            res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
})
*/

//portlistening
app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});