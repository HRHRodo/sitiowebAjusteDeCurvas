/* ===========================================
   JavaScript - Interactividad del sitio
   Ajuste de Curvas - Unidad 7
   =========================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

  // -----------------------------------------------
  // 1. Mostrar/ocultar movimientos del Simplex
  // -----------------------------------------------
  var botonesMovimiento = document.querySelectorAll('.movimientos-container button, .btn-movimiento');
  var panelesMovimiento = document.querySelectorAll('#panel-reflexion, #panel-expansion, #panel-contraccion, #panel-contraccion-total');

  botonesMovimiento.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var idPanel = this.getAttribute('data-panel');
      var panel = document.getElementById(idPanel);

      if (!panel) return;

      var yaVisible = panel.classList.contains('visible');

      // Cerrar todos los paneles de movimientos
      panelesMovimiento.forEach(function (p) {
        p.classList.remove('visible');
      });

      // Quitar clase activa de todos los botones de movimiento
      botonesMovimiento.forEach(function (b) {
        b.classList.remove('activo');
      });

      // Si no estaba visible, abrir el seleccionado y activar el botón
      if (!yaVisible) {
        panel.classList.add('visible');
        this.classList.add('activo');
      }
    });
  });

  // -----------------------------------------------
  // 2. Tabla interactiva - Modelos de Tejada (2025)
  // -----------------------------------------------
  var filasModelo = document.querySelectorAll('.fila-modelo');

  filasModelo.forEach(function (fila) {
    fila.addEventListener('click', function () {
      var idDetalle = this.getAttribute('data-detalle');
      var detalle = document.getElementById(idDetalle);

      if (detalle) {
        // Cerrar otros detalles abiertos
        var todosDetalles = document.querySelectorAll('.panel-detalle-modelo');
        todosDetalles.forEach(function (d) {
          if (d.id !== idDetalle) {
            d.classList.remove('visible');
          }
        });

        // Alternar el detalle seleccionado
        detalle.classList.toggle('visible');
      }
    });
  });

  // -----------------------------------------------
  // 3. Quiz de reflexión - Sección 5
  // -----------------------------------------------
  var botonQuiz = document.getElementById('btn-verificar-quiz');

  if (botonQuiz) {
    botonQuiz.addEventListener('click', function () {
      var opciones = document.getElementsByName('quiz-resistencia');
      var seleccionada = null;
      var resultadoCorrecto = document.getElementById('quiz-correcto');
      var resultadoIncorrecto = document.getElementById('quiz-incorrecto');

      // Encontrar la opción seleccionada
      for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
          seleccionada = opciones[i].value;
          break;
        }
      }

      // Ocultar ambos resultados
      resultadoCorrecto.style.display = 'none';
      resultadoIncorrecto.style.display = 'none';

      if (seleccionada === null) {
        alert('Por favor, selecciona una opción antes de verificar.');
        return;
      }

      // La respuesta correcta es "stacking"
      if (seleccionada === 'stacking') {
        resultadoCorrecto.style.display = 'block';
      } else {
        resultadoIncorrecto.style.display = 'block';
      }
    });
  }

  // -----------------------------------------------
  // 4. Navegación suave al hacer clic en enlaces
  // -----------------------------------------------
  var enlacesNav = document.querySelectorAll('.navegacion a');

  enlacesNav.forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
      var destino = this.getAttribute('href');

      // Solo si es un ancla interna
      if (destino && destino.charAt(0) === '#') {
        e.preventDefault();
        var seccionDestino = document.querySelector(destino);
        if (seccionDestino) {
          // Calcular posición considerando la barra de navegación fija
          var alturaNav = document.querySelector('.navegacion').offsetHeight;
          var posicion = seccionDestino.offsetTop - alturaNav;

          window.scrollTo({
            top: posicion,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // -----------------------------------------------
  // 5. Botón mostrar/ocultar general
  // -----------------------------------------------
  var botonesToggle = document.querySelectorAll('.btn-toggle');

  botonesToggle.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var idContenido = this.getAttribute('data-contenido');
      var contenido = document.getElementById(idContenido);

      if (contenido) {
        if (contenido.style.display === 'none' || contenido.style.display === '') {
          contenido.style.display = 'block';
          this.textContent = this.textContent.replace('Mostrar', 'Ocultar');
        } else {
          contenido.style.display = 'none';
          this.textContent = this.textContent.replace('Ocultar', 'Mostrar');
        }
      }
    });
  });

});
