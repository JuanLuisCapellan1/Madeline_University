async function validateData(data) {
  if(data.NOMBRES === undefined || data.NOMBRES === '' || data.NOMBRES === null){
    throw new Error('PLEASE PROVIDE A NAME');
  }
  else if(data.APELLIDOS === undefined || data.APELLIDOS === '' || data.APELLIDOS === null){
    throw new Error('PLEASE PROVIDE A LAST-NAME');
  }
  else if(data.EMAIL === undefined || data.EMAIL === '' || data.EMAIL === null){
    throw new Error('PLEASE PROVIDE AN EMAIL');
  }
  else if(data.EDAD === undefined || data.EDAD === 0 || data.EDAD === null){
    throw new Error('PLEASE PROVIDE AN AGE');
  }
  else if(data.TELEFONO === undefined || data.TELEFONO === '' || data.TELEFONO === null){
    throw new Error('PLEASE PROVIDE A PHONE NUMBER');
  }
  else if(data.CEDULA === undefined || data.CEDULA === '' || data.CEDULA === null){
    throw new Error('PLEASE PROVIDE AN IDENTIFICATION CARD');
  }
  else if(data.DIRECCION === undefined || data.DIRECCION === '' || data.DIRECCION === null){
    throw new Error('PLEASE PROVIDE AN ADDRESS');
  }
}


async function validateNewTeacher(data) {
  await validateData(data);
  if(data.SALARIO === undefined || data.SALARIO === 0 || data.SALARIO === null){
    throw new Error('PLEASE PROVIDE A SALARY');
  }
}

module.exports = { validateData, validateNewTeacher }
