const dayjs = require('dayjs');

//Middleware to validate student input
const validateStudent = (req, res, next) => {
    const { name, birth } = req.body;

    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name || typeof name !== 'string' || !name.trim() || !nameRegex.test(name)) {
        return res.status(400).render('home', { error: 'Invalid name' });
    }

    if (!birth || !dayjs(birth, 'YYYY-MM-DD', true).isValid() || dayjs(birth).isAfter(dayjs())) {
        return res.status(400).render('home', { error: 'Invalid birth date' });
    }
    next();
};

module.exports = {
    validateStudent
};
