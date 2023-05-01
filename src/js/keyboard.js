import keys from './keys.js';

function drowKeys(keyboard, arrayKeys) {
  arrayKeys.forEach((element) => {
    const key = document.createElement('div');
    key.innerHTML = element.symbol;
    key.classList.add('btn');
    key.classList.add(element.size);

    if (element.code === 'CapsLock') {
      const signal = document.createElement('div');
      signal.classList.add('btn__caps-signal');
      key.append(signal);
    }
    if (element.code) {
      key.setAttribute('data-code', element.code);
    }
    keyboard.append(key);
  });
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

  drowKeys(keyboard, keys);

  main.appendChild(title);
  main.appendChild(textarea);
  main.append(keyboard);

  document.body.append(main);
}

function pressCaps() {
  const signal = document.querySelector('.btn__caps-signal');
  const buttons = document.querySelectorAll('.btn__small');
  const symbol = signal.classList.contains('btn__caps-signal_active') ? 'symbolShift' : 'symbol';

  buttons.forEach((element) => {
    const elem = element;
    const code = elem.getAttribute('data-code');
    keys.forEach((key) => {
      if (key.code === code) {
        elem.innerHTML = key[symbol];
      }
    });
  });
}

function pressShift(action) {
  const buttons = document.querySelectorAll('.btn__small');
  let symbol = '';
  if (action === 'down') {
    symbol = 'symbolShift';
  } else {
    symbol = 'symbol';
  }

  buttons.forEach((element) => {
    const elem = element;
    const code = elem.getAttribute('data-code');
    keys.forEach((key) => {
      if (key.code === code) {
        elem.innerHTML = key[symbol];
      }
    });
  });
}

document.addEventListener('keydown', (event) => {
  const button = document.querySelector(`[data-code="${event.code}"]`);
  const signal = document.querySelector('.btn__caps-signal');
  const textarea = document.querySelector('.main__area');
  if (!button) return;
  button.classList.add('btn_active');
  if (event.code === 'CapsLock') {
    signal.classList.toggle('btn__caps-signal_active');
    pressCaps();
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && !signal.classList.contains('btn__caps-signal_active')) {
    pressShift('down');
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && signal.classList.contains('btn__caps-signal_active')) {
    pressShift('up');
  }
  if (event.code === 'Tab') {
    const startPosition = textarea.selectionStart;
    const leftStr = textarea.value.slice(0, startPosition);
    const rightStr = textarea.value.slice(startPosition);
    textarea.value = `${leftStr}    ${rightStr}`;
    textarea.setSelectionRange(startPosition + 4, startPosition + 4);
  } else {
    textarea.focus();
  }
});

document.addEventListener('keyup', (event) => {
  const button = document.querySelector(`[data-code="${event.code}"]`);
  const signal = document.querySelector('.btn__caps-signal');
  if (!button) return;
  button.classList.remove('btn_active');
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && !signal.classList.contains('btn__caps-signal_active')) {
    pressShift('up');
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && signal.classList.contains('btn__caps-signal_active')) {
    pressShift('down');
  }
});

document.addEventListener('mousedown', (event) => {
  const textarea = document.querySelector('.main__area');
  const attribute = event.target.getAttribute('data-code');
  const signal = document.querySelector('.btn__caps-signal');
  const button = document.querySelector(`[data-code="${attribute}"]`);
  if (!button) return;
  button.classList.add('btn_active');
  if (attribute === 'CapsLock') {
    signal.classList.toggle('btn__caps-signal_active');
    pressCaps();
  }
  if ((attribute === 'ShiftLeft' || attribute === 'ShiftRight') && !signal.classList.contains('btn__caps-signal_active')) {
    pressShift('down');
  }
  if ((attribute === 'ShiftLeft' || attribute === 'ShiftRight') && signal.classList.contains('btn__caps-signal_active')) {
    pressShift('up');
  }
  if (button.classList.contains('btn__small')) {
    const startPosition = textarea.selectionStart;
    const leftStr = textarea.value.slice(0, startPosition);
    const rightStr = textarea.value.slice(startPosition);
    textarea.value = leftStr + button.innerHTML + rightStr;
    textarea.setSelectionRange(startPosition + 1, startPosition + 1);
  }
  if (attribute === 'Tab') {
    const startPosition = textarea.selectionStart;
    const leftStr = textarea.value.slice(0, startPosition);
    const rightStr = textarea.value.slice(startPosition);
    textarea.value = `${leftStr}    ${rightStr}`;
    textarea.setSelectionRange(startPosition + 4, startPosition + 4);
  }
  if (attribute === 'ArrowLeft') {
    const startPosition = textarea.selectionStart;
    if (startPosition === 0) return;
    textarea.setSelectionRange(startPosition - 1, startPosition - 1);
  }
  if (attribute === 'ArrowRight') {
    const startPosition = textarea.selectionStart;
    if (startPosition === textarea.value.length) return;
    textarea.setSelectionRange(startPosition + 1, startPosition + 1);
  }
});

document.addEventListener('mouseup', (event) => {
  const textarea = document.querySelector('.main__area');
  const attribute = event.target.getAttribute('data-code');
  const signal = document.querySelector('.btn__caps-signal');
  const button = document.querySelector(`[data-code="${attribute}"]`);
  if (!button) return;
  button.classList.remove('btn_active');
  if ((attribute === 'ShiftLeft' || attribute === 'ShiftRight') && !signal.classList.contains('btn__caps-signal_active')) {
    pressShift('up');
  }
  if ((attribute === 'ShiftLeft' || attribute === 'ShiftRight') && signal.classList.contains('btn__caps-signal_active')) {
    pressShift('down');
  }
  textarea.focus();
});
