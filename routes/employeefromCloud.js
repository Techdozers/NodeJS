var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const pg = require('pg');


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('Connect to DB and get results...!');
    
          var client = new pg.Client({
            user: "tkodfyhnkoheme",
            password: "616d5588a19b3e5fbc3de3a81fcc9f8d452851a1858b6d2dcb0bf8e1d97a73f7",
            database: "d9f4muhtq0tdah",
            port: 5432,
            host: "ec2-23-21-236-249.compute-1.amazonaws.com",
            ssl: true
            }); 
            client.connect();

            client.query('SELECT * from employee as employee', function (err, result, fields) {
            if (err) throw err
            console.log('Result is : ', result.rows);
            res.render('employeeCLD', {retrievedData : result.rows, title: 'Manage Employee screen' });
            console.log("Closing the connection");
            client.end();
          });
    
});



router.post('/', function(req, res, next) {
    console.log('Connect to DB and get results...!');
    
      var client = new pg.Client({
        user: "tkodfyhnkoheme",
        password: "616d5588a19b3e5fbc3de3a81fcc9f8d452851a1858b6d2dcb0bf8e1d97a73f7",
        database: "d9f4muhtq0tdah",
        port: 5432,
        host: "ec2-23-21-236-249.compute-1.amazonaws.com",
        ssl: true
        }); 
        client.connect();
          
          client.query('SELECT * from employee as employee', function (err, result, fields) {
            if (err) throw err
            console.log('Result is : ', result.rows);
            res.render('employeeCLD', {retrievedData : result.rows, title: 'Manage Employee screen' });
            console.log("Close connection");
            client.end();
          });
    

});

router.get('/create', function(req, res, next) {
    const employee = { employeeid: 1, employeename: 'PRASANNA', employeeage: '30' };
    res.render('createemployeeCLD', { title: 'Manage Employee screen', employee: employee });
});
router.get('/update', function(req, res, next) {
    const employee = { employeeid: 1, employeename: 'PRASANNA', employeeage: '30' };
    res.render('createemployeeCLD', { title: 'Manage Employee screen', employee: employee });
});



router.post('/update', function(req, res, next) {    
    console.log("Update employee invoked....");
    
    var connection = new pg.Client({
      user: "tkodfyhnkoheme",
      password: "616d5588a19b3e5fbc3de3a81fcc9f8d452851a1858b6d2dcb0bf8e1d97a73f7",
      database: "d9f4muhtq0tdah",
      port: 5432,
      host: "ec2-23-21-236-249.compute-1.amazonaws.com",
      ssl: true
      }); 
      connection.connect();

      const employeeId = req.body.employeeid;
      var employee;
      var message;
      var updateStatus='success';
      connection.query('SELECT * from employee as employee where id = ?', req.body.employeeid, function (err, result, fields) {
        if (err) throw err
        console.log('Result is : ', result.rows);
        employee=result.rows;
        console.log('employee is : ', result.rows.length);
        
              if (result.rows.length>0) {
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
        
              res.render('createemployeeCLD', { title: 'Manage Employee', message: message, eventStatus: updateStatus, employee: req.body });
              connection.end();
    });


});

router.post('/create', function(req, res, next) {
    console.log("Create employee invoked....");
    
    var connection = new pg.Client({
      user: "tkodfyhnkoheme",
      password: "616d5588a19b3e5fbc3de3a81fcc9f8d452851a1858b6d2dcb0bf8e1d97a73f7",
      database: "d9f4muhtq0tdah",
      port: 5432,
      host: "ec2-23-21-236-249.compute-1.amazonaws.com",
      ssl: true
      }); 
      connection.connect();

      const employeeId = req.body.employeeid;
      var employee;
      var message;
      var createStatus='success';
      connection.query('SELECT * from employee as employee where id = ?', req.body.employeeid, function (err, result, fields) {
        if (err) throw err
        console.log('Result is : ', result.rows);
        employee=result.rows;
        console.log('employee is : ', result.rows.length);
        
              if (result.rows.length>0) {
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
        
              res.render('createemployeeCLD', { title: 'Manage Employee', message: message, eventStatus: createStatus, employee: req.body });
              connection.end();
    });


});


module.exports = router;
