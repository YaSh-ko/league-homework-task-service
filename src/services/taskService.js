/**
 * Абстрактный сервис для работы с задачами.
 * Не предназначен для создания экземпляров напрямую.
 */
export class TaskService {
  /**
   * Конструктор абстрактного класса
   * @throws {Error} Если пытаются создать экземпляр TaskService напрямую
   */
  constructor() {
    if (this.constructor === TaskService) {
      throw new Error("Абстрактный класс не может быть использован для создания экземпляра");
    }
  }

  /**
   * Получает все задачи
   * @abstract
   * @throws {Error} Должен быть реализован в наследнике
   */
  getTasks() {
    throw new Error("Метод 'getTasks() должен быть реализован");
  }

  /**
   * Добавляет новую задачу
   * @abstract
   * @param {Object} taskData - Данные новой задачи
   * @throws {Error} Должен быть реализован в наследнике
   */
  addTask(taskData) {
    throw new Error("Метод 'addTask()' должен быть реализован");
  }

  /**
   * Получает задачу по id
   * @abstract
   * @param {string|number} taskId - ID задачи
   * @throws {Error} Должен быть реализован в наследнике
   */
  getTask(taskId) {
    throw new Error("Метод 'getTask()' должен быть реализован");
  }

  /**
   * Обновляет задачу по id
   * @abstract
   * @param {string|number} taskId - ID задачи
   * @throws {Error} Должен быть реализован в наследнике
   */
  updateTask(taskId) {
    throw new Error("Метод 'updateTask()' должен быть реализован");
  }

  /**
   * Удаляет задачу
   * @abstract
   * @throws {Error} Должен быть реализован в наследнике
   */
  deleteTask() {
    throw new Error("Метод 'deleteTask()' должен быть реализован");
  }

  /**
   * Обрабатывает ответ от сервера
   * @param {any} data - Данные ответа
   * @param {number} status - HTTP статус ответа
   * @param {string} statusText - Текст статуса ответа
   * @returns {any} Данные ответа, если статус успешный
   * @throws {Error} Если статус ответа указывает на ошибку
   */
  handleResponse(data, status, statusText) {
    if (status >= 200 && status < 300) {
      return data;
    }
    const errorMessage = data?.error || data?.message || `Ошибка запроса: ${status} ${statusText}`;
    throw new Error(errorMessage);
  }
}
