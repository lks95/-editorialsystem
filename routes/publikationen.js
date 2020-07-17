var express = require('express');
var router = express.Router();
const fs = require('fs');

router.post('/', (req, res)=>{
    let data = JSON.stringify(req.body);
    fs.writeFile('./data/publikationen.json', data, (err)=>{
        if(err){
            return res.status(500).send(err);
        } 
    })
    res.json(JSON.parse(data));
});

router.get('/', (req, res)=>{
    fs.readFile('./data/publikationen.json', (err, data)=> {
        if (err) {
            return res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
})

router.post('/archive', (req, res)=>{
    let data = JSON.stringify(req.body);
    fs.writeFile('./data/archive/publikationen.json', data, (err)=>{
        if(err){
            return res.status(500).send(err);
        } 
    })
    res.json(JSON.parse(data));
});

router.get('/archive', (req, res)=>{
    fs.readFile('./data/archive/publikationen.json', (err, data)=> {
        if (err) {
            return res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
});

module.exports.router = router;