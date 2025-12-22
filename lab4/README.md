# Hangman — Lab 4 (Styling + Routing + State Management)

## Вимоги, які реалізовано
- ✅ Роутинг між сторінками через **react-router-dom**
- ✅ Динамічний роутинг з користувачем: **/u/:userId/start**, **/u/:userId/game**, **/u/:userId/result**
- ✅ Стейт менеджмент:
  - SettingsContext (налаштування, збереження в localStorage окремо для кожного userId)
  - GameContext (зберігає lastResult для сторінки Result)
- ✅ Стилізація через **CSS Modules**

## Запуск
```bash
npm install
npm run dev
```

## Приклад
- /u/guest/start
- /u/olexandr/start (інший userId => окремі налаштування в localStorage)
