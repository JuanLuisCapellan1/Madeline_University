const sessionTeacher = require('../services/sessionTeacherService');

async function createSessionTeacher(req, res, next){
  try {
    const data = { ID_PROFESOR: req.body.id_profesor, ID_MATERIA: req.body.id_materia };
    res.json({message: await sessionTeacher.createSession(data)});
  } catch (error) {
    next(error);
  }
}

async function getSessionTeacher(req, res, next){
  try {
    const data = { ID_PROFESOR: req.body.id_profesor, ID_MATERIA: req.body.id_materia };
    res.json({message: await sessionTeacher.getSessionTeacher(data)});
  } catch (error) {
    next(error);
  }
}

async function updateSessionTeacher(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    const data = { ...req.body };
    data.id = id;
    res.json({ message: await sessionTeacher.updateSessionTeacher(data)});
  } catch (error) {
    next(error);
  }
}

async function deleSessionTeacher(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    res.json({message: await sessionTeacher.deleteSessionTeacher(id)});
  } catch (error) {
    next(error);
  }
}

module.exports = { createSessionTeacher, getSessionTeacher, updateSessionTeacher, deleSessionTeacher };
