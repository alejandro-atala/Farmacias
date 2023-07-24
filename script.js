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
  
  // Aquí puedes agregar el código para integrar Google AdMob y mostrar los anuncios en el elemento "anuncio"
  // Ten en cuenta que necesitarás el SDK de AdMob y tu ID de anuncio para hacerlo correctamente.
  // Dentro de tu archivo script.js

// Configurar el anuncio de AdMob
function configurarAnuncio() {
    // Reemplaza 'TU_ID_ADMOB' con el ID de tu anuncio obtenido en AdMob
    const adUnitID = 'ca-app-pub-9516551446751407~8397283315';
    
    // Crea el anuncio
    const adsbygoogle = window.adsbygoogle || [];
    adsbygoogle.push({ google_ad_client: adUnitID });
  }
  
  // Mostrar el anuncio
  function mostrarAnuncio() {
    // Reemplaza 'anuncio-container' con el ID del contenedor que creaste
    const container = document.getElementById('anuncio-container');
    
    // Verifica que el contenedor exista antes de mostrar el anuncio
    if (container) {
      // Muestra el anuncio en el contenedor
      container.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-format="auto"></ins>';
      
      // Carga el anuncio
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
  
  // Llama a las funciones para configurar y mostrar el anuncio
  configurarAnuncio();
  mostrarAnuncio();
  