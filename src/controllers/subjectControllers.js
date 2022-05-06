const subjecController = require('../services/subjectService');


async function createSubject(req, res, next){
  try {
    const data = { NOMBRE: req.body.nombre};
    res.json({message: await subjecController.createNewMateria(data)});
  } catch (error) {
    next(error);
  }
}

async function getSubject(req, res, next){
  try {
    if(req.query.nombre){
      const data = {NOMBRE: req.query.nombre};
      res.json(await subjecController.getSubjectsByName(data));
    }
    else{
      res.json(await subjecController.getSubjects());
    }
  } catch (error) {
    next(error);
  }
}

async function updateSubject(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    const data = { ...req.body };
    data.id = id;
    res.json({ message: await subjecController.updateSubject(data)});
  } catch (error) {
    next(error);
  }
}

async function deleteSubject(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    res.json({message: await subjecController.deleteSubject(id)});
  } catch (error) {
    next(error);
  }
}

module.exports = { createSubject, getSubject, updateSubject, deleteSubject }
