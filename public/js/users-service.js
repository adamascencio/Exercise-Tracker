import { addToken, getToken } from "./manageTokens.js";

const h2 = document.querySelector("h2");
const form = document.querySelector("form");
const submitButton = form.querySelector("input[type='submit']");
const toggleButton = document.getElementById("toggleButton");
let isLogin = false;

form.action = '/api/users'

document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  if (!token) return 
  window.location.href=`/home?token=${localStorage.getItem('token')}`
});

const sendRequest = async (url, payload = null, method = 'POST') => {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json'};
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}

const navToHomepage = data => {
  if (data.token) {
    addToken(data.token);
    window.location.href = `/home?token=${data.token}`;
  }
}

toggleButton.addEventListener('click', () => {
  isLogin = !isLogin;

  if (isLogin) {
    h2.textContent = 'Login';
    form.action = '/api/users/login';
    submitButton.value = 'Login';
    toggleButton.textContent = 'Sign up';
  } else {
    h2.textContent = 'Create User';
    form.action = '/api/users';
    submitButton.value = 'Create Account';
    toggleButton.textContent = 'Sign in';
  }
});

form.addEventListener('submit', evt => {
  evt.preventDefault();
  try {
    const payload = {
      username: evt.target[0].value,
      password: evt.target[1].value
    }
    sendRequest(form.action, payload)
      .then(data => {
        navToHomepage(data);
      })
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }
});