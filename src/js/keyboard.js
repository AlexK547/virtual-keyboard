import {
  keys1, keys2, keys3, keys4, keys5,
} from './keys.js';

function drowKeys(keys) {
  const lineKeys = document.createElement('div');
  lineKeys.classList.add('keyboard__line');

  for (let i = 0; i < keys.length; i++) {
    const key = document.createElement('div');
    key.innerHTML = keys[i].symbol;
    key.classList.add('btn');
    if (keys[i].size === 'long') {
      key.classList.add('btn__long');
    }
    if (keys[i].size === 'medium') {
      key.classList.add('btn__medium');
    }
    if (keys[i].size === 'space') {
      key.classList.add('btn__space');
    }
    if (keys[i].size === 'backspace') {
      key.classList.add('btn__backspace');
    }
    if (keys[i].code === 'CapsLock') {
      const signal = document.createElement('div');
      signal.classList.add('btn__caps-signal');
      key.append(signal);
    }
    if (keys[i].code) {
      key.setAttribute('data-code', keys[i].code);
    }
    lineKeys.append(key);
  }

  return lineKeys;
}

export default function start() {
  const main = document.createElement('main');
  main.classList.add('main');

  const title = document.createElement('h1');
  title.classList.add('main__title');
  title.innerHTML = 'Virtual keyboard';

  const textarea = document.createElement('textarea');
  textarea.classList.add('main__area');
  textarea.setAttribute('type', 'text');
  textarea.autofocus = true;

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  keyboard.append(drowKeys(keys1));
  keyboard.append(drowKeys(keys2));
  keyboard.append(drowKeys(keys3));
  keyboard.append(drowKeys(keys4));
  keyboard.append(drowKeys(keys5));

  main.appendChild(title);
  main.appendChild(textarea);
  main.append(keyboard);

  document.body.append(main);
}

document.addEventListener('keydown', (event) => {
  const button = document.querySelector(`[data-code="${event.code}"]`);
  if (!button) return;
  button.classList.add('btn_active');
  if (event.code === 'CapsLock') {
    const signal = document.querySelector('.btn__caps-signal');
    signal.classList.toggle('btn__caps-signal_active');
  }
});

document.addEventListener('keyup', (event) => {
  const button = document.querySelector(`[data-code="${event.code}"]`);
  if (!button) return;
  button.classList.remove('btn_active');
});

document.addEventListener('mousedown', (event) => {
  const attribute = event.target.getAttribute('data-code');
  const button = document.querySelector(`[data-code="${attribute}"]`);
  if (!button) return;
  button.classList.add('btn_active');
  if (attribute === 'CapsLock') {
    const signal = document.querySelector('.btn__caps-signal');
    signal.classList.toggle('btn__caps-signal_active');
  }
});

document.addEventListener('mouseup', (event) => {
  const attribute = event.target.getAttribute('data-code');
  const button = document.querySelector(`[data-code="${attribute}"]`);
  if (!button) return;
  button.classList.remove('btn_active');
});
