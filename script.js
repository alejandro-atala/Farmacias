// Información de las farmacias (nombre, dirección y teléfono)
const farmacias = [
    { nombre: 'Farmacia San Lorenzo', direccion: 'Av. Santagada 515', telefono: '2921-453545' },
    { nombre: 'Farmacia San Luis', direccion: 'Av. Fuertes 520', telefono: '2921-406604' },
    { nombre: 'Farmacia Uslenghi', direccion: 'Av. Santagada 1201', telefono: '2921-405800 / 452886' },
    { nombre: 'Farmacia Pasteur', direccion: 'Yrigoyen 665', telefono: '2921-452625' },
    { nombre: 'Farmacia Perez', direccion: 'Santagada 855', telefono: '2921-405130' }
  ];
  
  // Función para obtener la farmacia de turno
  function obtenerFarmaciaDeTurno() {
    const fechaActual = new Date();
    const semanaActual = Math.floor((fechaActual.getDate() - 1) / 7) % farmacias.length;
    return farmacias[semanaActual];
  }
  
  // Función para mostrar la farmacia de turno en la página
  function mostrarFarmaciaDeTurno() {
    const farmaciaDeTurno = obtenerFarmaciaDeTurno();
    document.getElementById('nombreFarmacia').textContent = farmaciaDeTurno.nombre;
    document.getElementById('direccionFarmacia').textContent = farmaciaDeTurno.direccion;
    document.getElementById('telefonoFarmacia').textContent = farmaciaDeTurno.telefono;
  }
  
  // Llamar a la función para mostrar la farmacia de turno al cargar la página
  mostrarFarmaciaDeTurno();
  



  