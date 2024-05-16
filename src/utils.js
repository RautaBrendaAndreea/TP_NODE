const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '../Data/students.json');

//Retrieve the list of students from the JSON file
const getStudents = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading students file:", error);
        throw error; 
    }
};

//Save the list of students to the JSON file
const saveStudents = async (students) => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(students, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing students file:", error);
        throw error; 
    }
};

//Add a new student to the list
const addStudent = async (student) => {
    try {
        const students = await getStudents();
        students.push(student);
        await saveStudents(students);
    } catch (error) {
        console.error("Error adding student:", error);
        throw error;
    }
};

//Delete a student from the list by name
const deleteStudent = async (studentName) => {
    try {
        let students = await getStudents();
        students = students.filter(student => student.name !== studentName);
        await saveStudents(students);
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error; 
    }
};

module.exports = {
    getStudents,
    addStudent,
    deleteStudent
};
