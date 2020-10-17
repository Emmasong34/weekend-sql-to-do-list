const express = require ('express');
const router = express.Router();
const pool = require('../modules/pool');


//posts input from client input into database
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


// router.post('/', (req, res) => {
//     console.log('req.body', req.body);
//     let title = req.body.title;
//     let author = req.body.author;
//     let published = req.body.published;

//     let queryText = `INSERT INTO "books" ("title", "author", "published")
//     VALUES('${title}', '${author}', '${published}');`;
//     pool.query(queryText).then((result) => {
//         res.sendStatus(200);
//     }).catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     })
// });


module.exports = router;