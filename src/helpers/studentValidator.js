async function validateNewStudent(data) {
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
  else if(typeof(data.EDAD) !== 'number'){
    throw new Error('INVALID AGE FORMAT');
  }
  else if(data.TELEFONO === undefined || data.TELEFONO === 0 || data.TELEFONO === null){
    throw new Error('PLEASE PROVIDE A PHONE NUMBER');
  }
  else if(typeof(data.TELEFONO) !== 'number'){
    throw new Error('INVALID PHONE FORMAT');
  }
  else if(data.CEDULA === undefined || data.CEDULA === 0 || data.CEDULA === null){
    throw new Error('PLEASE PROVIDE AN IDENTIFICATION CARD');
  }
  else if(typeof(data.CEDULA) !== 'number'){
    throw new Error('INVALID PERSONAL IDENTIFICATION FORMAT');
  }
  else if(data.DIRECCION === undefined || data.DIRECCION === '' || data.DIRECCION === null){
    throw new Error('PLEASE PROVIDE AN ADDRESS');
  }
}

module.exports = {validateNewStudent}
