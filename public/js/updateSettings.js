import { showAlert } from './alerts';

export const updateUserData = async userData => {
  const dt = { ...userData };
  try {
    let form = new FormData();
    form.append('name', dt.name);
    form.append('email', dt.email);
    form.append('photo', dt.photo);

    const response = await fetch('/api/v1/users/updateMe', {
      method: 'PATCH',
      /*  headers: {
        'Content-Type': 'application/json',
      }, */
      //body: JSON.stringify(form),
      body: form,
    });
    const data = await response.json();

    if (data.status === 'success') {
      showAlert('success', 'Your data was successfully updated!');
    } else {
      showAlert('error', data.message);
    }
  } catch (err) {
    showAlert('error', 'It was not possible update the data. Try agan later!');
    console.log(err);
  }
};

export const updateUserPassword = async passwords => {
  try {
    const response = await fetch('/api/v1/users/updateMyPassword', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: passwords.currentPassword,
        password: passwords.newPassword,
        passwordConfirm: passwords.newPasswordConfirm,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 'success') {
      showAlert('success', 'Your password was successfully updated!');
    } else {
      showAlert('error', data.message);
    }
  } catch (err) {
    showAlert('error', err);
  }
};
