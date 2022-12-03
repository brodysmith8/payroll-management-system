const express = require('express');
const router = express.Router();

const app = require('../app.js'); 
const pool = require('../pool.js');

// FIRST
router.put('/:employee_id', (req, res) => {
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
                return;
            });
        });
    });
});

// SECOND
router.post('/', (req, res) => {
    const queryViewStart = `
        SELECT *
        FROM se3309.Employee
        ORDER BY employee_id DESC
        LIMIT 0, 3;
    `;
    pool.query(queryViewStart, (err, response, fields) => {
        if (err) throw err;
        const before = response;

        // could refactor this into automatically choosing max + 1 employee id... cba right now
        const objectiveQuery = `
            INSERT INTO EmployeeRole
            VALUES (?, ?);
            INSERT INTO Contact (phone_number)
            VALUES (?);
            INSERT INTO Employee
            VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                (
                    SELECT company_name
                    FROM Branch
                    WHERE branch_id = ?
                )
            );
        `;
        
        const inserts = [
            req.body.employee_id, 
            req.body.role_id, 
            req.body.phone_number, 
            req.body.employee_id, 
            req.body.phone_number, 
            req.body.branch_id,
            req.body.first_name,
            req.body.last_name,
            req.body.start_date,
            req.body.sin,
            req.body.bank_institution_number,
            req.body.bank_transit_number,
            req.body.bank_account_number,
            req.body.branch_id
        ]

        pool.query(objectiveQuery, inserts, (er, resp, fie) => {
            if (er) throw er;
            pool.query(queryViewStart, (e, r, f) => {
                if (e) throw e;
                let retObj = new Object();
                retObj.before = before;
                retObj.after = r;
                res.send(retObj);
                return;
            });
        });
    });
});

// THIRD 
router.get('/highest-paid', (req, res) => {
    let retObj = new Object();
    const objectiveQuery = `
        SELECT employee_id,
        employee_first_name,
        employee_last_name,
        total_paid,
        role_name,
        salary
        FROM Employee
            NATURAL JOIN (
                (
                    (
                        SELECT employee_id,
                            SUM(payment_salary + payment_bonus) AS total_paid
                        FROM Payroll
                        GROUP BY employee_id
                        ORDER BY total_paid DESC
                        LIMIT 1
                    ) AS TopPaidEmployee
                    NATURAL JOIN EmployeeRole
                )
                NATURAL JOIN \`Role\`
            );`;

    pool.query(objectiveQuery, (error, response, fields) => {
        if (error) throw error;
        retObj.highest_paid_employee = response;
        // I literally don't know if this is enough validation
        const validationQuery = `
            SELECT employee_id,
            SUM(payment_salary + payment_bonus) AS total_paid
            FROM Payroll
            GROUP BY employee_id
            ORDER BY total_paid DESC
            LIMIT 0, 10
        `;
        pool.query(validationQuery, (err, resp, fiel) => {
            if (err) throw err;
            retObj.validation_list = resp;
            res.send(retObj);
            return;
        });
    });
});

module.exports = router