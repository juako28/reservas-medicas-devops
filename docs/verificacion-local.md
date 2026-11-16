# Verificación local del servicio

Esta guía establece los controles que se aplicarán al ejecutar el proyecto. Los resultados deben registrarse a partir de la ejecución real.

## Comprobaciones

1. Con Docker Desktop iniciado, ejecutar `docker compose config --quiet`.
2. Construir con `docker compose build` y levantar con `docker compose up -d --wait --wait-timeout 90`.
3. Revisar el contenedor con `docker compose ps` y `docker compose exec web nginx -t`.
4. Abrir `http://localhost:8080` y comprobar contenido y estilos.
5. Intentar confirmar con campos vacíos: la validación debe impedirlo.
6. Completar el formulario con `Paciente Demo`, especialidad, fecha actual o futura y horario. Pulsar `Reservar hora`: debe aparecer el mensaje `Solicitud de reserva completada` con los datos seleccionados.
7. Comprobar `curl.exe http://localhost:8080/healthz`: se espera `ok`.
8. Registrar `docker logs reservas-medicas --tail 30` después de abrir la página.
9. Registrar `docker stats --no-stream reservas-medicas`: copiar los valores reales de CPU y memoria en el informe.
10. Detener con `docker compose stop`, revisar `docker compose ps -a` y limpiar con `docker compose down`.

## Criterio de aceptación

La página responde, valida los campos y permite completar el formulario. El entorno puede volver a crearse desde los archivos versionados. La comprobación de salud valida Nginx; la interacción del formulario requiere la prueba del navegador.
