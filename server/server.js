const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const taskRouter = require('./routes/taskRouter');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/taskList', taskRouter);

app.listen(port, () => {
    console.log("up and running on port: ", port);
});