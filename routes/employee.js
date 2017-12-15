var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('Connect to DB and get results...!');
    
          const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sys'
          });
          connection.connect((err) => {
            if (err) throw err;
            console.log('Connected...!');
          });
          
          connection.query('SELECT * from employee as employee', function (err, result, fields) {
            if (err) throw err
            console.log('Result is : ', result);
            res.render('employee', {retrievedData : result, title: 'Manage Employee screen' });

          });
    
          console.log("Close connection");
          connection.end();
});

router.post('/', function(req, res, next) {
    console.log('Connect to DB and get results...!');
    
          const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sys'
          });
          connection.connect((err) => {
            if (err) throw err;
            console.log('Connected...!');
          });
          
          connection.query('SELECT * from employee as employee', function (err, result, fields) {
            if (err) throw err
            console.log('Result is : ', result);
            res.render('employee', {retrievedData : result, title: 'Manage Employee screen' });

          });
    
          console.log("Close connection");
          connection.end();
});

router.get('/create', function(req, res, next) {
    const employee = { employeeid: 1, employeename: 'PRASANNA', employeeage: '30' };
    res.render('createemployee', { title: 'Manage Employee screen', employee: employee });
});
router.get('/update', function(req, res, next) {
    const employee = { employeeid: 1, employeename: 'PRASANNA', employeeage: '30' };
    res.render('createemployee', { title: 'Manage Employee screen', employee: employee });
});



router.post('/update', function(req, res, next) {    
    console.log("Update employee invoked....");
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sys'
      });
      connection.connect((err) => {
        if (err) throw err;
        console.log('Connected...!');
      });

      const employeeId = req.body.employeeid;
      var employee;
      var message;
      var updateStatus='success';
      connection.query('SELECT * from employee as employee where id = ?', req.body.employeeid, function (err, result, fields) {
        if (err) throw err
        console.log('Result is : ', result);
        employee=result;
        console.log('employee is : ', result.length);
        
              if (result.length>0) {
                console.log('Employee already exists...');
                
                const employee = { id: req.body.employeeid, employeeName: req.body.employeename, employeeAge: req.body.employeeage };
                connection.query('update employee SET employeeName = ?, employeeAge = ? where id = ?', [req.body.employeename,req.body.employeeage,req.body.employeeid], (err, result) => {
                    if(err) throw err;
                    console.log('Last updated rows:', result.affectedRows);
                });

                message="Employee detailed updated successfully!"
                updateStatus='success';
                
              } else {
                console.log('Employee not found...');
                updateStatus='failure';
                message="Employee not found ... !"
              }
        
              res.render('createemployee', { title: 'Manage Employee', message: message, eventStatus: updateStatus, employee: req.body });

    });


});

router.post('/create', function(req, res, next) {
    console.log("Create employee invoked....");
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sys'
      });
      connection.connect((err) => {
        if (err) throw err;
        console.log('Connected...!');
      });

      const employeeId = req.body.employeeid;
      var employee;
      var message;
      var createStatus='success';
      connection.query('SELECT * from employee as employee where id = ?', req.body.employeeid, function (err, result, fields) {
        if (err) throw err
        console.log('Result is : ', result);
        employee=result;
        console.log('employee is : ', result.length);
        
              if (result.length>0) {
                console.log('Employee already exists...');
                message="Employee Already Exists!"
                createStatus='failure';
              } else {
                console.log('Create Employee ...');
                message="Employee created successfully!"
                createStatus='success';
                const employee = { id: req.body.employeeid, employeeName: req.body.employeename, employeeAge: req.body.employeeage };
                connection.query('INSERT INTO employee SET ?', employee, (err, result) => {
                    if(err) throw err;
                    console.log('Last insert rows:', result.affectedRows);
                });
              }
        
              res.render('createemployee', { title: 'Manage Employee', message: message, eventStatus: createStatus, employee: req.body });

    });


});


module.exports = router;
