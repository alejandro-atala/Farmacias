// // Definir un objeto vacío para almacenar las farmacias por localidad
// const farmaciasPorLocalidad = {};

// // Función para leer el archivo CSV y cargar los datos en el objeto farmaciasPorLocalidad
// function cargarFarmaciasDesdeCSV() {
//   Papa.parse("datos.csv", {
//     download: true,
//     complete: function (result) {
//       // Iterar sobre las filas del archivo CSV (ignorando la primera fila de encabezados)
//       for (let i = 1; i < result.data.length; i++) {
//         const [localidad, nombre, direccion, telefono] = result.data[i];
//         if (!farmaciasPorLocalidad[localidad]) {
//           farmaciasPorLocalidad[localidad] = [];
//         }
//         farmaciasPorLocalidad[localidad].push({ nombre, direccion, telefono });
//       }

//       // Una vez que se cargaron los datos, llamar a la función para mostrar la farmacia de turno actual
//       mostrarFarmaciaDeTurno();
//     },
//   });
// }

// // Función para obtener la farmacia de turno actual
// function obtenerFarmaciaDeTurno(localidad) {
//   const farmacias = farmaciasPorLocalidad[localidad];
//   const semanaActual = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)); // Semana actual en milisegundos
//   const indiceFarmacia = semanaActual % farmacias.length;
//   return farmacias[indiceFarmacia];
// }

// // Función para mostrar la farmacia de turno según la localidad seleccionada
// function mostrarFarmaciaDeTurno() {
//   const localidadSelect = document.getElementById("localidad");
//   const localidadSeleccionada = localidadSelect.value;
//   const farmaciaDeTurno = obtenerFarmaciaDeTurno(localidadSeleccionada);

//   const farmaciaTurno = document.getElementById("farmaciaTurno");
//   farmaciaTurno.innerHTML = `
//     <h3>${farmaciaDeTurno.nombre}</h3>
//     <p>${farmaciaDeTurno.direccion}</p>
//     <p>${farmaciaDeTurno.telefono}</p>
//     <hr>
//   `;
// }

// // Asociar la función cargarFarmaciasDesdeCSV al evento de carga de la página
// window.addEventListener("load", cargarFarmaciasDesdeCSV);

// // Asociar la función mostrarFarmaciaDeTurno al evento de cambio del select
// document.getElementById("localidad").addEventListener("change", mostrarFarmaciaDeTurno);


// Definir un objeto vacío para almacenar las farmacias por localidad
const farmaciasPorLocalidad = {};

// Función para leer el archivo CSV y cargar los datos en el objeto farmaciasPorLocalidad
function cargarFarmaciasDesdeCSV() {
  Papa.parse("datos.csv", {
    download: true,
    complete: function (result) {
      // Iterar sobre las filas del archivo CSV (ignorando la primera fila de encabezados)
      for (let i = 1; i < result.data.length; i++) {
        const [localidad, nombre, direccion, telefono] = result.data[i];
        if (!farmaciasPorLocalidad[localidad]) {
          farmaciasPorLocalidad[localidad] = [];
        }
        farmaciasPorLocalidad[localidad].push({ nombre, direccion, telefono });
      }

      // Una vez que se cargaron los datos, llamar a la función para mostrar la farmacia de turno actual
      mostrarFarmaciaDeTurno();
    },
  });
}

// Función para obtener la farmacia de turno actual considerando el día de la semana y hora actual
function obtenerFarmaciaDeTurno(localidad) {
  const farmacias = farmaciasPorLocalidad[localidad];
  const now = new Date(); // Fecha y hora actual
  const currentWeek = getWeekNumber(now); // Obtener el número de semana actual

  // Obtener el número de semana almacenado en el almacenamiento local (si existe)
  const lastWeek = parseInt(localStorage.getItem("lastWeek"), 10);

  // Si es la misma semana que la almacenada, obtener la farmacia anterior
  if (lastWeek && currentWeek === lastWeek) {
    const indiceFarmacia = (currentWeek - 1) % farmacias.length;
    return farmacias[indiceFarmacia];
  }

  // Si es una semana diferente, almacenar la nueva semana y obtener la siguiente farmacia
  localStorage.setItem("lastWeek", currentWeek.toString());
  const indiceFarmacia = currentWeek % farmacias.length;
  return farmacias[indiceFarmacia];
}

// Función para obtener el número de semana a partir de una fecha
function getWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
}

// Función para mostrar la farmacia de turno según la localidad seleccionada
function mostrarFarmaciaDeTurno() {
  const localidadSelect = document.getElementById("localidad");
  const localidadSeleccionada = localidadSelect.value;
  const farmaciaDeTurno = obtenerFarmaciaDeTurno(localidadSeleccionada);

  const farmaciaTurno = document.getElementById("farmaciaTurno");
  farmaciaTurno.innerHTML = `
    <h3>${farmaciaDeTurno.nombre}</h3>
    <p>${farmaciaDeTurno.direccion}</p>
    <p>${farmaciaDeTurno.telefono}</p>
    <hr>
  `;
}

// Asociar la función cargarFarmaciasDesdeCSV al evento de carga de la página
window.addEventListener("load", cargarFarmaciasDesdeCSV);

// Asociar la función mostrarFarmaciaDeTurno al evento de cambio del select
document.getElementById("localidad").addEventListener("change", mostrarFarmaciaDeTurno);

// Mostrar la farmacia de turno actual para la primera localidad al cargar la página
mostrarFarmaciaDeTurno();
