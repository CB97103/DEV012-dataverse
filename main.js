import { searchByName } from "./dataFunctions.js";
import { filterByGenre, filterByStudio, filterByYear, computeStats, metricasTotales } from "./dataFunctions.js";
import { sortData } from "./dataFunctions.js";
import { renderItems } from "./view.js";
import data from "./data/dataset.js";

//------------------------Data(Conteo de peliculas)-----------------------
let filtroAcumulativo = data;
const pcomputeStats = document.querySelector(".compute-stats");
pcomputeStats.innerHTML="Total de películas: " + computeStats(filtroAcumulativo);

//------------------------Metricas(enconstruccion)-----------------------

const pmetricas = document.querySelector(".metricas");
const totalesMetricas = document.createElement("p")
totalesMetricas.textContent = metricasTotales(data);
pmetricas.appendChild(totalesMetricas);

//------------------------Invocar  el container-----------------------
const cardsContainer = document.querySelector("#root");
cardsContainer.innerHTML = renderItems(filtroAcumulativo);

//------------------------Filtro de busqueda por input-----------------
const inputSearch = document.querySelector("#inputFilter");
const noResultsFound = document.querySelector("#noResultsFound");
inputSearch.addEventListener("input", () => {
  const inputValue = inputSearch.value.toLowerCase();
  const filteredDataByName = searchByName(filtroAcumulativo, "input", inputValue);
  if (filteredDataByName.length === 0) {
    noResultsFound.textContent =
      "Lo sentimos, no se encontraron resultados que coincidan con la búsqueda.";
  } 
  cardsContainer.innerHTML = renderItems(filteredDataByName, noResultsFound);
  pcomputeStats.innerHTML="Total de películas: " + computeStats(filteredDataByName);
});

//------------------------Filtro por año-----------------------------
const selectYear = document.querySelector('[name="year"]');
selectYear.addEventListener("change", (e) => {
  const yearSelected = e.target.value;
  filtroAcumulativo = filterByYear(filtroAcumulativo, "year", yearSelected);
  cardsContainer.innerHTML = renderItems(filtroAcumulativo);
  pcomputeStats.innerHTML="Total de películas: " + computeStats(filtroAcumulativo);
});

//------------------------Filtro por genero---------------------------
const selectGenre = document.querySelector('[name="genre"]');
selectGenre.addEventListener("change", (e) => {
  const genreSelected = e.target.value;
  filtroAcumulativo = filterByGenre(filtroAcumulativo, "genre", genreSelected);
  cardsContainer.innerHTML = renderItems(filtroAcumulativo);
  pcomputeStats.innerHTML="Total de películas: " + computeStats(filtroAcumulativo);
});

//------------------------Filtro por studio------------------------
const selectStudio = document.querySelector('[name="studio"]');
selectStudio.addEventListener("change", (e) => {
  const studioSelected = e.target.value;
  filtroAcumulativo = filterByStudio(filtroAcumulativo, "studio", studioSelected);
  cardsContainer.innerHTML = renderItems(filtroAcumulativo);
  pcomputeStats.innerHTML="Total de películas: " + computeStats(filtroAcumulativo);
});



//------------------------ascendente y descendente----------------------------- 
const selectOrder = document.querySelector('[name="name"]');
selectOrder.addEventListener("change", (e) => {
  const orderSelected = e.target.value;
  filtroAcumulativo = sortData(filtroAcumulativo, "name", orderSelected);
  cardsContainer.innerHTML = renderItems(filtroAcumulativo);
  pcomputeStats.innerHTML="Total de películas: " + computeStats(filtroAcumulativo);
});

//------------------------Boton limpiar-----------------------------
const clearButton = document.getElementById("button");
clearButton.addEventListener("click", function () {
  const selectores = document.querySelectorAll("select");
  const searchInput = document.querySelector('[name="searchButton"]');
  selectores.forEach((selector) => {
    selector.value = selector.options[0].value;
    searchInput.value = "";
    noResultsFound.innerHTML = "";
    filtroAcumulativo = data;
    cardsContainer.innerHTML = renderItems(filtroAcumulativo);
    pcomputeStats.innerHTML = "Total de películas: " + computeStats(filtroAcumulativo);
  });

});

