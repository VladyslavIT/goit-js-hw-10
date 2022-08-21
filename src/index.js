import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const thumbInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const onSearchCountry = event => {
  const name = event.target.value.trim();
  if (name === '') {
    listEl.innerHTML = '';
      thumbInfo.innerHTML = '';
      return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      onShowInfo(data);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    });
};

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onShowInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1) {
    createMarkupList(countries);
    thumbInfo.innerHTML = '';
  } else if (countries.length === 1) {
    thumbInfo.innerHTML = '';
    createMarkupList(countries);
    listEl.innerHTML = '';
  }
}

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
