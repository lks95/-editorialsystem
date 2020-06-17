let express = require('express');
let router = express.Router();

let fs = require('fs');

router.post('/', (req, res)=>{
    let data = JSON.stringify(req.body);
    console.log(data);
    fs.writeFile('./data/news.json', data, (err)=>{
        if(err){
            res.status(500).send(err);
        }
    })
    res.json(JSON.parse(data));
});

router.get('/', (req, res)=>{
    fs.readFile('./data/news.json', (err, data)=> {
        if (err) {
            res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
})

router.post('/archive', (req, res)=>{
    let data = JSON.stringify(req.body);
    fs.writeFile('./data/archive/news.json', data, (err)=>{
        if(err){
            res.status(500).send(err);
        }
    })
    res.json(JSON.parse(data));
});

router.get('/archive', (req, res)=>{
    fs.readFile('./data/archive/news.json', (err, data)=> {
        if (err) {
            res.status(500).send(err);
        }
        const content = JSON.parse(data);
        res.json(content);
    });
});


module.exports.router = router;
