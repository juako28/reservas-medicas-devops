# Reserva de horas médicas en un entorno DevOps local

Proyecto académico de la Unidad 1 de DEVOPS. Representa el servicio de reserva de horas del **Centro Médico Alameda**, una institución ficticia. La aplicación es una página web estática servida con Nginx en Docker Desktop.

## Alcance

- Formulario de demostración con paciente ficticio, especialidad, fecha y horario.
- Información general de atención y estado de la página cargada.
- Confirmación mediante JavaScript en el navegador, sin API ni base de datos.
- No se envían ni se almacenan reservas. No se consulta disponibilidad real.
- Acceso local en **http://localhost:8080**.

Utilizar únicamente datos inventados. No ingresar antecedentes de pacientes, RUT, teléfonos ni correos reales.

## Requisitos

Git, cuenta de GitHub, editor de código, navegador y Docker Desktop instalado y en funcionamiento. En Windows, Docker Desktop debe utilizar contenedores Linux y tener disponible su motor, habitualmente mediante WSL 2. La primera construcción requiere Internet para obtener `nginx:alpine`.

## Estructura

| Archivo o carpeta | Función |
| --- | --- |
| `src/index.html` | Formulario, información de atención y contenido del sitio. |
| `src/styles.css` | Estilos básicos con Arial, colores planos y una sola columna adaptable al ancho de la pantalla. |
| `src/app.js` | Validación y confirmación simulada, sin llamadas de red. |
| `Dockerfile` | Construye la imagen usando `nginx:alpine`. |
| `docker-compose.yml` | Define construcción, puerto, healthcheck y límites de logs. |
| `nginx.conf` | Configura Nginx, ruta de salud, cabeceras y registro de acceso reducido. |
| `.env.example` | Ejemplo público de `APP_PORT=8080`, sin secretos. |
| `.gitignore` | Excluye configuración privada y evidencias locales. |
| `.dockerignore` | Excluye archivos innecesarios del contexto de construcción. |
| `.gitattributes` | Mantiene finales de línea consistentes. |
| `docs/` | Decisiones, tablero propuesto y guía de verificación. |
| `.github/workflows/devops-automation.yml` | Validación complementaria con GitHub Actions. |

## Instalación y ejecución

Clonar el repositorio público desde su URL real o descomprimir el proyecto. Abrir la terminal dentro de la carpeta que contiene `docker-compose.yml`.

```powershell
git --version
docker --version
docker compose version
docker info
docker run --rm hello-world
```

En PowerShell, crear la configuración local desde el ejemplo:

```powershell
Copy-Item .env.example .env
```

En Git Bash, Linux o macOS, el equivalente es `cp .env.example .env`. El archivo `.env` queda fuera de Git. Compose también funciona sin él porque el puerto predeterminado es 8080.

```powershell
docker compose config --quiet
docker compose build
docker compose up -d --wait --wait-timeout 90
docker compose ps
```

Abrir **http://localhost:8080**, completar la prueba con datos ficticios y pulsar **Reservar hora**. Se espera el mensaje **Solicitud de reserva completada**, con la especialidad, fecha y horario seleccionados.

`EXPOSE 80` documenta el puerto interno de la imagen. La publicación al equipo se realiza en Compose mediante `127.0.0.1:8080:80`: el servicio queda limitado a la interfaz local.

## Verificación y monitoreo

```powershell
curl.exe -I http://localhost:8080/
curl.exe http://localhost:8080/healthz
docker compose exec web nginx -t
docker logs reservas-medicas --tail 30
docker stats --no-stream reservas-medicas
docker inspect --format '{{.State.Health.Status}}' reservas-medicas
```

En Linux o macOS usar `curl` en lugar de `curl.exe`. Se espera HTTP 200 para la página y el texto `ok` en `/healthz`. El estado debe pasar a `healthy` si la comprobación interna responde. El healthcheck verifica Nginx, pero no sustituye la prueba del formulario en el navegador.

Los valores de CPU y memoria dependen de la ejecución real: registrar los observados y su contexto, sin asumir cifras. Los logs de acceso muestran método, ruta, estado HTTP, bytes y duración; omiten IP, argumentos de URL y agente del navegador. Los logs de error todavía pueden contener datos técnicos: revisarlos antes de compartirlos.

## Detención y limpieza

```powershell
docker compose stop
docker compose ps -a
docker compose down
```

`stop` deja el contenedor detenido; `down` lo elimina junto con la red administrada por Compose. La imagen local se conserva. No se necesitan volúmenes de datos porque la aplicación no almacena reservas.

## Control de versiones y revisión

Trabajar sobre ramas como `feature/guia-verificacion`, `fix/validacion-fecha` o `docs/actualizar-readme`. Registrar commits pequeños con mensajes claros. Publicar la rama y abrir un pull request hacia `main`; revisar los archivos modificados y las comprobaciones antes del merge.

En un equipo, otra persona revisaría el cambio. En esta actividad individual, documentar la revisión propia y no presentarla como una aprobación independiente. Después del merge, sincronizar `main` y etiquetar la versión validada con `v1.0.0`.

## Seguridad aplicada

- Solo datos ficticios; el formulario no incluye campos para información clínica.
- No hay envío del formulario ni almacenamiento local o remoto.
- `.env` y posibles claves privadas se excluyen de Git y del contexto Docker.
- `.env.example` contiene solo un puerto de ejemplo. No representa una configuración secreta.
- Puerto publicado exclusivamente en `127.0.0.1`.
- Cabeceras que limitan recursos al mismo origen, bloquean formularios hacia servidores y evitan incrustar la página en marcos de terceros.
- El repositorio público contiene código y documentación; las capturas se integran en el informe y permanecen fuera del repositorio por defecto.

`.gitignore` no elimina secretos ya guardados en el historial: si se publica una credencial por error, debe revocarse y revisarse el historial. Este proyecto no requiere credenciales de aplicación.

## Automatización complementaria

El workflow valida Compose, construye la imagen, inicia el contenedor temporal en el ejecutor de GitHub, verifica la ruta de salud y los recursos estáticos, y limpia los recursos. Se activa con push, pull request o ejecución manual. No publica la web en un servidor externo ni reemplaza las evidencias de Docker Desktop en el computador del estudiante.

## Problemas frecuentes

| Problema | Qué comprobar |
| --- | --- |
| No hay conexión con Docker | Abrir Docker Desktop, esperar al motor y comprobar `docker info`. |
| Puerto 8080 ocupado | Detener únicamente la aplicación o el contenedor identificado que lo utiliza. Mantener 8080 para la evaluación. |
| No se descarga Nginx | Revisar Internet, proxy y acceso al registro de imágenes. |
| Se muestra una versión anterior | Guardar los archivos y ejecutar `docker compose up -d --build --wait`. |
| Estado `unhealthy` | Revisar logs y ejecutar `docker compose exec web nginx -t`. |
| Error de formato YAML | Revisar indentación con espacios y ejecutar `docker compose config --quiet`. |

## Limitaciones y mejoras

La disponibilidad horaria es ficticia; la confirmación es una simulación. Se propone fijar la imagen base por digest para una reproducción más estricta, incorporar pruebas automatizadas del formulario, revisar vulnerabilidades de la imagen y registrar métricas de varias ejecuciones para comparar entregas.

## Fuentes técnicas

- IACC. (2026). Material de DEVOPS, semanas 1, 2 y 3.
- Docker. https://docs.docker.com/
- GitHub. https://docs.github.com/en/pull-requests/reference/pull-requests
