import { FormTypes } from '../constans/formTypes.js';

const elements = {
  getTasksButton: document.getElementById('getTasksButton'),
  getOneTaskButton: document.getElementById('getOneTaskButton'),
  createTaskButton: document.getElementById('createTaskButton'),
  updateTaskButton: document.getElementById('updateTaskButton'),
  deleteTaskButton: document.getElementById('deleteTaskButton'),

  formContainer: document.getElementById('formContainer'),

  output: document.getElementById('output')
}

const formFactories = {
  [FormTypes.GET_ONE]: () => [
    createInput('taskId', 'Task ID'),
    createButton('submitGetOne', 'Отправить')
  ],
  [FormTypes.POST]: () => [
    createInput('taskName', 'Название'),
    createInput('taskInfo', 'Описание'),
    createCheckbox('taskImportant', 'Важно'),
    createButton('submitPost', 'Создать')
  ],
  [FormTypes.PATCH]: () => [
    createInput('taskId', 'ID задачи'),
    createInput('taskName', 'Новое название'),
    createInput('taskInfo', 'Новое описание'),
    createCheckbox('taskImportant', 'Важно'),
    createCheckbox('taskCompleted', 'Выполнено'),
    createButton('submitPatch', 'Обновить')
  ],
  [FormTypes.DELETE]: () => [
    createInput('taskId', 'ID задачи'),
    createButton('submitDelete', 'Удалить')
  ]
};

function createInput(id, placeholder) {
  const input = document.createElement('input');
  input.id = id;
  input.placeholder = placeholder;
  return input;
}

function createCheckbox(id, labelText) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = id;
  label.append(input, ' ', labelText);
  return label;
}

function createButton(id, text) {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = text;
  return button;
}

function createTask(taskData, error) {
  if(taskData) {

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-service__task-container';

    const taskName = document.createElement('h3');
    taskName.className = 'task-service__task-name';
    taskName.textContent = taskData.name;

    const taskInfo = document.createElement('p');
    taskInfo.className = 'task-service__task-info';
    taskInfo.textContent = taskData.info;

    const taskImportant = document.createElement('span');
    taskImportant.className = 'task-service__task-important';
    taskImportant.textContent = taskData.isImportant ? 'Важная' : '';

    const taskCompleted = document.createElement('span');
    taskCompleted.className = 'task-service__task-completed';
    taskCompleted.textContent = taskCompleted.isCompleted ? "Сделано" : "Надо сделать";

    taskContainer.append(taskName, taskInfo, taskImportant, taskCompleted);

    elements.output.append(taskContainer);
  }

}

function createFormContainer(type) {
  elements.formContainer.innerHTML = '';
  const form = document.createElement('form');
  form.id = 'taskForm';

  const factory = formFactories[type];
  let button = null;
  if (factory) {
    const elementsArray = factory();
    elementsArray.forEach(el => {
      form.append(el)
      if (el.tagName === 'BUTTON') button = el;
    });
  }

  elements.formContainer.append(form);
  return { form, button };
}

export {elements, createTask, createFormContainer};
