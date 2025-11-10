import { output } from './elements.js';

// Очищает содержимое блока вывода
function clearOutput() {
  output.innerHTML = '';
}

// Отображает сообщение в блоке вывода
// Если передан параметр err, добавляет его к сообщению
function showMessage(message, err) {
  output.textContent = err ? `${message}: ${err}` : message;
}

export { clearOutput, showMessage };
