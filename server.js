const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

var args = process.argv.slice(2)[0];
if(args && args == '--debug'){
    app.use(morgan('tiny'));
}

app.use(cors());
app.use(bodyParser.json());

app.use('/api/praxissemester', require('./routes/praxissemester').router);
app.use('/api/auslandssemester', require('./routes/auslandssemester').router);
app.use('/api/projekte', require('./routes/projekte').router);
app.use('/api/team', require('./routes/team').router);
app.use('/api/projects', require('./routes/projekte').router);
app.use('/api/news', require('./routes/news').router);
app.use('/api/termine', require('./routes/termine').router);
app.use('/api/publikationen', require('./routes/publikationen').router);


app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});