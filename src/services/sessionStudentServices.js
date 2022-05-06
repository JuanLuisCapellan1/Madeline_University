const { getConnection } = require('../database');

async function createSession(data){
  const connection = await getConnection();
  if(!data.ID_ESTUDIANTE){
    throw new Error('PLEASE PROVIDE A STUDENT ID');
  }
  else if(!data.ID_MATERIA){
    throw new Error('PLEASE PROVIDE AN MATERIA');
  }
  await connection.query(`INSERT INTO sessiones_estudiantes (ID_ESTUDIANTE, ID_MATERIA) VALUES ('${data.ID_ESTUDIANTE}', '${data.ID_MATERIA}')`);
  return 'SESSION STUDENT SAVED';
}

async function getSessionStudent(){
  const connection = await getConnection();
  return connection.query(`SELECT s.id, es.NOMBRES as 'Nombre del estudiante', m.NOMBRE AS 'Nombre de la materia' FROM sessiones_estudiantes AS s JOIN estudiantes AS es ON s.ID_ESTUDIANTE = es.ID JOIN materias as m ON s.ID_MATERIA = m.ID`);
}

async function updateSessionStudent(data){
  if(!data.id){
    throw new Error( 'PLEASE PROVIDE AN ID');
  }
  const connection = await getConnection();
  if(data.ID_MATERIA){
    const verifySIDMateria = await connection.query(`SELECT ID FROM materias WHERE ID = '${data.ID_MATERIA}'`);
    if(verifySIDMateria.length === 0){
      throw new Error('ID NOT FOUND');
    }
  }
  else if(data.ID_ESTUDIANTE){
    const verifySIDStudent = await connection.query(`SELECT ID FROM estudiantes WHERE ID = '${data.ID_ESTUDIANTE}'`);
    if(verifySIDStudent.length === 0){
      throw new Error('ID NOT FOUND');
    }
  }
  await connection.query('UPDATE sessiones_estudiantes SET ? WHERE ID = ?', [data, data.id]);
  return 'SESSION UPDATED SUCCESSFULLY';
}

async function deleteSessionStudent(id){
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM sessiones_estudiantes WHERE ID = '${id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  await connection.query(`DELETE FROM sessiones_estudiantes WHERE ID = ${id}`);
  return 'SESSION DELETED SUCCESSFULLY';
}

module.exports = { createSession, getSessionStudent, updateSessionStudent, deleteSessionStudent }
