const express = require ('express');
const router = express.Router();
const pool = require('../modules/pool');


//inserts input from client input into database
router.post('/', (req, res) => {
    console.log('req.body', req.body);
    let newTask = req.body.newTask;
    let queryText = `INSERT INTO "taskList" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in post', error);
        res.sendStatus(500);
    });
});

//gets information from database and sends to client
router.get('/', (req, res) => {
    console.log('in get');
    let queryText = `SELECT * FROM "taskList" ORDER BY "id";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get', error);
        res.sendStatus(500);
    });
});


//updates database with information from the dom
router.put('/completed/:id', (req, res) => {
    console.log('in put request', req.body.completedYet, req.params.id);
    //create SQL query
    let queryText = '';
    if(req.body.completedYet === "true"){
        queryText = `UPDATE "taskList" SET "completed" = 'true' WHERE "id" = ($1);`;
    } else {
        queryText = `UPDATE "taskList" SET "completed" = 'false' WHERE "id" = ($1);`
    }
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('result from put', result);
        res.sendStatus(200);
     }).catch((error) => {
        console.log('error in put', error);
         res.sendStatus(500);
     });
});


//deletes from database
router.delete('/:id', (req, res) =>{
    let taskListId = req.params.id;
    let queryText = `DELETE FROM "taskList" WHERE "id" = $1;`;
    pool.query(queryText, [taskListId]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in delete', error);
        res.sendStatus(500);
    });
});



module.exports = router;