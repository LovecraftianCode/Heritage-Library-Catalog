# Heritage Library Catalog

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Un sistema completo para gestionar y analizar un catálogo de libros, desarrollado como parte de un taller práctico de JavaScript. El programa procesa datos desde strings crudos, los organiza por décadas, valida la información y exporta a múltiples formatos.

## Tabla de Contenidos
- [Características](#características)
- [Demostración](#demostración)
- [Instalación y uso](#instalación-y-uso)
- [Funciones principales](#funciones-principales)
- [Ejemplos de salida](#ejemplos-de-salida)
- [Lo que aprendí](#lo-que-aprendí)
- [Contribuciones](#contribuciones)

## Características

- **Parseo de datos** - Convierte strings con formato `"Título | Autor | Año | Ubicación"` a objetos estructurados
- **Búsqueda por autor** - Encuentra libros incluso con coincidencias parciales (case-insensitive)
- **Agrupación por décadas** - Organiza automáticamente los libros en grupos como "1970s", "1980s", etc.
- **Validación de datos** - Verifica campos requeridos y maneja valores "Unknown"
- **Exportación múltiple** - Soporta formatos JSON y CSV
- **Estadísticas** - Muestra total de libros, rango de años y distribución por década
- **Formato visual** - Presenta los libros con un formato legible y amigable

## Demostración

### Entrada de ejemplo:
"From a Buick 8 | King, Stephen | 2002 | Shelf K7"

### Salida formateada:
<img width="326" height="173" alt="img4" src="https://github.com/user-attachments/assets/3c26a91f-ae53-46e6-8bad-da3d89832f68" />

### Exportación CSV:

<img width="850" height="554" alt="img3" src="https://github.com/user-attachments/assets/117fb0ab-4c7b-42e5-90c6-6154c5801012" />

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/heritage-library-catalog.git

# Entrar al directorio
cd heritage-library-catalog

# Ejecutar el programa
node heritage-library-catalog.js
```

## Funciones principales 

```javascript
// Parsear catálogo desde datos crudos
const catalog = parseCatalog(rawCatalogCards);

// Buscar libros por autor
const kingBooks = findByAuthor(catalog, "King");

// Agrupar por décadas
const byDecade = groupByDecade(catalog);

// Exportar a CSV
const csvData = exportToCSV(catalog);

// Exportar a JSON
const jsonData = exportToJSON(catalog);

// Validar una entrada
const isValid = validateEntry(catalog[0]);
```

## Ejemplos de salida

<img width="610" height="173" alt="img2" src="https://github.com/user-attachments/assets/33ed6394-5a52-4265-bde5-73b9c9b58e0c" />

<img width="282" height="268" alt="img1" src="https://github.com/user-attachments/assets/6f8d59f2-755a-42d6-aa43-9542336a7678" />

## Lo que aprendí

Este proyecto me ayudó a practicar:

- Manipulación de strings con split(), trim()
- Uso de arrays y objetos en JavaScript
- Funciones puras y modularidad
- Manejo de casos borde (datos faltantes o "Unknown")
- Formatos de datos: JSON y CSV
- Buenas prácticas de código y comentarios

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un bug o tienes una sugerencia:

- Fork el proyecto
- Crea tu rama (git checkout -b feature/nueva-funcionalidad)
- Commit tus cambios (git commit -m 'Añade nueva funcionalidad')
- Push a la rama (git push origin feature/nueva-funcionalidad)
- Abre un Pull Request

