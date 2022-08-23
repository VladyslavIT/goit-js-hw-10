import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './api/fetchCountries';
import { createMarkupList, createMarkupInfo } from './markup';

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
    .then(countries => onShowInfo(countries))
    .catch(error => {
      if (error.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
};

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onShowInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1) {
    listEl.insertAdjacentHTML('afterbegin', createMarkupList(countries));
    thumbInfo.innerHTML = '';
  } else if (countries.length === 1) {  // <-- не рендерится по этому условию
    thumbInfo.innerHTML = '';    // <-- здесь убираю повторение рендера при повторном поиске 1 страны
    thumbInfo.insertAdjacentHTML('afterbegin', createMarkupInfo(countries));
    listEl.innerHTML = '';    // <-- здесь убираю список стран, когда показывается 1 страна
  }
}
