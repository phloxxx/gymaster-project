const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

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

// Routes
app.get('/', (req, res) => {
    res.render('choose', { title: 'USER TYPE' });
});

app.get('/member', (req, res) => {
    res.render('member', { title: 'MEMBER' });
});

app.get('/coach', (req, res) => {
    res.render('coach', { title: 'COACH' });
});

// Admin Login Page
app.get('/admin', (req, res) => {
    const userType = req.query.user_type;
    if (userType === 'admin') {
        res.render('admin_addsub', { title: 'ADMIN', userType });
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
        res.render('report', { title: 'ADMIN DASHBOARD' });
    } else {
        res.render('admin_login', { 
            title: 'Admin Login', 
            error: 'Invalid login credentials!' 
        });
    }
});

// Staff Login Processing
app.post('/staff/login', (req, res) => {
    const { USERNAME, PASSWORD } = req.body;

    // Hardcode staff credentials
    const correctStaffUsername = 'staff';
    const correctStaffPassword = 'staff123';

    if (USERNAME === correctStaffUsername && PASSWORD === correctStaffPassword) {
        res.render('staff_dashboard', { 
            title: 'Staff Dashboard', 
            username: USERNAME 
        });
    } else {
        res.render('staff_login', { 
            title: 'Staff Login', 
            error: 'Invalid login credentials!' 
        });
    }
});

// Start the server
const PORT = 65231;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));