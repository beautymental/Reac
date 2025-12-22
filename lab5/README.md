# Hangman — Lab 5 (Redux Toolkit)

## Вимоги
- ✅ Організувати роботу зі станом через state manager: **Redux Toolkit**
- ✅ Перевірка: сторінка **Налаштування** та сторінка **Таблиця результатів**

## Де що
- /u/:userId/start — налаштування беруться/оновлюються через Redux store
- /u/:userId/results — таблиця результатів (список раундів) з Redux store
- Дані persist'яться в localStorage (store -> localStorage)

## Запуск
```bash
npm install
npm run dev
```

## Примітка
Результат раунду автоматично записується в store, коли гра переходить у win/lose.
