# PartyChat

Проектная работа по курсу Яндекс-Практикума middle-frontend - Чат для общения в реальном времени, 2 спринт.

## Команды

`npm install` - установка стабильной версии пакетов проекта

`npm run dev` - запуск проекта в режиме hot-server

`npm run build` - сборка страниц из шаблонов папки src/pages

`npm run start` - сборка страниц из шаблонов папки src/pages и запуск epress-сервера на 3000 порту

## Прототипы

[Figma](https://www.figma.com/file/osQ7WVBPLhr4MScrNBrKxs/PartyChat)

## Netlify

[Домен с проектом на Netlify](https://dashing-klepon-a09a86.netlify.app/index/index.html)

## Инсnрументы/пакеты используемые в проекте:
    - typeScript
    - ESLint 
    - Stylelint

## Изменения по итогам второго спринта:

- код и структура проекта переписаны с использованием компонентного подхода
- добавлены классы-утилиты: валидатор, класс для http-запросов, универсальный компонент-блок 
- добавлена обработка и валидация форм на страницах профиля и регистрации
- новая страница Чат: вёрстка и отображение данных страницы из состояния


PS: проект показывает одну ошибку при прохождении автотеста Check Styleint - эту ошибку не могу поправить со своей стороны тк ошибка явно связано с неподдерживаемым синтаксисом используемым в коде самого теста, для разрешения вопроса будет составлена заявка в поддержку для проверку и решения вопроса 