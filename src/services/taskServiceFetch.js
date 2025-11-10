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
   * @returns {Promise<Array>} Массив задач
   * @throws {Error} Если ответ от сервера некорректный или статус ошибки
   */
  async getTasks() {
    const response = await fetch(`${BASE_URL}/tasks`);
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
