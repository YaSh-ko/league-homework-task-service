import { output } from './elements.js';

/**
 * Создаёт и отображает задачу в контейнере output.
 *
 * @param {Object|null} taskData - Объект с данными задачи.
 * @param {string} taskData.name - Название задачи.
 * @param {string} taskData.info - Описание задачи.
 * @param {boolean} taskData.isImportant - Флаг важности задачи.
 * @param {boolean} taskData.isCompleted - Флаг завершённости задачи.
 *
 * Если taskData равен null или undefined, отображается сообщение 'Нет данных для отображения'.
 */
function createTask(taskData) {
  const taskContainer = document.createElement('div');
  taskContainer.className = 'task-service__task-container';
  if (!taskData) {
    taskContainer.textContent = 'Нет данных для отображения';
    output.append(taskContainer);
    return;
  }

  const { name, info, isImportant, isCompleted } = taskData;

  const taskName = document.createElement('h3');
  taskName.className = 'task-service__task-name';
  taskName.textContent = name;

  const taskInfo = document.createElement('p');
  taskInfo.className = 'task-service__task-info';
  taskInfo.textContent = info;

  const taskImportant = document.createElement('span');
  taskImportant.className = 'task-service__task-important';
  taskImportant.textContent = isImportant ? 'Важная' : '';

  const taskCompleted = document.createElement('span');
  taskCompleted.className = 'task-service__task-completed';
  taskCompleted.textContent = isCompleted ? 'Сделано' : 'Надо сделать';

  if (isImportant) {
    taskContainer.classList.add('task-service__task-container--important');
  }

  if (isCompleted) {
    taskContainer.classList.add('task-service__task-container--completed');
  }

  taskContainer.append(taskName, taskInfo, taskImportant, taskCompleted);
  output.append(taskContainer);
}

export { createTask };
