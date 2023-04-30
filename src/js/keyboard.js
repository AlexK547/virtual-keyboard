export function keyboard() {
  const main = document.createElement('main');
  main.classList.add("main");

  const title = document.createElement('h1');
  title.classList.add("main__title");
  title.innerHTML = 'Virtual keyboard';

  const textArea = document.createElement('textarea');
  textArea.classList.add("main__area");

  main.appendChild(title);
  main.appendChild(textArea);

  document.body.append(main);
}