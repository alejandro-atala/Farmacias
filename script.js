function mostrarCartelDescarga() {
  // Verifica si la cookie "appDescargada" está presente
  const appDescargada = getCookie("appDescargada");

  // Si la cookie no está presente, muestra el cartel y establece la cookie
  if (!appDescargada) {
    const cartel = document.getElementById("downloadApp");
    cartel.style.display = "block";
    // Establece la cookie "appDescargada" con un valor de "true" (puede cambiar esto según tus necesidades)
    setCookie("appDescargada", "true", 365); // La cookie expira en 365 días
  }
}

// Función para establecer una cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para obtener el valor de una cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}


// Definir un objeto vacío para almacenar las farmacias por localidad
const farmaciasPorLocalidad = {};

// Función para leer el archivo CSV y cargar los datos en el objeto farmaciasPorLocalidad
function cargarFarmaciasDesdeCSV() {
  document.querySelector(".progress-bar").style.display = "block";
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
      setTimeout(function () {
        document.querySelector(".progress-bar").style.display = "none";
      // Una vez que se cargaron los datos, llamar a la función para mostrar la farmacia de turno actual
      mostrarFarmaciaDeTurno();
    }, 2000);
    },
  });
}

// Función para obtener el número de semana a partir de una fecha
function getWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
}

// Función para obtener la próxima farmacia de la lista según la localidad y el día actual
function obtenerFarmaciaDeTurno(localidad) {
  const farmacias = farmaciasPorLocalidad[localidad];
  const now = new Date(); // Fecha y hora actual
  const dayOfWeek = now.getDay(); // Número del día de la semana (0 para domingo, 1 para lunes, etc.)
  const hour = now.getHours(); // Hora actual
  const minutes = now.getMinutes(); // Minutos actuales

  if (localidad === "Dorrego") {
    if (dayOfWeek === 4 && hour === 0 && minutes === 0) {
      // Es jueves a las 00:00 horas, avanzar al siguiente viernes
      const daysUntilNextFriday = (7 - dayOfWeek + 5) % 7;
      now.setDate(now.getDate() + daysUntilNextFriday);
    } else if (dayOfWeek !== 4) {
      // No es jueves, avanzar al próximo jueves
      const daysUntilNextThursday = (4 - dayOfWeek + 7) % 7;
      now.setDate(now.getDate() + daysUntilNextThursday);
    }

    const daysSinceStart = Math.floor((now.getTime() - new Date('2023-01-01').getTime()) / (1000 * 60 * 60 * 24));
    const weeksSinceStart = Math.floor(daysSinceStart / 7); // Calcular semanas desde el inicio
    const indiceFarmacia = weeksSinceStart % farmacias.length;
    return farmacias[indiceFarmacia];
  } else if (localidad === "Monte") {
    if (hour >= 9) {
      // Calcular la diferencia en días entre la fecha actual y la fecha de inicio
      const daysSinceStart = Math.floor((now.getTime() - new Date('2023-07-02').getTime()) / (1000 * 60 * 60 * 24));

      // Calcular el índice basado en los días desde el inicio
      const indiceFarmacia = daysSinceStart % farmacias.length;
      console.log(indiceFarmacia);
      return farmacias[indiceFarmacia];
    } else {
      // Antes de las 9 a. m., seleccionar la farmacia del día anterior
      const daysSinceStart = Math.floor((now.getTime() - new Date('2023-07-02').getTime()) / (1000 * 60 * 60 * 24));
      const indiceFarmaciaAyer = (daysSinceStart - 1 + farmacias.length) % farmacias.length;

      return farmacias[indiceFarmaciaAyer];
    }
  }
}

// Función para mostrar la farmacia de turno según la localidad seleccionada
function mostrarFarmaciaDeTurno() {
  const localidadSelect = document.getElementById("localidad");
  const localidadSeleccionada = localidadSelect.value;
  const farmaciaDeTurno = obtenerFarmaciaDeTurno(localidadSeleccionada);

  const farmaciaTurno = document.getElementById("farmaciaTurno");
  farmaciaTurno.innerHTML = `

    <p><b><u>${farmaciaDeTurno.nombre}</u></b></p>
    <p><img src="./img/Google-Maps-Logo.png" alt="Google Maps" class="google-maps-logo">
    <a class="farmacia-direccion" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(farmaciaDeTurno.direccion)}" target="_blank">${farmaciaDeTurno.direccion}</a></p>
    <p><img src="./img/tel.png" alt="Google Maps" class="tel-logo">
    <a class="farmacia-telefono" href="tel:${farmaciaDeTurno.telefono}">${farmaciaDeTurno.telefono}</a></p>
  `;
  // Mostrar el párrafo una vez que los datos se han cargado
  farmaciaTurno.querySelectorAll("p").forEach((paragraph) => {
    paragraph.style.display = "block";
  });
}





// Asociar la función cargarFarmaciasDesdeCSV al evento de carga de la página
window.addEventListener("load", cargarFarmaciasDesdeCSV);

// Asociar la función mostrarFarmaciaDeTurno al evento de cambio del select
document.getElementById("localidad").addEventListener("change", mostrarFarmaciaDeTurno);

// Mostrar la farmacia de turno actual para la primera localidad al cargar la página
mostrarFarmaciaDeTurno();
