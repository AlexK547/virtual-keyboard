import {
  keys1, keys2, keys3, keys4, keys5,
} from './keys.js';

export function keyboard() {
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
    lineKeys.append(key);
  }

  return lineKeys;
}
