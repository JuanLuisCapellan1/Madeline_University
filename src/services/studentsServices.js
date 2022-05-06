const { getConnection } = require('../database');
const validator = require('../helpers/studentValidator');

async function createNewStudent(data){
  await validator.validateNewStudent(data);
  const connection = await getConnection();

  const verifyStudent = await connection.query(`SELECT EMAIL FROM estudiantes WHERE EMAIL = '${data.EMAIL}'`);
  if(verifyStudent.length > 0){
    throw new Error('THIS EMAIL ALREADY EXISTS');
  }
  const verifyIdStudent = await connection.query(`SELECT CEDULA FROM estudiantes WHERE CEDULA = '${data.CEDULA}'`);
  if(verifyIdStudent.length > 0){
    throw new Error('THIS PERSONAL IDENTIFICATION ALREADY EXISTS');
  }
  await connection.query(`INSERT INTO estudiantes (NOMBRES, APELLIDOS, EMAIL, EDAD, TELEFONO, CEDULA, DIRECCION) VALUES ('${data.NOMBRES}', 
  '${data.APELLIDOS}', '${data.EMAIL}', ${data.EDAD}, '${data.TELEFONO}', '${data.CEDULA}', '${data.DIRECCION}')`);
  return "STUDENT SAVED SUCCESSFULLY";
}

async function getStudent(){
  const connection = await getConnection();
  return connection.query(`SELECT * FROM estudiantes`);
}

async function getStudentByName(data){
  const connection = await getConnection();
  const result = await connection.query(`SELECT * FROM estudiantes WHERE NOMBRES LIKE '%${data.NOMBRES}%'`);
  if(result.length === 0){
    return 'STUDENTS NOT FOUND';
  }
  return result;
}

async function updateStudent(data){
  if(!data.id){
    throw new Error( 'PLEASE PROVIDE AN ID');
  }
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM estudiantes WHERE ID = '${data.id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  
  const verifyStudent = await connection.query(`SELECT EMAIL FROM estudiantes WHERE EMAIL = '${data.EMAIL}'`);
  if(verifyStudent.length > 0){
    throw new Error('THIS EMAIL ALREADY EXISTS');
  }
  const verifyIdStudent = await connection.query(`SELECT CEDULA FROM estudiantes WHERE CEDULA = '${data.CEDULA}'`);
  if(verifyIdStudent.length > 0){
    throw new Error('THIS PERSONAL IDENTIFICATION ALREADY EXISTS');
  }
  await connection.query('UPDATE estudiantes SET ? WHERE ID = ?', [data, data.id]);
  return 'ESTUDENT UPDATED SUCCESSFULLY';
}

async function deleteStudent(id){
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM estudiantes WHERE ID = '${id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  await connection.query(`DELETE FROM estudiantes WHERE ID = ${id}`);
  return 'ESTUDENT DELETED SUCCESSFULLY';
}

module.exports = { createNewStudent, getStudent, getStudentByName, updateStudent, deleteStudent }
