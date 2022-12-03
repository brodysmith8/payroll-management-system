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

});

module.exports = router