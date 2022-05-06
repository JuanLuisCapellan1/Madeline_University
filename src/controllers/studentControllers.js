const studentServices = require('../services/studentsServices');

async function createStudent(req, res, next){
  try {
    const data = { NOMBRES: req.body.nombres, APELLIDOS: req.body.apellidos, EMAIL: req.body.email, EDAD: req.body.edad, 
      TELEFONO: req.body.telefono, CEDULA: req.body.cedula, DIRECCION: req.body.direccion};
    
    res.json({ message: await studentServices.createNewStudent(data)});
  } catch (error) {
    next(error);
  }
}

async function getStudent(req, res, next){
  try {
    
    if(req.query.nombres){
      const data = {NOMBRES: req.query.nombres};
      res.json(await studentServices.getStudentByName(data));
    }
    else{
      res.json(await studentServices.getStudent());
    }
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    const data = { ...req.body };
    data.id = id;
    res.json({ message: await studentServices.updateStudent(data)});
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req, res, next){
  try {
    if(!req.params.id){
      throw new Error('PLEASE PROVIDE AN ID');
    }
    const {id} = req.params;
    res.json({message: await studentServices.deleteStudent(id)});
  } catch (error) {
    next(error);
  }
}

module.exports = { createStudent, getStudent, updateStudent, deleteStudent }
