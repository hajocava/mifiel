# Cómo ejecutar en su computadora local

1. Debe tener instalado node v18 en adelante, instale las dependencias ejecutando el comando `yarn install`. En caso de que su equipo no reconozca el comando `yarn`, puede instalarlo con `npm install -g yarn` y luego intentar nuevamente la instalación de las dependencias del proyecto.

2. Cree un archivo en la raíz del proyecto llamado `env.local` para almacenar las variables de entorno, basándose en el archivo de ejemplo `.env.example`.

3. Finalmente, ejecute el comando `docker compose up --build`
