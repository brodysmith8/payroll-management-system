const express = require('express');
const router = express.Router();

const app = require('../app.js'); 
const pool = require('../pool.js');

// FIRST
router.put('/:employee_id', (req, res) => {
    // const query = `
    //     UPDATE Employee e
    //     SET e.branch_id = ?,
    //         e.company_name = (
    //             SELECT company_name
    //             FROM Branch b
    //             WHERE b.branch_id = ?
    //         )
    //     WHERE e.employee_id = ?;
    //     `;
    const viewStart = (req.params.employee_id > 2 ? req.params.employee_id - 2 : 0),
          viewEnd   = 3;

    let viewQuery = 'SELECT * FROM Employee LIMIT ?, ?;';
    pool.query(viewQuery, [viewStart, viewEnd], (error, results, fields) => {
        if (error) throw error;
        let before;
        before = results;
  
        const objectiveQuery = `
            UPDATE Employee e
            SET e.branch_id = ?,
                e.company_name = (
                    SELECT company_name
                    FROM Branch b
                    WHERE b.branch_id = ?
                )
            WHERE e.employee_id = ?;
        `;
        pool.query(objectiveQuery, [req.body.branch_id, req.body.branch_id, req.params.employee_id], (err, resp, f) => {
            if (error) throw error;
            pool.query(viewQuery, [viewStart, viewEnd], (e, r, f) => {
                if (error) throw error;
                let retObj = new Object();
                retObj.before = before;
                retObj.after = r;
                res.send(retObj);
            });
        });
    });
});

// SECOND
router.post('/', (req, res) => {

});

// THIRD 
router.get('/highest-paid', (req, res) => {

});

module.exports = router