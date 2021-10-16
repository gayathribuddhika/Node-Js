const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
    {id: 4, name: "course4"},
    {id: 5, name: "course5"}
];

router.get('/', (req, res) => {
    res.send("Hello Gayathri...How are you?");
});


router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id));
    if (!course) {
        return res.status(404).send("Course not found");
    } else {
        res.send(course);
    }
    // if (!course) res.status(404).send("Course not found");
    // res.send(course);
});

// query parameters
router.get('/:year/:month', (req, res) => {
    const data = req.query;
    res.send(data);
});

router.post('/', (req, res) => {

    const {error} = validateCourse(req.body); // object distruction syntax "const {error}"
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    
    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id));
    
    if (!course) {
        return res.status(404).send("Course not found for the given ID");
    }
    const {error} = validateCourse(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id));
    
    if (!course) {
        return res.status(404).send("Course not found for the given ID");
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
})


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    }); 
    return schema.validate(course);
}

module.exports = router;