import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const thumbInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const onSearchCountry = (event) => {
    const name = event.target.value.trim();
    console.log(name);
    fetchCountries(name).then(data => onShowInfo(data));
}

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onShowInfo(countries) {
    clearInput();

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    } else if (countries.length > 1) {
        createMarkupList(countries);
    } else if (countries.length === 1) {
        createMarkupInfo(countries[0]);
    } else {
        Notiflix.Notify.failure('Oops, there is no country with that name')
    }
};

function createMarkupList(countries) {
    console.log(countries);

    const markupList = countries.map(country => `<li class = country-list_item>
          <img class = country-list_photo src="${country.flags.svg}" width = 60 alt="${country.name.official}">
          <h2 class = country-list_text >${country.name.official}</h2>
      </li>`).join(''); 
    listEl.insertAdjacentHTML('beforeend', markupList); 

    const markupInfo = countries.map(country => createMarkupInfo(country));
    // console.log(markupInfo[0]);
    thumbInfo.insertAdjacentHTML('beforeend', markupInfo[0]);
};

function createMarkupInfo({name, capital, population, languages: {languages}, flags}) {
    return ` <div class="inner"><img src="${flags.svg}"width = 60 alt="${name.official}">
          <h2 class = country-info_title>${name.official}</h2></div>
          <p class = country-info_text><span class = country-info_label>Capital:</span>${capital}</p>
          <p class = country-info_text><span class = country-info_label>Population:</span>${population}</p>
          <p class = country-info_text><span class = country-info_label>Languages:</span>${languages}</p>`
};

function clearInput() {
    listEl.innerHTML = '';
    thumbInfo.innerHTML = '';
};

