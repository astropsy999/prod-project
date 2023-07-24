## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev index
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev index + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:index` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run prepare` - прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

---

## Архитектура проекта

Проект разработан с использованием методологии "Feature Sliced Design" (Дизайн по функциональным частям). Эта архитектурная методология является модульным подходом к организации кода, который стремится упростить управление состоянием, улучшить переиспользование кода и обеспечить четкое разделение функциональных возможностей.

### Преимущества методологии "Feature Sliced Design":

1. **Модульность**: Код разделяется на логические функциональные части (фичи), что делает его более организованным и легко масштабируемым. Каждая фича содержит все связанные компоненты, стили, действия и редьюсеры.

2. **Легкость поддержки**: Фичи могут быть легко добавлены, удалены или модифицированы без необходимости переписывания большой части кода. Это упрощает поддержку проекта на протяжении всего его жизненного цикла.

3. **Переиспользование кода**: Компоненты и логика, созданные для одной фичи, могут быть повторно использованы в других фичах. Это способствует устранению дублирования кода и повышению эффективности разработки.

4. **Улучшенное управление состоянием**: Каждая фича может иметь собственное независимое состояние, что способствует упрощению управления состоянием приложения и предотвращает появление сложных конфликтов в данных.

### Определение главных терминов:

1. **Методология "Feature Sliced Design"**: Это модульный подход к разработке, основанный на разделении функциональности проекта на небольшие логические части (фичи) для повышения организации кода и улучшения масштабируемости.

2. **Фича**: Функциональная часть проекта, содержащая компоненты, стили, экшены, редьюсеры и другие связанные элементы, которые обеспечивают определенную функциональность.

3. **Компонент**: Это независимый и переиспользуемый элемент интерфейса, который обрабатывает отображение и поведение определенной части приложения.

4. **Состояние**: Это данные, которые определяют текущее состояние приложения. В контексте "Feature Sliced Design", каждая фича может иметь свое собственное состояние.

5. **Действия(экшены) и редьюсеры**: Это часть паттерна управления состоянием (например, Redux), которая позволяет обрабатывать изменения состояния приложения и обновлять компоненты соответствующим образом.

## Основы {#basics}

Проект на FSD состоит из <mark>слоев</mark> (layers), каждый слой состоит из <mark>слайсов</mark> (slices) и каждый слайс состоит из <mark>сегментов</mark> (segments).

![themed--scheme](/docs/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

**Слои** стандартизированы во всех проектах и расположены вертикально. Модули на одном слое могут взаимодействовать лишь с модулями, находящимися на слоях строго ниже. На данный момент слоев семь (снизу вверх):

1. `shared` — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса.
   <small>(например, UIKit, libs, API)</small>
2. `entities` (сущности) — бизнес-сущности.
   <small>(например, User, Product, Order)</small>
3. `features` (фичи) — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя.
   <small>(например, SendComment, AddToCart, UsersSearch)</small>
4. `widgets` (виджеты) — композиционный слой для соединения сущностей и фич в самостоятельные блоки
   <small>(например, IssuesList, UserProfile)</small>.
5. `pages` (страницы) — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
6. `processes` (процессы, устаревший слой) — сложные сценарии, покрывающие несколько страниц.
   <small>(например, авторизация)</small>
7. `app` — настройки, стили и провайдеры для всего приложения.

Затем есть **слайсы**, разделяющие код по предметной области. Они группируют логически связанные модули, что облегчает навигацию по кодовой базе. Слайсы не могут использовать другие слайсы на том же слое, что обеспечивает высокий уровень связност (cohesion) при низком уровне зацепления (coupling).

В свою очередь, каждый слайс состоит из **сегментов**. Это маленькие модули, главная задача которых — разделить код внутри слайса по техническому назначению. Самые распространенные сегменты — `ui`, `model` (store, actions), `api` и `lib` (utils/hooks), но в вашем слайсе может не быть каких-то сегментов, могут быть другие, по вашему усмотрению.

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`
4. e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-paths-checking-plugin-ys_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layers-import-ys - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3. public-api-imports-ys - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  theme: ButtonTheme.CLEAR,
};
```

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

### Работа с feature-flags

Разрешено исользование feature-flags только с помощью хелпера toggleFeatures в него передается объект с опциями
{
name: название фича-флага,
on: функция которая отработает после включения фича флага,
off: функция которая отработает после выключения фича флага
}

## Для автоматического удаления фичи использовать скрипт remove-features.ts он принимает 2 аргумента

1. Название удаляемого фича-флага
2. Состояние (on/off)

---

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фичи (features)

- [addCommentForm](/src/features/addCommentForm)
- [articleEditForm](/src/features/articleEditForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
