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

router.put('/completed/:id', (req, res) => {
    let taskListId = req.params.id;
    let completed = req.body.completed;
    let queryText = `UPDATE "taskList" SET "completed" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [taskListId, completed]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in put', error);
        res.sendStatus(500);
    });
});


module.exports = router;