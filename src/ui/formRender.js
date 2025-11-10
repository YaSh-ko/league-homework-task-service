import { FormTypes } from '../constans/formTypes.js';

/**
 * Конфигурация форм по типам операций.
 * Ключи — типы формы (FormTypes.GET_ONE, POST, PATCH, DELETE)
 * Значения — массив объектов, описывающих поля формы:
 *  - type: 'input' | 'checkbox' | 'button'
 *  - id: уникальный идентификатор поля
 *  - label: текст для input/checkbox
 *  - text: текст для кнопки
 *  - required: обязательно ли поле для заполнения (только для input)
 */
const formSchemas = {
  [FormTypes.GET_ONE]: [
    { type: 'input', id: 'taskId', label: 'ID Задачи', required: true },
    { type: 'button', id: 'submitGetOne', text: 'Получить' }
  ],
  [FormTypes.POST]: [
    { type: 'input', id: 'taskName', label: 'Название' },
    { type: 'input', id: 'taskInfo', label: 'Описание' },
    { type: 'checkbox', id: 'taskImportant', label: 'Важно' },
    { type: 'button', id: 'submitPost', text: 'Создать' }
  ],
  [FormTypes.PATCH]: [
    { type: 'input', id: 'taskId', label: 'ID задачи', required: true },
    { type: 'input', id: 'taskName', label: 'Новое название' },
    { type: 'input', id: 'taskInfo', label: 'Новое описание' },
    { type: 'checkbox', id: 'taskImportant', label: 'Важно' },
    { type: 'checkbox', id: 'taskCompleted', label: 'Выполнено' },
    { type: 'button', id: 'submitPatch', text: 'Обновить' }
  ],
  [FormTypes.DELETE]: [
    { type: 'input', id: 'taskId', label: 'ID задачи', required: true },
    { type: 'button', id: 'submitDelete', text: 'Удалить' }
  ],
};

/**
 * Создаёт input элемент
 * @param {string} id - уникальный идентификатор input
 * @param {string} placeholder - текст подсказки
 * @param {boolean} [required=false] - обязателен ли input
 * @returns {HTMLInputElement} созданный input элемент
 */
function createInput(id, placeholder, required = false) {
  const input = document.createElement('input');
  input.className = 'task-service__input';
  input.id = id;
  input.placeholder = placeholder;
  if (required) input.required = true;
  return input;
}

/**
 * Создаёт checkbox с лейблом
 * @param {string} id - уникальный идентификатор checkbox
 * @param {string} labelText - текст для лейбла
 * @returns {HTMLLabelElement} контейнер с checkbox и текстом
 */
function createCheckbox(id, labelText) {
  const checkboxContainer = document.createElement('label');
  const input = document.createElement('input');
  checkboxContainer.className = 'task-service__checkbox-container';
  input.className = 'task-service__checkbox';
  input.type = 'checkbox';
  input.id = id;
  checkboxContainer.append(input, ' ', labelText);
  return checkboxContainer;
}

/**
 * Создаёт кнопку
 * @param {string} id - уникальный идентификатор кнопки
 * @param {string} text - текст кнопки
 * @returns {HTMLButtonElement} созданная кнопка
 */
function createButton(id, text) {
  const button = document.createElement('button');
  button.className = 'task-service__button task-service__button--submit';
  button.id = id;
  button.textContent = text;
  return button;
}

/**
 * Создаёт форму внутри контейнера на основе схемы
 * @param {HTMLElement} container - элемент, в который будет вставлена форма
 * @param {string} type - тип формы (ключ из formSchemas)
 * @returns {HTMLFormElement} созданная форма
 */
function createFormContainer(container, type) {
  container.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'task-service__form';
  form.id = `${type || 'default'}Form`;

  const schema = formSchemas[type];

  if (schema) {
    schema.forEach(field => {
      let el = null;

      switch (field.type) {
        case 'input':
          el = createInput(field.id, field.label, field.required);
          break;
        case 'checkbox':
          el = createCheckbox(field.id, field.label);
          break;
        case 'button':
          el = createButton(field.id, field.text);
          break;
      }

      form.append(el);
    });
  }

  container.append(form);
  return form;
}

export { createFormContainer };
