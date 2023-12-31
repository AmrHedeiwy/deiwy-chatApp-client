import { requestToServer } from '../requests/auth.request.js';

export async function registerHandler(e) {
  e.preventDefault();

  const formElements = {
    registerFirstname: '',
    registerLastname: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerRepeatPassword: '',
    registerCheck: false
  };

  document.querySelectorAll('input').forEach((input) => {
    if (input.id in formElements) {
      if (input.type === 'checkbox') {
        formElements[input.id] = input.checked;
      } else {
        formElements[input.id] = input.value;
      }
    }
  });

  const body = {
    Firstname: formElements.registerFirstname,
    Lastname: formElements.registerLastname,
    Username: formElements.registerUsername,
    Email: formElements.registerEmail,
    Password: formElements.registerPassword,
    RepeatPassword: formElements.registerRepeatPassword
  };

  const response = await requestToServer('/auth/register', 'POST', body);
  console.log(response);
}
