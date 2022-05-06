const { getConnection } = require('../database');
const validator = require('../helpers/teacherValidator');

async function createNewTeacher(data){
  await validator.validateNewTeacher(data);
  const connection = await getConnection();
  const verifyTeacher = await connection.query(`SELECT EMAIL FROM profesores WHERE EMAIL = '${data.EMAIL}'`);
  if(verifyTeacher.length > 0){
    throw new Error('THIS EMAIL ALREADY EXISTS');
  }
  const verifyIdTeacher = await connection.query(`SELECT CEDULA FROM profesores WHERE CEDULA = '${data.CEDULA}'`);
  if(verifyIdTeacher.length > 0){
    throw new Error('THIS PERSONAL IDENTIFICATION ALREADY EXISTS');
  }
  await connection.query(`INSERT INTO profesores (NOMBRES, APELLIDOS, EMAIL, EDAD, TELEFONO, CEDULA, SALARIO, DIRECCION) VALUES ('${data.NOMBRES}', 
  '${data.APELLIDOS}', '${data.EMAIL}', ${data.EDAD}, '${data.TELEFONO}', '${data.CEDULA}', ${data.SALARIO} ,'${data.DIRECCION}')`);
  return "TEACHER SAVED SUCCESSFULLY";
}

async function getTeacher(){
  const connection = await getConnection();
  return connection.query(`SELECT * FROM profesores`);
}

async function getTeacherByName(data){
  const connection = await getConnection();
  const result = await connection.query(`SELECT * FROM profesores WHERE NOMBRES LIKE '%${data.NOMBRES}%'`);
  if(result.length === 0){
    return 'TEACHERS NOT FOUND';
  }
  return result;
}

async function updateTeacher(data){
  if(!data.id){
    throw new Error( 'PLEASE PROVIDE AN ID');
  }
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM profesores WHERE ID = '${data.id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  const verifySTeacher = await connection.query(`SELECT EMAIL FROM profesores WHERE EMAIL = '${data.EMAIL}'`);
  if(verifySTeacher.length > 0){
    throw new Error('THIS EMAIL ALREADY EXISTS');
  }
  const verifyIdTeacher = await connection.query(`SELECT CEDULA FROM profesores WHERE CEDULA = '${data.CEDULA}'`);
  if(verifyIdTeacher.length > 0){
    throw new Error('THIS PERSONAL IDENTIFICATION ALREADY EXISTS');
  }
  if(data === undefined || data === null){
    throw new Error('PLEASE PROVIDE A DATA');
  }
  await connection.query('UPDATE profesores SET ? WHERE ID = ?', [data, data.id]);
  return 'TEACHER UPDATED SUCCESSFULLY';
}

async function deleteTeacher(id){
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM profesores WHERE ID = '${id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  await connection.query(`DELETE FROM profesores WHERE ID = ${id}`);
  return 'TEACHER DELETED SUCCESSFULLY';
}



module.exports = { createNewTeacher, getTeacher, getTeacherByName, updateTeacher, deleteTeacher };
