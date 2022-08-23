 function createMarkupList(countries) {
    const markupList = countries
        .map(
            country => `<li class = country-list_item>
          <img class = country-list_photo src="${country.flags.svg}" width = 60 alt="${country.name.official}">
          <h2 class = country-list_text >${country.name.official}</h2>
      </li>`
        )
        .join('');

    listEl.insertAdjacentHTML('afterbegin', markupList);
}

 function createMarkupInfo(countries){
  const markupInfo = countries.map(
      country => ` <div class="inner"><img src="${
      country.flags.svg
    }"width = 60 alt="${country.name.official}">
          <h2 class = country-info_title>${country.name.official}</h2></div>
          <p class = country-info_text><span class = country-info_label>Capital:</span>${
            country.capital
          }</p>
          <p class = country-info_text><span class = country-info_label>Population:</span>${
            country.population
          }</p>
          <p class = country-info_text><span class = country-info_label>Languages:</span>${Object.values(
            country.languages
          )}</p>`
  );
  thumbInfo.insertAdjacentHTML('afterbegin', markupInfo);
}

export { createMarkupList, createMarkupInfo };