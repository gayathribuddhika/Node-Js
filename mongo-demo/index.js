const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log("Connected to the MongoDB..."))
.catch(err => console.error("Could not connected to the MongoDB...", err));

const courseschema = new mongoose.Schema ({
    name: { type: String, required: true},
    author: String,
    tags:[String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseschema);

async function createCourse() {
    
    const course = new Course ({
        name: "Vue course",
        author: "Gayathri",
        tags: ["Vue", "Frontend"],
        isPublished: true
    })

    try {
        const result = await course.save();
        console.log(result, "\n Successfully added to the database...");
    } catch (ex) {
        console.log(ex.message)
    }

    
}

async function getCourse() {
    const courses = await Course
    .find({author: "Gayathri"})
    // .limit(10)
    // .sort({name: 1})
    // .select({name: 1, tags:1});
    console.log(courses);
}

async function updatecourse(id) {
    const course = await Course.findById(id);
    if(!course) return;
    course.name = "Updated author";
    const result = await course.save();
    console.log(result);
}

// createCourse();
// getCourse();
// updatecourse('616af453a97a0c59075269e6')
