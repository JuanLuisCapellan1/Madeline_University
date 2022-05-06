const { getConnection } = require('../database');

async function createSession(data){
  const connection = await getConnection();
  if(!data.ID_PROFESOR){
    throw new Error('PLEASE PROVIDE A TEACHER ID');
  }
  else if(!data.ID_MATERIA){
    throw new Error('PLEASE PROVIDE AN MATERIA');
  }
  await connection.query(`INSERT INTO sessiones_profesores (ID_PROFESOR, ID_MATERIA) VALUES ('${data.ID_PROFESOR}', '${data.ID_MATERIA}')`);
  return 'SESSION TEACHER SAVED';
}

async function getSessionTeacher(){
  const connection = await getConnection();
  return connection.query(`SELECT s.id, es.NOMBRES as 'Nombre del Profesor', m.NOMBRE AS 'Nombre de la materia' FROM sessiones_profesores AS s JOIN profesores AS es ON s.ID_PROFESOR = es.ID JOIN materias as m ON s.ID_MATERIA = m.ID`);
}

async function updateSessionTeacher(data){
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
  await connection.query('UPDATE sessiones_profesores SET ? WHERE ID = ?', [data, data.id]);
  return 'SESSION TEACHER UPDATED SUCCESSFULLY';
}

async function deleteSessionTeacher(id){
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM sessiones_profesores WHERE ID = '${id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  await connection.query(`DELETE FROM sessiones_profesores WHERE ID = '${id}'`);
  return 'SESSION DELETED SUCCESSFULLY';
}

module.exports = { createSession, getSessionTeacher, updateSessionTeacher, deleteSessionTeacher }
