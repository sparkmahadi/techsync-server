const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const courses = require('./data/courses.json');
const courseDetails = require('./data/course-details.json')

app.get('/', (req, res) => {
    res.send('techsync data is running')
});

app.get('/courses', (req, res) => {
    res.send(courses);
})

app.get('/course-details/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const selectedCourse = courseDetails.find(c => c.id === id);
    console.log(selectedCourse);
    res.send(selectedCourse);
})

app.listen(port, () => {
    console.log(`techsync data is running on port ${port}`);
});