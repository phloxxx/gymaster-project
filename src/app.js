const sql = require("msnodesqlv8");
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const connectionString = "Server=.; Database=GYMASTER;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

// Static file setup
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../src')));
app.use('/src', express.static('src'));

// View engine and partials setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates')); // Set views directory

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Admin Routes
app.get('/', (req, res) => {
    res.render('choose', { title: 'USER TYPE' });
});

app.get('/management', (req, res) => {
    res.render('admin_management', { title: 'MANAGEMENT' });
});

app.get('/user', (req, res) => {
    res.render('user', { title: 'USER' });
});

app.get('/adduser', (req, res) => {
    res.render('adduser', { title: 'USER' });
});

app.get('/edituser', (req, res) => {
    res.render('edituser', { title: 'USER' });
});

app.get('/member', (req, res) => {
    res.render('member', { title: 'MEMBER' });
});

app.get('/addmember', (req, res) => {
    res.render('addmember', { title: 'MEMBER' });
});

app.get('/editmember', (req, res) => {
    res.render('editmember', { title: 'MEMBER' });
});

app.get('/coach', (req, res) => {
    res.render('coach', { title: 'COACH' });
});

app.get('/addcoach', (req, res) => {
    res.render('addcoach', { title: 'COACH' });
});

app.get('/editcoach', (req, res) => {
    res.render('editcoach', { title: 'COACH' });
});

app.get('/program', (req, res) => {
    res.render('addprogram', { title: 'PROGRAM' });
});

app.get('/editprogram', (req, res) => {
    res.render('editprogram', { title: 'PROGRAM' });
});

app.get('/subscription', (req, res) => {
    res.render('addsub', { title: 'SUBSCRIPTION' });
});

app.get('/editsub', (req, res) => {
    res.render('editsub', { title: 'SUBSCRIPTION' });
});

app.get('/payment', (req, res) => {
    res.render('addpayment', { title: 'PAYMENT' });
});

app.get('/editpayment', (req, res) => {
    res.render('editpayment', { title: 'PAYMENT' });
});

app.get('/transaction', (req, res) => {
    res.render('transaction', { title: 'TRANSACTION' });
});

app.get('/viewmemsubs', (req, res) => {
    res.render('viewmemsubs', { title: 'PAYMENT' });
});

app.get('/editmemsub', (req, res) => {
    res.render('editmemsub', { title: 'PAYMENT' });
});

app.get('/addmemsub', (req, res) => {
    res.render('addmemsub', { title: 'PAYMENT' });
});

app.get('/settings', (req, res) => {
    res.render('settings', { title: 'SETTINGS' });
});

// Admin Login Page
app.get('/admin', (req, res) => {
    const userType = req.query.user_type;
    if (userType === 'admin') {
        res.render('admin_dashboard', { title: 'ADMIN', userType });
    } else {
        res.redirect('/');
    }
});

// Staff Login Page
app.get('/staff', (req, res) => {
    const userType = req.query.user_type;
    if (userType === 'staff') {
        res.render('staff_login', { title: 'STAFF', userType });
    } else {
        res.redirect('/');
    }
});

// Admin Login Processing
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcode admin credentials
    const correctUsername = 'admin';
    const correctPassword = '123';

    if (username === correctUsername && password === correctPassword) {
        res.render('admin_management', { title: 'ADMIN DASHBOARD' });
    } else {
        res.render('admin_login', { 
            title: 'Admin Login', 
            error: 'Invalid login credentials!' 
        });
    }
});

// Staff Login Processing
app.post('/staff/login', (req, res) => {
    const { username , password } = req.body;

    // Hardcode staff credentials
    const correctStaffUsername = 'staff';
    const correctStaffPassword = 'staff123';

    if (username === correctStaffUsername && password === correctStaffPassword) {
        res.render('staff_management', {  title: 'STAFF DASHBOARD',   });
    } else {
        res.render('staff_login', { 
            title: 'Staff Login', 
            error: 'Invalid login credentials!' 
        });
    }
});

// Start the server
const PORT = 65428;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));