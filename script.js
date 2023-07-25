
const farmaciasPorLocalidad = {
  localidad1: [
     { nombre: 'Farmacia San Lorenzo', direccion: 'Av. Santagada 515', telefono: '2921-453545' },
    { nombre: 'Farmacia San Luis', direccion: 'Av. Fuertes 520', telefono: '2921-406604' },
    { nombre: 'Farmacia Uslenghi', direccion: 'Av. Santagada 1201', telefono: '2921-405800 / 452886' },
    { nombre: 'Farmacia Pasteur', direccion: 'Yrigoyen 665', telefono: '2921-452625' },
    { nombre: 'Farmacia Perez', direccion: 'Santagada 855', telefono: '2921-405130' }
  ],
  localidad2: [
    { nombre: 'Farmacia De la costa', direccion: 'Faro Recalada 1254', telefono: '2921-481554' },
    { nombre: 'Farmacia Valle encantado', direccion: 'Valle Encantado 91', telefono: '2921-483215' }
  ]
};

// Función para obtener la farmacia de turno actual
function obtenerFarmaciaDeTurno(localidad) {
  const farmacias = farmaciasPorLocalidad[localidad];
  const semanaActual = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)); // Semana actual en milisegundos
  const indiceFarmacia = semanaActual % farmacias.length;
  return farmacias[indiceFarmacia];
}

// Función para mostrar la farmacia de turno según la localidad seleccionada
function mostrarFarmaciaDeTurno() {
  const localidadSeleccionada = document.getElementById("localidad").value;
  const farmaciaDeTurno = obtenerFarmaciaDeTurno(localidadSeleccionada);

  const farmaciaTurno = document.getElementById("farmaciaTurno");
  farmaciaTurno.innerHTML = `
    <h3>${farmaciaDeTurno.nombre}</h3>
    <p>${farmaciaDeTurno.direccion}</p>
    <p>Teléfono: ${farmaciaDeTurno.telefono}</p>
    <hr>
  `;
}

// Asociar la función mostrarFarmaciaDeTurno al evento de cambio del select
document.getElementById("localidad").addEventListener("change", mostrarFarmaciaDeTurno);

// Mostrar la farmacia de turno actual para la primera localidad al cargar la página
mostrarFarmaciaDeTurno();



  