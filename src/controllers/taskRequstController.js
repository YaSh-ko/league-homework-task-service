/**
 * Контроллер для работы с задачами через TaskService
 */
export class TaskRequestController {
  /**
   * @param {Object} taskService - Сервис для работы с задачами (объект с методами getTasks, addTask, getTask, updateTask, deleteTask)
   */
  constructor(taskService) {
    this.taskService = taskService;
  }

  /**
   * Получает все задачи
   * @async
   * @param {Object} [filters] - Необязательные фильтры: { name?: string, isImportant?: boolean, isCompleted?: boolean }
   * @returns {Promise<Array>} Массив объектов задач
   * @throws {Error} Если произошла ошибка при получении задач
   */
  async getTasks(filters) {
    try {
      const tasks = await this.taskService.getTasks(filters);
      console.log("Все задачи получены", filters ? { filters } : '');
      console.log(tasks);
      return tasks;
    } catch (error) {
      console.error('Ошибка получения всех задач', error);
      throw error;
    }
  }

  /**
   * Создаёт новую задачу
   * @async
   * @param {Object} taskData - Данные новой задачи (например, name, info, important)
   * @returns {Promise<Object>} Созданная задача
   * @throws {Error} Если произошла ошибка при добавлении задачи
   */
  async addTask(taskData) {
    try {
      const newTask = await this.taskService.addTask(taskData);
      console.log(`Задача ${newTask.name} с id ${newTask.id} создана`);
      console.log(newTask);
      return newTask;
    } catch (error) {
      console.error('Ошибка добавления новой задачи', error);
      throw error;
    }
  }

  /**
   * Получает задачу по id
   * @async
   * @param {string|number} taskId - ID задачи
   * @returns {Promise<Object>} Объект задачи
   * @throws {Error} Если произошла ошибка при получении задачи
   */
  async getTask(taskId) {
    try {
      const task = await this.taskService.getTask(taskId);
      console.log(`Задача с id = ${taskId} получена`);
      console.log(task);
      return task;
    } catch (error) {
      console.error('Ошибка получения задачи', error);
      throw error;
    }
  }

  /**
   * Обновляет задачу по id
   * @async
   * @param {string|number} taskId - ID задачи
   * @param {Object} taskData - Обновлённые данные задачи
   * @returns {Promise<Object>} Обновлённая задача
   * @throws {Error} Если произошла ошибка при обновлении задачи
   */
  async updateTask(taskId, taskData) {
    try {
      const updatedTask = await this.taskService.updateTask(taskId, taskData);
      console.log(`Задача с id = ${taskId} обновлена`);
      console.log(updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('Ошибка обновления задачи', error);
      throw error;
    }
  }

  /**
   * Удаляет задачу по id
   * @async
   * @param {string|number} taskId - ID задачи
   * @returns {Promise<Object>} Удалённая задача
   * @throws {Error} Если произошла ошибка при удалении задачи
   */
  async deleteTask(taskId) {
    try {
      const deletedTask = await this.taskService.deleteTask(taskId);
      console.log(`Задача с id ${taskId} удалена`);
      console.log(deletedTask);
      return deletedTask;
    } catch (error) {
      console.error('Ошибка удаления задачи', error);
      throw error;
    }
  }
}
