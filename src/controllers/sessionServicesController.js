const sessionStudent = require('../services/sessionStudentServices');

async function createSessionStudent(req, res, next){
  try {
    const data = { ID_ESTUDIANTE: req.body.id_estudiante, ID_MATERIA: req.body.id_materia };
    res.json({message: await sessionStudent.createSession(data)});
  } catch (error) {
    next(error);
  }
}

async function getSessionStudent(req, res, next){
  try {
    const data = { ID_ESTUDIANTE: req.body.id_estudiante, ID_MATERIA: req.body.id_materia };
    res.json({message: await sessionStudent.getSessionStudent(data)});
  } catch (error) {
    next(error);
  }
}

async function updateSessionStudents(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    const data = { ...req.body };
    data.id = id;
    res.json({ message: await sessionStudent.updateSessionStudent(data)});
  } catch (error) {
    next(error);
  }
}

async function deleteSessionStudent(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    res.json({message: await sessionStudent.deleteSessionStudent(id)});
  } catch (error) {
    next(error);
  }
}

module.exports = { createSessionStudent, getSessionStudent, updateSessionStudents, deleteSessionStudent };
