# SuperFlights - Microservices Architecture

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 📋 Descripción

SuperFlights es una arquitectura de microservicios construida con NestJS y MongoDB para la gestión de vuelos, pasajeros y usuarios. El proyecto implementa un patrón de API Gateway con múltiples microservicios especializados.

## 🏗️ Arquitectura

El proyecto está compuesto por los siguientes microservicios:

- **API Gateway** (`superFlights-apiGateway`): Punto de entrada principal que maneja la autenticación y enruta las peticiones a los microservicios correspondientes.
- **Microservice Users** (`superFlights-microserviceUsers`): Gestión de usuarios y autenticación.
- **Microservice Flights** (`superFlights-microserviceFlights`): Gestión de vuelos y rutas.
- **Microservice Passengers** (`superFlights-microservicePassengers`): Gestión de pasajeros y reservas.

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Base de datos**: MongoDB
- **Message Broker**: RabbitMQ
- **Autenticación**: JWT
- **Containerización**: Docker
- **Orquestación**: Docker Compose

## 📦 Estructura del Proyecto

```
microservice-superflights/
├── superFlights-apiGateway/          # API Gateway
├── superFlights-microserviceUsers/   # Microservicio de usuarios
├── superFlights-microserviceFlights/ # Microservicio de vuelos
├── superFlights-microservicePassengers/ # Microservicio de pasajeros
├── docker-compose.yml               # Configuración Docker para desarrollo
├── docker-compose.prod.yml          # Configuración Docker para producción
└── .env                            # Variables de entorno
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v16 o superior)
- pnpm
- Docker y Docker Compose
- MongoDB (si se ejecuta localmente)

### Configuración del entorno

1. Clona el repositorio:
```bash
git clone <repository-url>
cd microservice-superflights
```

2. Configura las variables de entorno:
```bash
cp .env.example .env
# Edita el archivo .env con tus configuraciones
```

3. Instala las dependencias en cada microservicio:
```bash
# API Gateway
cd superFlights-apiGateway
pnpm install

# Microservicio de usuarios
cd ../superFlights-microserviceUsers
pnpm install

# Microservicio de vuelos
cd ../superFlights-microserviceFlights
pnpm install

# Microservicio de pasajeros
cd ../superFlights-microservicePassengers
pnpm install
```

## 🐳 Ejecución con Docker

### Desarrollo
```bash
docker-compose up --build
```

### Producción
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🔧 Ejecución Local

### Iniciar servicios individuales

1. **API Gateway**:
```bash
cd superFlights-apiGateway
pnpm run start:dev
```

2. **Microservicio de usuarios**:
```bash
cd superFlights-microserviceUsers
pnpm run start:dev
```

3. **Microservicio de vuelos**:
```bash
cd superFlights-microserviceFlights
pnpm run start:dev
```

4. **Microservicio de pasajeros**:
```bash
cd superFlights-microservicePassengers
pnpm run start:dev
```

## 🧪 Testing

Ejecutar tests en cada microservicio:

```bash
# Tests unitarios
pnpm run test

# Tests e2e
pnpm run test:e2e

# Coverage
pnpm run test:cov
```

## 📡 API Endpoints

### API Gateway (Puerto 3000)

- **Authentication**
  - `POST /api/v1/auth/signin` - Iniciar sesión
  - `POST /api/v1/auth/signup` - Registrar usuario

- **Users**
  - `GET /api/v1/user` - Obtener usuarios
  - `POST /api/v1/user` - Crear usuario
  - `GET /api/v1/user/:id` - Obtener usuario por ID
  - `PUT /api/v1/user/:id` - Actualizar usuario
  - `DELETE /api/v1/user/:id` - Eliminar usuario

- **Flights**
  - `GET /api/v1/flight` - Obtener vuelos
  - `POST /api/v1/flight` - Crear vuelo
  - `GET /api/v1/flight/:id` - Obtener vuelo por ID
  - `PUT /api/v1/flight/:id` - Actualizar vuelo
  - `DELETE /api/v1/flight/:id` - Eliminar vuelo

- **Passengers**
  - `GET /api/v1/passenger` - Obtener pasajeros
  - `POST /api/v1/passenger` - Crear pasajero
  - `GET /api/v1/passenger/:id` - Obtener pasajero por ID
  - `PUT /api/v1/passenger/:id` - Actualizar pasajero
  - `DELETE /api/v1/passenger/:id` - Eliminar pasajero

## 🔐 Autenticación

El sistema utiliza JWT para la autenticación. El token debe incluirse en el header Authorization:

```
Authorization: Bearer <token>
```

## 📊 Monitoreo

- Los logs se centralizan a través del API Gateway
- Cada microservicio expone métricas de salud en `/health`
- RabbitMQ maneja la comunicación asíncrona entre servicios

## 🛡️ Seguridad

- Autenticación JWT
- Validación de datos con class-validator
- Filtros de excepciones globales
- Guards de autenticación y autorización

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- Tu nombre - [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- [NestJS](https://nestjs.com/) - Framework para Node.js
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker
- [Docker](https://www.docker.com/) - Containerización
