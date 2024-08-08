import '@babel/polyfill';
import { logout, login } from './login';
import { leaflet } from './leaflet';
import { updateUserData, updateUserPassword } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTES
const leafletMap = document.querySelector('#map');
const Loginform = document.querySelector('.form--login');
const logoutButton = document.querySelector('.nav__el--logout');
const userFormData = document.querySelector('.form-user-data');
const userFormPassword = document.querySelector('.form-user-settings');
const bookBtn = document.querySelector('#book-tour');

// DELEGATION
if (leafletMap) {
  const locationMap = JSON.parse(leafletMap.dataset.locations);
  leaflet(locationMap);
}

if (Loginform) {
  Loginform.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    login(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

if (userFormData) {
  userFormData.addEventListener('submit', async e => {
    e.preventDefault();
    const btnSaveSettings = document.querySelector('.btn--save-settings');
    btnSaveSettings.textContent = 'UPDATING...';
    // const formData = new FormData();
    // formData.append('name', document.querySelector('#name').value);
    // formData.append('email', document.querySelector('#email').value);
    // formData.append('photo', document.querySelector('#photo').files[0]);
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const photo = document.querySelector('#photo').files[0];

    await updateUserData({ name, email, photo });
    btnSaveSettings.textContent = 'Save settings';

    location.reload(true);
  });
}

if (userFormPassword) {
  userFormPassword.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'UPDATING...';
    const currentPassword = document.querySelector('#password-current').value;
    const newPassword = document.querySelector('#password').value;
    const newPasswordConfirm = document.querySelector('#password-confirm').value;

    await updateUserPassword({ currentPassword, newPassword, newPasswordConfirm });
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
