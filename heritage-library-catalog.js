const rawCatalogCards = [
  "From a Buick 8 | King, Stephen | 2002 | Shelf K7",
  "The Shining | King, Stephen | 1977 | Shelf K1",
  "The Stand | King, Stephen | 1978 | Shelf K2",
  "It | King, Stephen | 1986 | Shelf K3",
  "Misery | King, Stephen | 1987 | Shelf K4",
  "Do Androids Dream of Electric Sheep? | Dick, Philip K. | 1968 | Shelf D5",
  "I, Robot | Asimov, Isaac | 1950 | Shelf A8",
  "Foundation | Asimov, Isaac | 1951 | Shelf A9",
  "Dune | Herbert, Frank | 1965 | Shelf H3",
  "Neuromancer | Gibson, William | 1984 | Shelf G8",
  "Snow Crash | Stephenson, Neal | 1992 | Shelf S6",
  "The Martian | Weir, Andy | 2011 | Shelf W5",
  "Ender's Game | Card, Orson Scott | 1985 | Shelf C2",
  "The Hitchhiker's Guide to the Galaxy | Adams, Douglas | 1979 | Shelf A1",
  "Ready Player One | Cline, Ernest | 2011 | Shelf C7",
  "The Dark Tower: The Gunslinger | King, Stephen | 1982 | Shelf K5",
  // edge cases: missing data
  "Unknown Title |  | 1975 | Shelf X1",
  "Mysterious Manuscript | Unknown Author |  | Shelf Z9",
  "Ancient Scroll | Anonymous | 850 | ",
];



function parseCard(rawString) {
  const parts = rawString.split("|");// Con el metodo split() tomara todo el testo hasta antes del separador "|"
  const trimmedParts = [];// Array donde se guardaran los resultados separados
  for (let i = 0; i < parts.length; i++) {
    trimmedParts.push(parts[i].trim());// Con trim se borran los espacios a la izquierda y derecha de la palabra cortada
  }
  const title = trimmedParts[0];
  const author = trimmedParts[1];
  const year = trimmedParts[2];
  const location = trimmedParts[3];
  return {
    title: title || "Unknown",//en caso de no existir title regresa Unknown
    author: author || "Unknown",//en caso de no existir author regresa Unknown
    year: year ? parseInt(year) : "Unknown",//si year existe se convierte a entero, en caso de que no exista se deja como Unknown
    location: location || "Unknown"//en caso de no existir location regresa Unknown
  };
}
//Esta funcion crea un catalogo limpio del array brindado 
function parseCatalog(rawCards) {
  const catalog = [];
  for (let i = 0; i < rawCards.length; i++) {
    catalog.push(parseCard(rawCards[i]));
  }
  return catalog;
}

const catalog = parseCatalog(rawCatalogCards);

function findByAuthor(catalog, author) {
  const searchTerm = author.toLowerCase();//Convierte el nombre brindado en minusculas para comparacion
  const results = [];
  for (let i = 0; i < catalog.length; i++) {
    if (catalog[i].author.toLowerCase().includes(searchTerm)) {//verifica si dentro de catalogo incluye el nombre del autor brindado
      results.push(catalog[i]);
    }
  }
  return results;
}

function groupByDecade(catalog) {
  const grouped = {};
  for (let i = 0; i < catalog.length; i++) {
    const book = catalog[i];
    if (book.year === "Unknown") {
      if (!grouped["Unknown"]) {
        grouped["Unknown"] = [];//se crea el array de Unknown para los libros que tengan año desconocido
      }
      grouped["Unknown"].push(book);
      continue;
    }
    const decade = Math.floor(book.year / 10) * 10;//se redondea la unidad para trabajar con decadas
    const decadeKey = `${decade}s`;//formato de salida
    if (!grouped[decadeKey]) {
      grouped[decadeKey] = [];//Se agrupan por decadas especificas
    }
    grouped[decadeKey].push(book);//Se añanade el libro a la decada correspondiente
  }
  return grouped;
}

//Brinda un formato de salida a las entradas
function renderEntry(entry) {
const title = entry.title || "Unknown"
const author = entry.author || "Unknown"
const year = entry.year || "Unknown"
const location = entry.location || "Unknown"
const margin = "=".repeat(23)

return `
  ${margin}
  Title: ${title}
  Author: ${author}
  Year: ${year}
  Location: ${location}
  ${margin}
  `
}

console.log(renderEntry(catalog[0]));

function validateEntry(entry) {
  const requiredFields = ["title", "author", "year", "location"];
  
  for (const field of requiredFields) {
    if (!entry[field] || entry[field] === "Unknown") {//Si el campo esta vacio o es undefined o es igual a Unknown la funcion devuelve false
      return false;  // Tan pronto encuentra un error, retornas false
    }
  }
  return true;
}

function exportToJSON(catalog) {
  return JSON.stringify(catalog, null, 2);// se convierte la salida a tipo json sin filtros y dos espacios de sangrado
}

//Se le brinda el formato de salida CSV a el catalogo
function exportToCSV(catalog) {
  const header = "Title,Author,Year,Location";
  const rows = [];
  for (let i = 0; i < catalog.length; i++) {
    const entry = catalog[i];
    rows.push(`"${entry.title}","${entry.author}",${entry.year},"${entry.location}"`);//Se da el formato de valores separados por coma
  }
  let csv = header;// se añade a la variable de salida el formato de fila
  for (let i = 0; i < rows.length; i++) {
    csv = csv + "\n" + rows[i];//Se conserva en el bucle el valor anterior del csv y se añaden los nuevos valores
  }
  return csv;
}

console.log(exportToCSV(catalog));

let margin2= "=".repeat(50)

function main (){
  // Crear el objeto agrupado por décadas
  const byDecade = groupByDecade(catalog);
  console.log(`\n${margin2}\nHay ${catalog.length} libros dentro del catalogo`);
  console.log(`Hay ${Object.keys(byDecade).length} CATEGORÍAS (décadas + Unknown) organizadas`);

  let oldestYear = Infinity;
  let newestYear = 0;

  for (let i = 0; i < catalog.length; i++) {
    const entry = catalog[i];
    
    if (entry.year !== "Unknown") {
      if (entry.year < oldestYear) {
        oldestYear = entry.year;
      }
      if (entry.year > newestYear) {
        newestYear = entry.year;
      }
    }
  }

  console.log(`${oldestYear} Es el año del libro mas viejo`);
  console.log(`${newestYear} Es el año del libro mas actual\n${margin2}\n`);

  // Muestra las décadas disponibles
  console.log("\nDécadas encontradas:");
  for (const decade in byDecade) {
    console.log(`  ${decade}: ${byDecade[decade].length} libros`);
  }

}

main()