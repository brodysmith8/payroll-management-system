-- FIRST (modification)
/* Change a certain employee branch and update their company 
   if it changes */
UPDATE Employee e
SET e.branch_id = 2,
    e.company_name = (
        SELECT company_name
        FROM Branch b
        WHERE b.branch_id = 2
    )
WHERE e.employee_id = 1;

-- SECOND (modification)
/* Add a new employee */
INSERT INTO EmployeeRole
VALUES (50001, 43);
INSERT INTO Contact (phone_number)
VALUES ("(519) 563-5593");
INSERT INTO Employee
VALUES (
        50001,
        "(519) 563-5593",
        2,
        "Firstname",
        "Lastname",
        "2010-06-25",
        "276390558",
        "623",
        "12821",
        "0187034",
        (
            SELECT company_name
            FROM Branch
            WHERE branch_id = 2
        )
    );

SELECT *
FROM se3309.Employee
ORDER BY employee_id DESC
LIMIT 0, 3;

-- show in workbench:
SELECT * FROM se3309.Contact WHERE phone_number = "(519) 563-5593";
SELECT * FROM EmployeeRole WHERE employee_id = 50001;
SELECT * FROM Employee WHERE employee_id = 50001;

-- THIRD (query)
/* Find the highest paid employee in the last 4 months */
/* how are you supposed to validate queries????? */
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
        NATURAL JOIN `Role`
    );

-- FOURTH (query)
/* Find the branch with the highest pay-per-employee */
SELECT branch_id,
    (total_paid / number_of_employees) AS pay_per_employee
FROM (
        SELECT branch_id,
            SUM(total_paid_employee) AS total_paid,
            COUNT(branch_id) AS number_of_employees
        FROM Employee e
            NATURAL JOIN (
                SELECT employee_id,
                    SUM(payment_salary + payment_bonus) AS total_paid_employee
                FROM Payroll
                GROUP BY employee_id
            ) AS p
        GROUP BY branch_id
    ) AS MainTable
ORDER BY pay_per_employee DESC
LIMIT 1;

-- FIFTH (modification + query)
/* Delete the branch with the lowest employee count */
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