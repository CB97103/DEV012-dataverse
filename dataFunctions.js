//Unicamente se hará uso de funciones puras

// una función filterBy que tiene 3 parámetros (data, filterBy, value) y devuelve el arreglo filtrado
export const searchByName = (data, searchBy, input) => {
  if (searchBy === "input") {
    const filteredDataByName = data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    return filteredDataByName;
  }
};

// una función filterBy que tiene 3 parámetros (data, filterBy, value) y devuelve el arreglo filtrado
export const filterByGenre = (data, filterBy, value) => {
  return data.filter((item) => item.facts[filterBy].includes(value));
};

export const filterByStudio = (data, filterBy, value) => {
  return data.filter((item) => item.facts[filterBy].includes(value));
};

export const filterByYear = (data, filterBy, value) => {
  if (data && !isNaN(value)) {
    return data.filter((item) => item.facts[filterBy] === Number(value));
  }
};

//una función sortBy que tiene 3 parámetros (data, sortBy, sortOrder) y devuelve el arreglo ordenado
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

//una función computeStats que tiene al menos un parámetro (data) y devuelve un valor computado
export const computeStats = (data) => {
  const longitud = data.reduce((acumulador) => acumulador + 1, 0);
  return longitud;
};

// metricas (con metodo map y template strings)
export const metricasTotales = (data) => {
  const cantidadStudioGhibli = data.reduce((acc, el) => {
    if (el.facts.studio.includes("Studio Ghibli")) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const cantidadFantasia = data.reduce((acc, el) => {
    if (el.facts.genre.includes("Fantasía")) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const metricasCantidad = [cantidadStudioGhibli, cantidadFantasia];

  const metricasMap = metricasCantidad.map((x) => x);

  return `· Studio Ghibli nos deslumbra con la mayor cantidad de películas en nuestra estadística: ¡un impresionante total de ${metricasMap[0]}! Y no es todo, ¡${metricasMap[1]} de ellas te llevan a mundos de fantasía! ·`;
};
