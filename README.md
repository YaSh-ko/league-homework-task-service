## League Homework Task Service (Frontend)

Небольшое веб‑приложение для ручного тестирования REST API сервиса задач. Позволяет выполнять операции GET (все задачи и по ID), POST (создание), PATCH (обновление) и DELETE (удаление) через простой UI в браузере без бэкенда в репозитории.

### Возможности
- **GET All**: получить список всех задач
- **GET by ID**: получить одну задачу по идентификатору
- **POST (Create)**: создать новую задачу
- **PATCH (Update)**: обновить существующую задачу по ID
- **DELETE**: удалить задачу по ID

### Технологии
- Чистый JavaScript (ES Modules), без фреймворков
- Два транспортных слоя: `fetch` и `XMLHttpRequest`
- SCSS → CSS (Sass)
- Простая вёрстка на чистом HTML/CSS

### Структура проекта
- `index.html` — точка входа UI
- `src/index.js` — инициализация сервисов и UI
- `src/constans/config.js` — базовый URL API (`BASE_URL`)
- `src/constans/formTypes.js` — типы форм (операций)
- `src/controllers/taskRequstController.js` — контроллер запросов
- `src/services/taskService.js` — абстрактный сервис (контракт)
- `src/services/taskServiceFetch.js` — реализация сервиса на `fetch`
- `src/services/taskServiceXhr.js` — реализация сервиса на `XMLHttpRequest`
- `src/ui/*` — элементы, рендер форм/задач, обработчики событий, хелперы
- `styles/scss`, `styles/css` — стили и результирующий CSS

### Быстрый старт
Требуется установленный Node.js (для dev‑скриптов).

1) Установка зависимостей:

```bash
npm install
```

2) Запуск локального сервера (автообновление страницы):

```bash
npm start
```

3) (Опционально) Запуск наблюдения за SCSS → CSS:

```bash
npm run build:css
```

4) Откройте в браузере страницу, которую выдаст `live-server`. Интерфейс доступен из `index.html`. Кнопки операций находятся в шапке, под ними — динамические формы и блок вывода результатов.

### Конфигурация API
Базовый адрес API задаётся в:

```text
src/constans/config.js
```

При необходимости укажите свой адрес сервера.

### Переключение транспорта (fetch ↔ XHR)
По умолчанию контроллер инициализируется с `fetch`‑реализацией в `src/index.js`:

```js
const fetchService = new TaskServiceFetchRealization();
const controller = new TaskRequestController(fetchService);
// const xhrService = new TaskServiceXhrRealization();
// const controller = new TaskRequestController(xhrService);
```

Чтобы использовать `XMLHttpRequest`, создайте контроллер на базе `TaskServiceXhrRealization` (раскомментируйте соответствующие строки и закомментируйте `fetch`).

### Форматы данных
Создание/обновление задач ожидает объект вида:

```json
{
  "name": "Название",
  "info": "Описание",
  "isImportant": true,
  "isCompleted": false
}
```

UI формирует такие данные автоматически из полей формы.

### Работа с UI
- Нажмите нужную кнопку операции (GET All / GET by ID / POST / PATCH / DELETE).
- При необходимости заполните автоматически сгенерированную форму.
- Нажмите Submit: результаты запроса будут показаны в блоке «Результат появится здесь…».

Ошибки отображаются кратким сообщением. Дополнительно диагностические сообщения пишутся в консоль браузера.

### Скрипты
- `npm start` — запустить `live-server` для разработки
- `npm run build:css` — запустить наблюдение Sass (SCSS → CSS)
- `npm run lint:css` — проверить и автоматически исправить стиль CSS/SCSS

### Архитектура (коротко)
- `TaskService` — абстракция протокола доступа к API.
- `TaskServiceFetchRealization` / `TaskServiceXhrRealization` — конкретные реализации.
- `TaskRequestController` — контроллер вызовов сервиса и логирование.
- `ui/*` — реактивный, но простой слой: генерация форм по схеме, рендер задач, обработчики событий.

### Требования к окружению
- Современный браузер с поддержкой ES Modules
- Node.js (для дев‑серверов/скриптов)
