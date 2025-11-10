import { TaskRequestController } from "./controllers/taskRequstController.js";
import { TaskServiceFetchRealization } from "./services/taskServiceFetch.js";
import { TaskServiceXhrRealization } from "./services/taskServiceXhr.js";
import { initUIHandlers } from "./ui/initUIHandlers.js";

// Инициализация зависимостей
const fetchService = new TaskServiceFetchRealization();
const controller = new TaskRequestController(fetchService);

// const xhrService = new TaskServiceXhrRealization();
// const anotherContoller = new TaskRequestController(xhrService);

// Инициализация интерфейса
initUIHandlers(controller);
