// Middleware to validate student input
const validateStudent = (req, res, next) => {
    const { name, birth } = req.body;
    if (!name || !birth) {
        return res.status(400).send('Name and birth date are required');
    }
    next();
};

module.exports = {
    validateStudent
};
