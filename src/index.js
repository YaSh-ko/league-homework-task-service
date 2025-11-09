import { TaskRequestController } from "./controllers/taskRequstController.js";
import { TaskServiceFetchRealization } from "./services/taskServiceFetch.js";
import { TaskServiceXhrRealization } from "./services/taskServiceXhr.js";
import { elements, createTask, createFormContainer } from "./ui/render.js";
import { FormTypes } from './constans/formTypes.js';

const serviceFetch = new TaskServiceFetchRealization();
const controller = new TaskRequestController(serviceFetch);

// ---------- Обработчики кнопок ----------

// Получить все задачи
async function handlerClickGetTasksButton() {
  // Для этой кнопки форма не нужна
  createFormContainer();
  elements.output.textContent = 'Загрузка...';
  try {
    const tasks = await controller.getTasks();
    console.log(tasks);
    elements.output.textContent = '';
    tasks.forEach(task => createTask(task));
  } catch (err) {
    createTask(null, err);
  }
}

// Получить одну задачу по ID
function handlerClickGetOneTaskButton() {
  const { form, button } = createFormContainer(FormTypes.GET_ONE);
  elements.output.textContent = 'Результаты появятся здесь...';

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = form.elements.taskId.value;

    try {
      const task = await controller.getTask(id);
      elements.output.textContent = '';
      console.log(task);
      createTask(task);
    } catch (err) {
      createTask(null, err);
    }
  });
}

// Создать новую задачу
function handlerClickCreateTaskButton() {
  const { form, button } = createFormContainer(FormTypes.POST);
  elements.output.textContent = 'Результаты появятся здесь...';

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    const task = {
      name: form.elements.taskName.value,
      info: form.elements.taskInfo.value,
      isImportant: form.elements.taskImportant.checked,
      isCompleted: false
    };

    try {
      const newTask = await controller.addTask(task);
      elements.output.textContent = '';
      console.log(task);
      createTask(newTask);
    } catch (err) {
      createTask(null, err);
    }
  });
}

// Обновить задачу
function handlerClickUpdateTaskButton() {
  const { form, button } = createFormContainer(FormTypes.PATCH);
  elements.output.textContent = 'Результаты появятся здесь...';

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    const task = {
      name: form.elements.taskName.value,
      info: form.elements.taskInfo.value,
      isImportant: form.elements.taskImportant.checked,
      isCompleted: form.elements.taskCompleted.checked
    };
    const id = form.elements.taskId.value;

    try {
      const updatedTask = await controller.updateTask(id, task);
      elements.output.textContent = '';
      console.log(updatedTask);
      createTask(updatedTask);
    } catch (err) {
      createTask(null, err);
    }
  });
}

// Удалить задачу
function handlerClickDeleteTaskButton() {
  const { form, button } = createFormContainer(FormTypes.DELETE);
  elements.output.textContent = 'Результаты появятся здесь...';

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = form.elements.taskId.value;

    try {
      const deletedTask = await controller.deleteTask(id);
      elements.output.textContent = '';
      console.log(deletedTask);
      createTask(deletedTask);
    } catch (err) {
      createTask(null, err);
    }
  });
}

// ---------- Привязка обработчиков к кнопкам ----------

elements.getTasksButton.addEventListener('click', handlerClickGetTasksButton);
elements.getOneTaskButton.addEventListener('click', handlerClickGetOneTaskButton);
elements.createTaskButton.addEventListener('click', handlerClickCreateTaskButton);
elements.updateTaskButton.addEventListener('click', handlerClickUpdateTaskButton);
elements.deleteTaskButton.addEventListener('click', handlerClickDeleteTaskButton);
