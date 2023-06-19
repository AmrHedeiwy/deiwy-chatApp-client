import { registerHandler } from './event-handler/auth.js';

import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

socket.on('connect', () => {
  console.log(socket.id);
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formElements = {
    loginEmail: '',
    loginPassword: '',
    loginCheck: false
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

  console.log(
    formElements.loginEmail,
    formElements.loginPassword,
    formElements.loginCheck
  );
});

registerForm.addEventListener('submit', registerHandler);

const requestToServer = async (url, method, body) => {
  const params = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  try {
    const data = await fetch(url, params).then((response) => {
      if (response.ok) return response.json();
      throw response;
    });
    if (data.error) throw data.error;
    console.log(data);
  } catch (err) {
    const errorObject = JSON.parse(await err.text());
    const message = errorObject.message;
    const field = errorObject.field || undefined;

    // For server errors
    if (err.status === 500) {
      return console.log(message);
    }

    // For field errors
    console.log(message);
    console.log(field);
  }
};
