import { elements } from "./elements.js";
import { createFormContainer } from "./formRender.js";
import { createTask } from "./taskRender.js";
import { showMessage, clearOutput } from "./uiHelpers.js";
import { FormTypes } from "../constans/formTypes.js";

/**
 * Инициализирует обработчики событий UI для работы с задачами.
 *
 * @param {Object} controller - Контроллер задач с методами:
 *   - getTasks(): Promise<Array>
 *   - getTask(id): Promise<Object>
 *   - addTask(taskData): Promise<Object>
 *   - updateTask(id, taskData): Promise<Object>
 *   - deleteTask(id): Promise<Object>
 *
 * Функция привязывает обработчики к кнопкам для получения всех задач, одной задачи,
 * создания, обновления и удаления задач.
 */
export function initUIHandlers(controller) {

  // Получить все задачи
  elements.getTasksButton.addEventListener('click', async () => {
    createFormContainer(elements.formContainer);
    showMessage('Загрузка...');
    try {
      const tasks = await controller.getTasks();
      clearOutput();
      tasks.forEach(task => createTask(task));
    } catch (error) {
      showMessage('Ошибка при загрузке задач', error.message);
    }
  });

  // Получить одну задачу
  elements.getOneTaskButton.addEventListener('click', () => {
    const form = createFormContainer(elements.formContainer, FormTypes.GET_ONE);
    showMessage('Введите ID задачи для добавления');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = form.elements.taskId.value;
      clearOutput();
      try {
        const task = await controller.getTask(id);
        createTask(task);
      } catch (error) {
        showMessage('Ошибка при получении задачи', error.message);
      }
    });
  });

  // Создать задачу
  elements.createTaskButton.addEventListener('click', () => {
    const form = createFormContainer(elements.formContainer, FormTypes.POST);
    showMessage('Введите данные новой задачи');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearOutput();
      const task = {
        name: form.elements.taskName.value,
        info: form.elements.taskInfo.value,
        isImportant: form.elements.taskImportant.checked,
        isCompleted: false
      };
      try {
        const newTask = await controller.addTask(task);
        createTask(newTask);
      } catch (error) {
        showMessage('Ошибка при создании задачи', error.message);
      }
    });
  });

  // Обновить задачу
  elements.updateTaskButton.addEventListener('click', () => {
    const form = createFormContainer(elements.formContainer, FormTypes.PATCH);
    showMessage('Введите данные для обновления задачи');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearOutput();
      const id = form.elements.taskId.value;
      const task = {
        name: form.elements.taskName.value,
        info: form.elements.taskInfo.value,
        isImportant: form.elements.taskImportant.checked,
        isCompleted: form.elements.taskCompleted.checked,
      };
      try {
        const updatedTask = await controller.updateTask(id, task);
        createTask(updatedTask);
      } catch (error) {
        showMessage('Ошибка при обновлении задачи', error.message);
      }
    });
  });

  // Удалить задачу
  elements.deleteTaskButton.addEventListener('click', () => {
    const form = createFormContainer(elements.formContainer, FormTypes.DELETE);
    showMessage('Введите ID задачи для удаления');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = form.elements.taskId.value;
      clearOutput();
      try {
        const deletedTask = await controller.deleteTask(id);
        createTask(deletedTask);
      } catch (error) {
        showMessage('Ошибка при удалении задачи', error.message);
      }
    });
  });
}
