import { searchByName } from "./dataFunctions.js";
import {
  filterByGenre,
  filterByStudio,
  filterByYear,
  computeStats,
  totalMetrics,
} from "./dataFunctions.js";
import { sortData } from "./dataFunctions.js";
import { renderItems } from "./view.js";
import data from "./data/dataset.js";

//Declaración de variables
let cumulativeFilter = data;
const computeStatsContainer = document.querySelector(".compute-stats");

//Filtro de búsqueda por nombre de película según el texto ingresado
const searchInput = document.querySelector("#inputFilter");
const noResultsFoundContainer = document.querySelector("#noResultsFound");

searchInput.addEventListener("input", () => {
  const inputSearchValue = searchInput.value.toLowerCase();
  const filteredDataByName = searchByName(data, "input", inputSearchValue);
  
  if (filteredDataByName === "") {
    noResultsFoundContainer.textContent = "";
  } else if (filteredDataByName.length === 0) {
    noResultsFoundContainer.textContent =
      "Lo sentimos, no se encontraron resultados que coincidan con la búsqueda.";
  }
  cardsContainer.innerHTML = renderItems(
    filteredDataByName,
    noResultsFoundContainer
  );
  computeStatsContainer.innerHTML =
  `Total de películas: ${computeStats(filteredDataByName)}`;

  selectGenre.value = "";
  selectStudio.value = "";
  selectYear.value = "";
});

//Filtro por genero
const selectGenre = document.querySelector('[name="genre"]');
selectGenre.addEventListener("change", (e) => {
  const genreSelected = e.target.value;
  cumulativeFilter = filterByGenre(data, "genre", genreSelected);
  cardsContainer.innerHTML = renderItems(cumulativeFilter);
  computeStatsContainer.innerHTML =
    "Total de películas: " + computeStats(cumulativeFilter);
  selectStudio.value = "";
  selectYear.value = "";
});

//Filtro por estudio
const selectStudio = document.querySelector('[name="studio"]');
selectStudio.addEventListener("change", (e) => {
  const studioSelected = e.target.value;
  cumulativeFilter = filterByStudio(data, "studio", studioSelected);
  cardsContainer.innerHTML = renderItems(cumulativeFilter);
  computeStatsContainer.innerHTML =
    "Total de películas: " + computeStats(cumulativeFilter);
  selectGenre.value = "";
  selectYear.value = "";
});

//Filtro por año
const selectYear = document.querySelector('[name="year"]');
selectYear.addEventListener("change", (e) => {
  const yearSelected = e.target.value;
  cumulativeFilter = filterByYear(data, "year", yearSelected);
  cardsContainer.innerHTML = renderItems(cumulativeFilter);
  computeStatsContainer.innerHTML =
    "Total de películas: " + computeStats(cumulativeFilter);
  selectGenre.value = "";
  selectStudio.value = "";
});

//Ordenamiento ascendente y descendente
const orderSelect = document.querySelector('[name="name"]');
orderSelect.addEventListener("change", (e) => {
  const selectedOrder = e.target.value;
  cumulativeFilter = sortData(data, "name", selectedOrder);
  cardsContainer.innerHTML = renderItems(cumulativeFilter);
  computeStatsContainer.innerHTML =
    "Total de películas: " + computeStats(cumulativeFilter);
});

//Botón limpiar: Restablece los valores de los selectores, el campo de búsqueda y los contenedores relacionados con la búsqueda
const clearButton = document.getElementById("button");
clearButton.addEventListener("click", function () {
  const filterSelectors = document.querySelectorAll("select");
  const searchInputField = document.querySelector('[name="searchButton"]');
  filterSelectors.forEach((selector) => {
    selector.value = selector.options[0].value;
    searchInputField.value = "";
    noResultsFoundContainer.innerHTML = "";
    cumulativeFilter = data;
    cardsContainer.innerHTML = renderItems(cumulativeFilter);
    computeStatsContainer.innerHTML =
      "Total de películas: " + computeStats(cumulativeFilter);
  });
});

//Estadística: Dinámicamente modifica el contenido HTML de un elemento computeStatsContainer para mostrar el número total de películas calculado por la función computeStats
computeStatsContainer.innerHTML =
  "Total de películas: " + computeStats(cumulativeFilter);

//Estadística: Estudio con mayor cantidad de películas y el género que sobresale notablemente
const metricsContainer = document.querySelector(".metrics");
const totalMetricsElement = document.createElement("p");
totalMetricsElement.textContent = totalMetrics(data);
metricsContainer.appendChild(totalMetricsElement);

//Actualiza dinámicamente el contenido del contenedor #root en HTML con las tarjetas generadas por la función renderItems  basándose en el filtro acumulado (cumulativeFilter).
const cardsContainer = document.querySelector("#root");
cardsContainer.innerHTML = renderItems(cumulativeFilter);
