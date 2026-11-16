# Decisiones técnicas del proyecto

## Aplicación estática

El caso exige un sitio estático con Nginx. HTML define el contenido, CSS la presentación y JavaScript simula la confirmación. No se usa API, framework, base de datos ni envío de información.

## Presentación sencilla

La página utiliza una sola columna, la fuente Arial, un encabezado azul y controles de formulario básicos. Los estilos están escritos en CSS sin frameworks. Se eligió esta presentación para mantener un proyecto pequeño, fácil de leer y de explicar en la evaluación.

## Entorno definido en archivos

El Dockerfile parte de `nginx:alpine` y copia los archivos del sitio y la configuración de Nginx. Compose define el puerto y la comprobación de salud. Estos archivos pueden revisarse en Git antes de reconstruir el entorno. La etiqueta `nginx:alpine` puede cambiar con el tiempo; como mejora se propone fijar su digest después de validarlo.

## Acceso y configuración

El puerto interno es 80 y el publicado es 8080, limitado a `127.0.0.1`. `.env.example` documenta el valor no sensible `APP_PORT`. Compose interpreta esa variable; no se utiliza para insertar datos en el HTML ni como una credencial de Nginx.

## Datos y logs

El formulario utiliza solo datos ficticios. La confirmación se genera en memoria del navegador y no contiene el nombre del paciente. No se usan cookies, localStorage ni solicitudes de red para las reservas. El registro de acceso de Nginx omite IP y argumentos de URL. Los logs de error deben revisarse antes de publicarse.

## Versiones y automatización

La imagen del proyecto se etiqueta `reservas-medicas:1.0.0`. La etiqueta Git `v1.0.0` se creará después de verificar la ejecución y fusionar la rama. La relación entre el commit, la revisión y las capturas debe registrarse en el informe. GitHub Actions es una validación complementaria, sin despliegue externo.

## Persistencia

No se utilizan volúmenes de datos porque la demostración no almacena reservas. Los archivos estáticos forman parte de la imagen. Esto permite eliminarlos del entorno local y recrearlos mediante una nueva construcción, conservando las fuentes en Git.
