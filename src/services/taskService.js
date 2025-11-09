export class TaskService {
  constructor() {
    if(this.constructor === TaskService) {
      throw new Error("Абстрактный класс не может быть использован для создания экземпляра");
    }
  }
  getTasks() {
    throw new Error("Метод 'getTasks() должен быть реализован");
  }
  addTask(taskData) {
    throw new Error("Метод 'addTask()' должен быть реализован");
  }
  getTask(taskId) {
    throw new Error("Метод 'getTask()' должен быть реализован");
  }
  updateTask(taskId) {
    throw new Error("Метод 'updateTask()' должен быть реализован");
  }
  deleteTask() {
    throw new Error("Метод 'deleteTask()' должен быть реализован");
  }

  handleResponse(data, status, statusText) {
    if(status >= 200 && status < 300) {
      return data;
    }
    if(status < 200 || status >= 300) {
      const errorMessage = data?.error || data?.message || `Ошибка запроса: ${status} ${statusText}`
      throw new Error(errorMessage);
    }
  }
}
