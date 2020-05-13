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

app.post('/api/praxissemester', (req, res)=>{
    let data = JSON.stringify(req.body);
    console.log(data);
    fs.writeFile('./data/praxissemester.json', data, (err)=>{
        if(err){
            res.status(500).send(err);
        } 
    })
    res.json(JSON.parse(data));
});

app.get('/api/praxissemester', (req, res)=>{
    fs.readFile('./data/praxissemester.json', (err, data)=> {
        if (err) {
            res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
})

app.post('/api/praxissemester/archive', (req, res)=>{
    let data = JSON.stringify(req.body);
    fs.writeFile('./data/archive/praxissemester.json', data, (err)=>{
        if(err){
            res.status(500).send(err);
        } 
    })
    res.json(JSON.parse(data));
});

app.get('/api/praxissemester/archive', (req, res)=>{
    fs.readFile('./data/archive/praxissemester.json', (err, data)=> {
        if (err) {
            res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
})

app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});