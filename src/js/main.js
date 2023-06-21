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
