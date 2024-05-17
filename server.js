const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dayjs = require('dayjs');
const { getStudents, addStudent, deleteStudent } = require('./src/utils');
const { validateStudent } = require('./src/validation');

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './view');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));

// Main page to add a user
app.get('/', (req, res) => {
    res.render('home');
});

// Display the list of users
app.get('/users', async (req, res) => {
    try {
        const students = (await getStudents()).map(student => ({
            name: student.name,
            birth: dayjs(student.birth).format('DD/MM/YYYY')
        }));
        res.render('users', { students });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
});

// Add a user
app.post('/add-student', validateStudent, async (req, res) => {
    const { name, birth } = req.body;
    try {
        await addStudent({ name, birth });
        res.redirect('/users');
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Error adding user");
    }
});

// Delete a user
app.post('/delete-student', async (req, res) => {
    const { name } = req.body;
    try {
        await deleteStudent(name);
        res.redirect('/users');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://${process.env.APP_LOCALHOST}:${port}`);
});
