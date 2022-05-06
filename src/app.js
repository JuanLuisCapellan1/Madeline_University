const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const studentController = require('./controllers/studentControllers');
const teacherController = require('./controllers/teacherController');
const subjecController = require('./controllers/subjectControllers');
const sessionService = require('./controllers/sessionServicesController');
const sessionTeacher = require('./controllers/sessionTeacherController');

//routes student
app.post('/api/new-student', studentController.createStudent);
app.get('/api/students', studentController.getStudent);
app.put('/api/update-student/:id', studentController.updateStudent);
app.delete('/api/delete-student/:id', studentController.deleteStudent);

//routes teacher
app.post('/api/new-teacher', teacherController.createTeacher);
app.get('/api/teachers', teacherController.getTeacher);
app.put('/api/update-teacher/:id', teacherController.updateTeacher);
app.delete('/api/delete-teacher/:id', teacherController.deleteTeacher);

//routes subject
app.post('/api/new-subject', subjecController.createSubject);
app.get('/api/subject', subjecController.getSubject);
app.put('/api/update-subject/:id', subjecController.updateSubject);
app.delete('/api/delete-subject/:id', subjecController.deleteSubject);

//routes sessiones estudiantes
app.post('/api/new-session', sessionService.createSessionStudent);
app.get('/api/sessionStudent', sessionService.getSessionStudent);
app.put('/api/update-session/:id', sessionService.updateSessionStudents);
app.delete('/api/delete-session/:id', sessionService.deleteSessionStudent);

//routes sessiones profesores
app.post('/api/new-sessionTeacher', sessionTeacher.createSessionTeacher);
app.get('/api/sessionTeacher', sessionTeacher.getSessionTeacher);
app.put('/api/update-sessionTeacher/:id', sessionTeacher.updateSessionTeacher);
app.delete('/api/delete-sessionTeacher/:id', sessionTeacher.deleSessionTeacher);



//middleware
app.use(function (err, _req, res, _next) {
  res.status(err.status_code || 500).json({
      error: {...err, message: err.message, stack: err.stack},
  });
});

//listen server
app.listen(config.PORT, () => {
  console.log(`Server is Running on Port ${config.PORT}`);
});
