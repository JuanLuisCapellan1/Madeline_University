const teacherValidator = require('../services/teacherServices');

async function createTeacher(req, res, next){
  try {
    const data = { NOMBRES: req.body.nombres, APELLIDOS: req.body.apellidos, EMAIL: req.body.email, EDAD: req.body.edad, 
      TELEFONO: req.body.telefono, CEDULA: req.body.cedula, SALARIO: req.body.salario, DIRECCION: req.body.direccion};
    
    res.json({message: await teacherValidator.createNewTeacher(data)});
  } catch (error) {
    next(error);
  }
}

async function getTeacher(req, res, next){
  try {
    if(req.query.nombres){
      const data = {NOMBRES: req.query.nombres};
      res.json(await teacherValidator.getTeacherByName(data));
    }
    else{
      res.json(await teacherValidator.getTeacher());
    }
  } catch (error) {
    next(error);
  }
}

async function updateTeacher(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    const data = { ...req.body };
    data.id = id;
    res.json({ message: await teacherValidator.updateTeacher(data)});
  } catch (error) {
    next(error);
  }
}

async function deleteTeacher(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    res.json({message: await teacherValidator.deleteTeacher(id)});
  } catch (error) {
    next(error);
  }
}



module.exports = { createTeacher, getTeacher, updateTeacher, deleteTeacher}
