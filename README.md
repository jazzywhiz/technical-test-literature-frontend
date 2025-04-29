# Literature App

Una aplicación moderna en React para gestionar libros y autores con una interfaz limpia e intuitiva construida con React, TypeScript y Tailwind CSS.

![React](https://img.shields.io/badge/React-18.0.0-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-06B6D4)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF)

## 🔍 Descripción del proyecto

Literature App es una aplicación frontend que se conecta a una API Literature para gestionar información sobre libros y autores. El proyecto sigue las prácticas modernas de React y tiene una estructura modular con una clara separación de responsabilidades:

- **Components**: Elementos de UI reutilizables organizados por dominio
- **Pages**: Vistas principales de la aplicación con soporte para enrutamiento
- **Hooks**: Hooks personalizados de React para obtención de datos y gestión de estado
- **API**: Módulos de servicio para comunicarse con el backend
- **Types**: Interfaces TypeScript y definiciones de tipos

## ⚙️ Tecnologías principales

- **React 18**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Verificación de tipos estáticos para JavaScript
- **Tailwind CSS**: Framework CSS basado en utilidades
- **React Query**: Obtención de datos y gestión de estado
- **React Router**: Enrutamiento declarativo para React
- **Vite**: Herramientas modernas de frontend para desarrollo rápido

## 📋 Requisitos previos

- Node.js 18+
- npm o pnpm
- Git
- Conexión a Internet para comunicación con la API

## 🚀 Instalación y configuración

### Opción 1: Clonar con Git estándar

```bash
# Clonar el repositorio
git clone https://github.com/jazzywhiz/technical-test-literature-frontend.git

# Navegar al directorio
cd technical-test-literature-frontend

# Instalar dependencias (con npm)
npm install

# O con pnpm
pnpm install

# Iniciar el servidor de desarrollo
npm run dev
# O con pnpm
pnpm dev
```

### Opción 2: Usando GitHub Desktop

1. Abrir GitHub Desktop
2. Hacer clic en "Clonar un Repositorio"
3. Introducir la URL del repositorio: `https://github.com/jazzywhiz/technical-test-literature-frontend.git`
4. Elegir la carpeta de destino y hacer clic en "Clonar"
5. Abrir el proyecto en tu editor de código preferido
6. Ejecutar `npm install` o `pnpm install` para instalar dependencias
7. Iniciar el servidor de desarrollo con `npm run dev` o `pnpm dev`

## ⚡ Ejecución del proyecto

### Modo desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev
# O con pnpm
pnpm dev
```

Esto iniciará la aplicación en modo desarrollo con recarga en caliente en `http://localhost:5173/`

### Build de producción

```bash
# Crear un build de producción
npm run build
# O con pnpm
pnpm build

# Previsualizar el build de producción localmente
npm run preview
# O con pnpm
pnpm preview
```

## 🏗️ Arquitectura y estructura del proyecto

```
literature-app/
├── node_modules/                 # Dependencias
├── public/                       # Archivos estáticos
├── src/                          # Código fuente
│   ├── api/                      # Módulos de servicio API
│   │   ├── authors.ts            # Cliente API de autores
│   │   ├── books.ts              # Cliente API de libros
│   │   └── client.ts             # Configuración base del cliente API
│   │
│   ├── components/               # Componentes reutilizables
│   │   ├── authors/              # Componentes relacionados con autores
│   │   │   ├── AuthorCard.tsx    # Componente de tarjeta de autor
│   │   │   ├── AuthorFormModal.tsx # Modal de formulario de autor
│   │   │   ├── AuthorList.tsx    # Componente de lista de autores
│   │   │   ├── AuthorSkeleton.tsx # Skeleton de carga
│   │   │   ├── AuthorSummary.tsx # Estadísticas de autores
│   │   │   └── related/          # Relaciones de autores
│   │   │       └── RelatedAuthorBooks.tsx # Libros por autor
│   │   │
│   │   ├── books/                # Componentes relacionados con libros
│   │   │   ├── BookCard.tsx      # Componente de tarjeta de libro
│   │   │   ├── BookFormModal.tsx # Modal de formulario de libro
│   │   │   ├── BookGrid.tsx      # Componente de cuadrícula de libros
│   │   │   ├── BookSkeleton.tsx  # Skeleton de carga
│   │   │   └── related/          # Relaciones de libros
│   │   │       └── RelatedAuthorBooks.tsx # Autores de libro
│   │   │
│   │   └── shared/               # Componentes compartidos
│   │       ├── EmptyState.tsx    # Componente de estado vacío
│   │       ├── Loading.tsx       # Indicador de carga
│   │       └── PageHeader.tsx    # Componente de encabezado de página
│   │
│   ├── hooks/                    # Hooks personalizados
│   │   ├── useAuthors.ts         # Hooks de datos de autores
│   │   └── useBooks.ts           # Hooks de datos de libros
│   │
│   ├── pages/                    # Páginas principales de la aplicación
│   │   ├── AuthorDetailsPage.tsx # Página de detalles de autor
│   │   ├── AuthorsPage.tsx       # Página de listado de autores
│   │   ├── BookDetailsPage.tsx   # Página de detalles de libro
│   │   ├── BooksPage.tsx         # Página de listado de libros
│   │   └── NotFoundPage.tsx      # Página 404
│   │
│   ├── types/                    # Definiciones de TypeScript
│   │   └── index.ts              # Tipos comunes
│   │
│   ├── utils/                    # Funciones utilitarias
│   │   └── formatters.ts         # Utilidades de formato de datos
│   │
│   ├── App.tsx                   # Componente principal de la aplicación
│   ├── index.css                 # Estilos globales
│   ├── main.tsx                  # Punto de entrada de la aplicación
│   └── vite-env.d.ts             # Tipos de entorno de Vite
│
├── .env                          # Variables de entorno
├── .env.example                  # Ejemplo de variables de entorno
├── .gitignore                    # Archivo de ignorar Git
├── eslint.config.js              # Configuración de ESLint
├── index.html                    # Punto de entrada HTML
├── package.json                  # Dependencias y scripts del proyecto
├── postcss.config.js             # Configuración de PostCSS
├── tailwind.config.js            # Configuración de Tailwind CSS
├── tsconfig.json                 # Configuración de TypeScript
└── vite.config.ts                # Configuración de Vite
```

## 🔄 Funcionalidades

### Gestión de Libros

- Ver todos los libros en una disposición de cuadrícula
- Ver información detallada de cada libro
- Crear, editar y eliminar libros
- Ver autores asociados con libros

### Gestión de Autores

- Ver todos los autores en una lista
- Ver información detallada de cada autor
- Crear, editar y eliminar autores
- Ver libros asociados con autores
- Ver estadísticas y métricas de autores

### Relaciones

- Ver qué autores escribieron un libro específico
- Ver qué libros fueron escritos por un autor específico
- Comprobar cuántos libros ha escrito cada autor
- Ver relaciones de coautoría

## ⚠️ Solución de problemas comunes

### Problemas de conexión con la API

Si experimentas problemas al conectarte con la API:

1. Verifica la URL de la API en el archivo `.env`
2. Comprueba si el servidor de la API está en funcionamiento
3. Asegúrate de que tu red permite conexiones al endpoint de la API

### Problemas de renderizado de la UI

Si los componentes no se renderizan correctamente:

1. Limpia la caché de tu navegador
2. Verifica que todas las dependencias estén instaladas correctamente
3. Revisa la consola en busca de errores de JavaScript

## 🔧 Configuración avanzada

### Variables de entorno

La aplicación utiliza variables de entorno para la configuración, que se almacenan en archivos `.env`:

```
# Ejemplo de .env
VITE_API_URL=http://localhost:5000/api
```

Para personalizar la URL de la API, crea o modifica el archivo `.env` en la raíz del proyecto.

### URL base de la API

La URL base de la API se configura en el archivo `.env`. Puedes cambiarla para apuntar a tu propio backend:

```
VITE_API_URL=https://tu-url-api.com/api
```

## 📄 Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).
