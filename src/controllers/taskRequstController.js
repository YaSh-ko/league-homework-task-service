export class TaskRequestController {
  constructor(taskService) {
    this.taskService = taskService;
  }
  async getTasks() {
    try {
      const tasks = await this.taskService.getTasks();
      console.log("Все задачи получены");
      return tasks;

    }
    catch(error) {
      console.error('Ошибка получения всех задач', error);
    }
  }
  async addTask(taskData) {
    try {
      const newTask = await this.taskService.addTask(taskData);
      console.log(`Задача ${taskData.name} с id ${taskData.id} создана`);
      return newTask;
    }
    catch(error) {
      console.error('Ошибка добавления новой задачи', error);
    }
  }

  async getTask(taskId) {
    try {
      const task = await this.taskService.getTask(taskId);
      console.log(`Задача с id = ${taskId} получена`);
      return task;
    }
    catch(error) {
      console.error('Ошибка получения задачи', error);
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const updatedTask = await this.taskService.updateTask(taskId, taskData);
      console.log(`Задача с id = ${taskId} обновлена`);
      return updatedTask;
    }
    catch(error) {
      console.error('Ошибка обновления задачи', error);
    }
  }

  async deleteTask(taskId) {
    try {
      const deletedTask = await this.taskService.deleteTask(taskId);
      console.log(`Задача с id ${taskId} удалена`);
      return deletedTask;
    }
    catch(error) {
      console.error('Ошибка удаления задачи', error);
    }
  }

}

