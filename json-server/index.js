const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const https = require('https');
const http = require('http');

// Загружаем SSL-сертификаты для HTTPS-сервера
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pm')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};

// Создаем JSON-сервер
const server = jsonServer.create();

// Загружаем маршруты из файла db.json
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Настройки JSON-сервера
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Небольшая задержка перед обработкой запросов, чтобы имитировать реальное API
server.use(async (req, res, next) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
  next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
    );
    const { users = [] } = db;

    const userFromDb = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromDb) {
      return res.json(userFromDb);
    }

    return res.status(403).json({ message: 'Пользователь не найден' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// Проверяем, авторизован ли пользователь
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Ошибка авторизации' });
  }

  next();
});

// Используем загруженные маршруты
server.use(router);

// Создаем HTTPS-сервер с использованием SSL-сертификатов
const httpsServer = https.createServer(options, server);

// Создаем HTTP-сервер для обслуживания незащищенных запросов
const httpServer = http.createServer(server);

// Порт для HTTPS-сервера
const PORT = 8443;

// Порт для HTTP-сервера
const HTTP_PORT = 8000;

// Запускаем HTTPS-сервер
httpsServer.listen(PORT, () => {
  console.log(`Сервер HTTPS запущен на порту ${PORT}`);
});

// Запускаем HTTP-сервер
httpServer.listen(HTTP_PORT, () => {
  console.log(`Сервер HTTP запущен на порту ${HTTP_PORT}`);
});
