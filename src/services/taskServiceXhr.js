import { TaskService } from "./taskService.js";
import { BASE_URL } from "../config.js";

export class TaskServiceXhrRealization extends TaskService {

  getTasks() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${BASE_URL}/tasks`, true);

      xhr.onload = () => {

        try {
          const data = JSON.parse(xhr.responseText);

          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          }

          catch(error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
        catch {
            reject(new Error("Неккоректный ответ сервера"));
        }
      }

      xhr.send();
    })
  }

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
          }
          catch(error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
        catch(e) {
            reject(new Error("Неккоректный ответ сервера"));
        }
      }

      xhr.send(JSON.stringify(taskData));
    })
  }

  getTask(taskId) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${BASE_URL}/tasks/${taskId}`, true);

      xhr.onload = () => {

        try {
          const data = JSON.parse(xhr.responseText);

          try {
            resolve(this.handleResponse(data, xhr.status, xhr.statusText));
          }

          catch(error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
        catch {
            reject(new Error("Неккоректный ответ сервера"));
        }
      }

      xhr.send();
    })
  }

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
          }
          catch(error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
        catch {
          reject(new Error("Некорректный ответ от сервера"));
        }
      }

      xhr.send(JSON.stringify(taskData));
    })
  }

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
          }
          catch(error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        }
        catch(e) {
            reject(new Error("Неккоректный ответ сервера"));
        }
      }

      xhr.send();
    })
  }
}
