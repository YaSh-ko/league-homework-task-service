import { TaskRequestController } from "./controllers/taskRequstController.js";
import { TaskServiceFetchRealization } from "./services/taskServiceFetch.js";
import { TaskServiceXhrRealization } from "./services/taskServiceXhr.js";


async function main() {
  const serviceFetch = new TaskServiceFetchRealization();
  const serviceXhr = new TaskServiceXhrRealization();
  const controller = new TaskRequestController(serviceXhr);

  const tasks = await controller.getTasks();
  console.log(tasks);
  const newTask = await controller.addTask({
    name: "Новая задача",
    info: "Описание задачи",
    isImportant: false,
    isCompleted: false
  });

  const updatedTask = await controller.updateTask(newTask.id, {
    name: "Обновленное название",
    info: "Обновленное описание",
    isImportant: true,
    isCompleted: true
  })
  console.log(updatedTask);
  const deletedTask  = await controller.deleteTask(newTask.id);
  console.log(deletedTask);

  console.log(await controller.getTasks());
}

main();
