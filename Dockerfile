FROM nginx:alpine

LABEL org.opencontainers.image.title="Reserva de horas medicas"
LABEL org.opencontainers.image.description="Demostracion academica estatica para DEVOPS"
LABEL org.opencontainers.image.version="1.0.0"

COPY nginx.conf /etc/nginx/nginx.conf
COPY src/ /usr/share/nginx/html/

EXPOSE 80
