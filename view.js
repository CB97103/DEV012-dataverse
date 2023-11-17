export const renderItems = (data) => {
  let showInHtml = "";
  data.forEach((items) => {
    showInHtml += `
      <li itemscope itemtype="PeliculasAnimacionJaponesa" class="itemcontainer" data-id="${items.id}">
            <dl itemscope itemtype="PeliculasAnimacionJaponesa">
            <img src="${items.imageUrl}" alt="${items.name}"/>
            <div class="texto">
            <dt></dt><dd itemprop="studio">${items.facts.studio}</dd>
            <dt></dt><dd itemprop="name">${items.name}</dd>
            <dt></dt><dd itemprop="shortDescription">${items.shortDescription}</dd>
            <dt></dt><dd itemprop="genre">${items.facts.genre}</dd>
            <dt></dt><dd itemprop="year">${items.facts.year}</dd>
            </div>
          </dl>
        </li>
    `;
  });

  return `<ul class="cards">${showInHtml}</ul>`;
};