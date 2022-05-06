const { getConnection } = require('../database');

async function createNewMateria(data){
  const connection = await getConnection();
  if(!data.NOMBRE){
    throw new Error('PLEASE PROVIDE A NAME OF SUBJECT');
  }
  await connection.query(`INSERT INTO materias (NOMBRE) VALUES ('${data.NOMBRE}')`);
  return "SUBJECT SAVED SUCCESSFULLY";
}

async function getSubjects(){
  const connection = await getConnection();
  return connection.query(`SELECT * FROM materias`);
}

async function getSubjectsByName(data){
  const connection = await getConnection();
  const result = await connection.query(`SELECT * FROM materias WHERE NOMBRE LIKE '%${data.NOMBRE}%'`);
  if(result.length === 0){
    return 'SUBJECT WITH THAT NAME NOT FOUND';
  }
  return result;
}

async function updateSubject(data){
  if(!data.id){
    throw new Error( 'PLEASE PROVIDE AN ID');
  }
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM materias WHERE ID = '${data.id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  await connection.query('UPDATE materias SET ? WHERE ID = ?', [data, data.id]);
  return 'SUBJECT UPDATED SUCCESSFULLY';
}

async function deleteSubject(id){
  const connection = await getConnection();
  const verifySID = await connection.query(`SELECT ID FROM materias WHERE ID = '${id}'`);
  if(verifySID.length === 0){
    throw new Error('ID NOT FOUND');
  }
  await connection.query(`DELETE FROM materias WHERE ID = ${id}`);
  return 'SUBJECT DELETED SUCCESSFULLY';
}

module.exports = { createNewMateria, getSubjects, getSubjectsByName, updateSubject,  deleteSubject}
