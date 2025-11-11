import { TaskService } from "./taskService.js";
import { BASE_URL } from "../constans/config.js";

/**
 * Реализация TaskService с использованием fetch API для работы с сервером.
 * Методы возвращают данные с сервера и обрабатывают ошибки через handleResponse.
 */
export class TaskServiceFetchRealization extends TaskService {

  /**
   * Получает все задачи с сервера
   * @async
   * @param {Object} [filters] - Необязательные фильтры: { name?: string, isImportant?: boolean, isCompleted?: boolean }
   * @returns {Promise<Array>} Массив задач
   * @throws {Error} Если ответ от сервера некорректный или статус ошибки
   */
  async getTasks(filters) {
    const params = new URLSearchParams();
    if (filters && typeof filters === 'object') {
      const { name, isImportant, isCompleted } = filters;
      if (name) params.set('name_like', name);
      if (typeof isImportant === 'boolean') params.set('isImportant', String(isImportant));
      if (typeof isCompleted === 'boolean') params.set('isCompleted', String(isCompleted));
    }
    const query = params.toString();
    const url = query ? `${BASE_URL}/tasks?${query}` : `${BASE_URL}/tasks`;
    const response = await fetch(url);
    let data = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

  /**
   * Создаёт новую задачу на сервере
   * @async
   * @param {Object} taskData - Данные новой задачи
   * @returns {Promise<Object>} Созданная задача
   * @throws {Error} Если ответ от сервера некорректный или статус ошибки
   */
  async addTask(taskData) {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    let data = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

  /**
   * Получает задачу по ID с сервера
   * @async
   * @param {string|number} taskId - ID задачи
   * @returns {Promise<Object>} Задача
   * @throws {Error} Если ответ от сервера некорректный или статус ошибки
   */
  async getTask(taskId) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`);
    let data = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

  /**
   * Обновляет задачу по ID на сервере
   * @async
   * @param {string|number} taskId - ID задачи
   * @param {Object} taskData - Данные для обновления задачи
   * @returns {Promise<Object>} Обновлённая задача
   * @throws {Error} Если ответ от сервера некорректный или статус ошибки
   */
  async updateTask(taskId, taskData) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    let data = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

  /**
   * Удаляет задачу по ID на сервере
   * @async
   * @param {string|number} taskId - ID задачи
   * @returns {Promise<Object>} Удалённая задача
   * @throws {Error} Если ответ от сервера некорректный или статус ошибки
   */
  async deleteTask(taskId) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }
}
