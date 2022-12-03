let express = require('express');
let router = express.Router();

const app = require('../app.js'); 
const pool = require('../pool.js');

// FOURTH
router.get('/highest-pay-per-employee', (req, res) => {
    const objectiveQuery = `
        SELECT branch_id,
        (total_paid / number_of_employees) AS pay_per_employee
        FROM (
            SELECT e.employee_id, e.branch_id,
                SUM(total_paid_employee) AS total_paid,
                COUNT(branch_id) AS number_of_employees
            FROM Employee e
                JOIN (
                    SELECT employee_id,
                        SUM(payment_salary + payment_bonus) AS total_paid_employee
                    FROM Payroll
                    GROUP BY employee_id
                ) AS p
                ON e.employee_id = p.employee_id
            GROUP BY branch_id
        ) AS MainTable
        ORDER BY pay_per_employee DESC
        LIMIT 1;
    `;

    pool.query(objectiveQuery, (err, response, fields) => {
        if (err) throw err;
        let retObj = new Object();
        retObj.highest_pay_per_employee = response;
        const validationQuery = `
            SELECT branch_id,
                (total_paid / number_of_employees) AS pay_per_employee,
                total_paid,
                number_of_employees
            FROM (
                SELECT e.employee_id, e.branch_id,
                    SUM(total_paid_employee) AS total_paid,
                    COUNT(branch_id) AS number_of_employees
                FROM Employee e
                    JOIN (
                        SELECT employee_id,
                            SUM(payment_salary + payment_bonus) AS total_paid_employee
                        FROM Payroll
                        GROUP BY employee_id
                    ) AS p
                    ON e.employee_id = p.employee_id
                GROUP BY branch_id
            ) AS MainTable
            ORDER BY pay_per_employee DESC
            LIMIT 10;
        `;
        pool.query(validationQuery, (error, resp, fiel) => {
            if (error) throw error;
            retObj.validation_list = resp;
            res.send(retObj);
            return; 
        });
    });
});

// FIFTH
router.delete('/lowest-employee-count', (req, res) => {
    const beforeQuery = `
        SELECT branch_id,
            COUNT(branch_id) AS num_employees
        FROM Employee
        GROUP BY branch_id
        ORDER BY num_employees ASC
        LIMIT 5;
        SELECT COUNT(e.employee_id) AS total_number_of_employees
        FROM Employee e; 
        SELECT COUNT(b.branch_id) AS total_number_of_branches
        FROM Branch b;
    `;
    pool.query(beforeQuery, (error, response, fields) => {
        if (error) throw error;
        let retObj = new Object();
        retObj.before = response;

        const objectiveQuery = `
            DELETE FROM Branch
            WHERE branch_id = (
                SELECT branch_id
                FROM (
                        SELECT branch_id,
                            COUNT(branch_id) AS num_employees
                        FROM Employee
                        GROUP BY branch_id
                        ORDER BY num_employees ASC
                        LIMIT 1
                    ) AS branch_id_to_delete
            );
        `;

        pool.query(objectiveQuery, (er, resp, fields) => {
            if (er) throw er;
            pool.query(beforeQuery, (err, respo, fieldz) => {
                if (err) throw err;
                retObj.after = respo;
                res.send(retObj);
                return;
            });
        });
    });
});

module.exports = router