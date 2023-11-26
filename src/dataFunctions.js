//Unicamente se hará uso de funciones puras

//La función searchByName genera un nuevo array de películas, filtrando la información según el nombre proporcionado.
//Esto se logra a través de tres parámetros de entrada(data, searchBy e input).
export const searchByName = (data, searchBy, input) => {
  if (searchBy === "input") {
    const filteredDataByName = data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    return filteredDataByName;
  }
};

//La función filterByGenre devuelve un nuevo arreglo que consiste en las películas que cumplen con los criterios de filtrado por genero.
//Esto se logra a través de tres parámetros de entrada (data, filterBy y value).
export const filterByGenre = (data, filterBy, value) => {
  return data.filter((item) => item.facts[filterBy].includes(value));
};

//La función filterByStudio devuelve un nuevo arreglo que consiste en las películas que cumplen con los criterios de filtrado por estudio.
//Esto se logra a través de tres parámetros de entrada (data, filterBy y value).
export const filterByStudio = (data, filterBy, value) => {
  return data.filter((item) => item.facts[filterBy].includes(value));
};

//La función filterByYear devuelve un nuevo arreglo que consiste en las películas que cumplen con los criterios de filtrado por año.
//Esto se logra a través de tres parámetros de entrada (data, filterBy y value).
export const filterByYear = (data, filterBy, value) => {
  if (data && !isNaN(value)) {
    return data.filter((item) => item.facts[filterBy] === Number(value));
  }
};

//La función sortData devuelve un nuevo arreglo que consiste en las películas ordenadas según los criterios especificados de filtrado por un campo determinado (sortBy) y en un orden particular (sortOrder).
//Esto se logra a través de tres parámetros de entrada (data, sortBy, sortOrder).
export const sortData = (data, sortBy, sortOrder) => {
  const copyData = [...data];
  copyData.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (valueA === valueB) {
      return 0;
    }

    if (sortOrder === "asc") {
      if (valueA < valueB) {
        return -1;
      }
      return 1;
    }

    if (sortOrder === "desc") {
      if (valueB < valueA) {
        return -1;
      }
      return 1;
    }
  });

  return copyData;
};

//La función totalMetrics calcula el número de películas que cumplen con la condición de tener studio: "Studio Ghibli" y, además, cuentan con el género "Fantasía" en la propiedad genre
//(con metodo map y template strings)
export const totalMetrics = (data) => {
  //La variable countStudioGhibli utiliza el método reduce para calcular el número de películas que cumplen con la condición de tener el estudio "Studio Ghibli".
  const countStudioGhibli = data.reduce((accumulator, element) => {
    if (element.facts.studio.includes("Studio Ghibli")) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);

  //La variable countFantasy utiliza el método reduce para calcular el número de películas que cumplen con la condición de tener el género "Fantasía"
  const countFantasy = data.reduce((accumulator, element) => {
    if (element.facts.genre.includes("Fantasía")) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);

  const metricsCount = [countStudioGhibli, countFantasy];
  const metricsMap = metricsCount.map((x) => x);
  return `Studio Ghibli nos deslumbra con la mayor cantidad de películas en nuestra estadística: ¡un impresionante total de ${metricsMap[0]}! Y no es todo, ¡${metricsMap[1]} de ellas te llevan a mundos de fantasía!`;
};

//La función computeStats toma un parámetro (data), calcula y devuelve la cantidad de películas en tiempo real a partir del array de datos proporcionado.
export const computeStats = (data) => {
  const numberOfElements = data.reduce((accumulator) => accumulator + 1, 0);
  return numberOfElements;
};
