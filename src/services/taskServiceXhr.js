import { TaskService } from "./taskService.js";
import { BASE_URL } from "../constans/config.js";

/**
 * Реализация TaskService с использованием XMLHttpRequest для работы с сервером.
 * Методы возвращают промисы с данными с сервера и обрабатывают ошибки через handleResponse.
 */
export class TaskServiceXhrRealization extends TaskService {

  /**
   * Получает все задачи с сервера
   * @param {Object} [filters] - Необязательные фильтры: { name?: string, isImportant?: boolean, isCompleted?: boolean }
   * @returns {Promise<Array>} Массив задач
   * @throws {Error} Если ответ сервера некорректный или статус ошибки
   */
  getTasks(filters) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const params = new URLSearchParams();
      if (filters && typeof filters === 'object') {
        const { name, isImportant, isCompleted } = filters;
        if (name) params.set('name_like', name);
        if (typeof isImportant === 'boolean') params.set('isImportant', String(isImportant));
        if (typeof isCompleted === 'boolean') params.set('isCompleted', String(isCompleted));
      }
      const query = params.toString();
      const url = query ? `${BASE_URL}/tasks?${query}` : `${BASE_URL}/tasks`;
      xhr.open("GET", url, true);

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        } catch {
          reject(new Error("Неккоректный ответ сервера"));
        }
      };

      xhr.send();
    });
  }

  /**
   * Создаёт новую задачу на сервере
   * @param {Object} taskData - Данные новой задачи
   * @returns {Promise<Object>} Созданная задача
   * @throws {Error} Если ответ сервера некорректный или статус ошибки
   */
  addTask(taskData) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BASE_URL}/tasks`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        } catch {
          reject(new Error("Неккоректный ответ сервера"));
        }
      };

      xhr.send(JSON.stringify(taskData));
    });
  }

  /**
   * Получает задачу по ID с сервера
   * @param {string|number} taskId - ID задачи
   * @returns {Promise<Object>} Задача
   * @throws {Error} Если ответ сервера некорректный или статус ошибки
   */
  getTask(taskId) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${BASE_URL}/tasks/${taskId}`, true);

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        } catch {
          reject(new Error("Неккоректный ответ сервера"));
        }
      };

      xhr.send();
    });
  }

  /**
   * Обновляет задачу по ID на сервере
   * @param {string|number} taskId - ID задачи
   * @param {Object} taskData - Данные для обновления задачи
   * @returns {Promise<Object>} Обновлённая задача
   * @throws {Error} Если ответ сервера некорректный или статус ошибки
   */
  updateTask(taskId, taskData) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PATCH", `${BASE_URL}/tasks/${taskId}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        } catch {
          reject(new Error("Некорректный ответ от сервера"));
        }
      };

      xhr.send(JSON.stringify(taskData));
    });
  }

  /**
   * Удаляет задачу по ID на сервере
   * @param {string|number} taskId - ID задачи
   * @returns {Promise<Object>} Удалённая задача
   * @throws {Error} Если ответ сервера некорректный или статус ошибки
   */
  deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `${BASE_URL}/tasks/${taskId}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        } catch {
          reject(new Error("Неккоректный ответ сервера"));
        }
      };

      xhr.send();
    });
  }
}
