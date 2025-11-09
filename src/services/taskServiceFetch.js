import { TaskService } from "./taskService.js";
import { BASE_URL } from "../constans/config.js";

export class TaskServiceFetchRealization extends TaskService {

  async getTasks() {
    const response = await fetch(`${BASE_URL}/tasks`);
    let data = null;

    try {
      data = await response.json();
    }
    catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

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
    }
    catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);

  }

  async getTask(taskId) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`)

    let data = null;

    try {
      data = await response.json();
    }
    catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

  async updateTask(taskId, taskData) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    let data = null;

    try {
      data = await response.json();
    }
    catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }

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
    }
    catch {
      throw new Error("Неккоректный ответ от сервера");
    }

    return this.handleResponse(data, response.status, response.statusText);
  }
}
