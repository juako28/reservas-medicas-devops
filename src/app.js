'use strict';

// Simulación en memoria: no hay fetch, envío de formularios ni almacenamiento.
const form = document.querySelector('#reserva-form');
const fecha = document.querySelector('#fecha');
const resultado = document.querySelector('#resultado');
const hoy = new Date();
const fechaLocal = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
fecha.min = fechaLocal;

form.addEventListener('submit', (event) => event.preventDefault());
form.addEventListener('input', () => { resultado.hidden = true; });
document.querySelector('#reservar').addEventListener('click', () => {
  const paciente = document.querySelector('#paciente');
  paciente.setCustomValidity(paciente.value.trim().length < 3 ? 'Escribe un nombre de al menos tres caracteres.' : '');
  if (!form.reportValidity()) return;
  const especialidad = document.querySelector('#especialidad').value;
  const horario = document.querySelector('#horario').value;
  const [anio, mes, dia] = fecha.value.split('-');
  resultado.textContent = `Solicitud de reserva completada: ${especialidad}, ${dia}-${mes}-${anio} a las ${horario}.`;
  resultado.hidden = false;
  resultado.focus();
});
