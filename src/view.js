export const renderItems = (data) => {
  console.log(data);
  // Aquí comienza tu código y puedes retornar lo que tu necesites
  let showInHtml = "";
  data.forEach((items) => {
    showInHtml += `

      <li class="itemContainer">
            <dl itemscope itemtype="WomenInTech">
            <img src="${items.imageUrl}" alt="" />
            <dt>Nombre:</dt><dd itemprop="name">${items.name}</dd>
            <dt>Descripción:</dt><dd itemprop="shortDescription">${items.shortDescription}</dd>
            <dt>Año:</dt><dd itemprop="shortDescription">${items.facts.year}</dd>
            <dt>Genero:</dt><dd itemprop="shortDescription">${items.facts.genre}</dd>
            <dt>Esudio de animación:</dt><dd itemprop="shortDescription">${items.facts.studio}</dd>
          </dl>
        </li>
    `;
  });

  return `<ul class="cards">${showInHtml}</ul>`;
};
