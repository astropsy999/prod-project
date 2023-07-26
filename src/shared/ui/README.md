# Основные UI компоненты которые используются во всем приложении

Папка [deprecated](/src/shared/ui/deprecated/) содержит компоненты которые устарели и заменены компонентами из папки [redesigned](/src/shared/ui/redesigned/)

## Старые компоненты не поддерживаются, поэтому здесь приведены ссылки только на актуальные версии компонентов и краткое описание их предназначения

Как правило в папке с компонентом содержится непосредственно сам компонент, а так же файл сторибука и стили относящиеся к данному компоненту. Полное описание компонента с передаваемыми пропсами описано в комментария в самом коде. Так же там находится файл index.ts которые представляет собой экспорт компонента в соответствии с правилами архитектуры FSD.

Для получения полного описания работы компонента необходимо пройти по ссылкам

- [AppImage](/src/shared/ui/redesigned/AppImage/): Компонент AppImage отображает изображение
- [AppLink](/src/shared/ui/redesigned/AppLink/): Компонент AppLink предназначен для работы со ссылками
- [AppLogo](/src/shared/ui/redesigned/AppLogo/): Компонент AppLogo предназначен для работы с логотипами
- [Avatar](/src/shared/ui/redesigned/Avatar/): Компонент Avatar предназначен для отображения аватаров
- [Button](/src/shared/ui/redesigned/Button/): Компонент Button предназначен для отображения кнопок
- [Card](/src/shared/ui/redesigned/Card/): Компонент Card предназначен для создания карточек
- [Code](/src/shared/ui/redesigned/Code/): Компонент Code предназначен для отображения блока с кодом
- [Drawer](/src/shared/ui/redesigned/Drawer/): Компонент Drawer предназначен для отображения шторки на мобильных устройствах
- [Icon](/src/shared/ui/redesigned/Icon/): Компонент Icon предназначен для отображения иконок
- [Input](/src/shared/ui/redesigned/Input/): Компонент Input предназначен для отображения полей ввода
- [Modal](/src/shared/ui/redesigned/Modal/): Компонент Modal предназначен для отображения модальных окон
- [Overlay](/src/shared/ui/redesigned/Overlay/): Компонент Overlay предназначен для закрытия при клике во вне модального окна
- [Popups](/src/shared/ui/redesigned/Popups/):
  - [Dropdown](/src/shared/ui/redesigned/Popups/ui/Dropdown/): Выпадающий список-меню
  - [ListBox](/src/shared/ui/redesigned/Popups/ui/ListBox/): Выпадающее меню
  - [Popover](/src/shared/ui/redesigned/Popups/ui/Popover/): Всплывающие меню
- [Portal](/src/shared/ui/redesigned/ui/Portal/): Позволяет рендерить дочерние элементы в указанный DOM элемент
- [Skeleton](/src/shared/ui/redesigned/ui/Skeleton/): Показывает скелеты шаблона во время загрузки приложения
- [Stack](/src/shared/ui/redesigned/Stack/):
  - [Flex](/src/shared/ui/redesigned/Stack/ui/Flex/): Компонент Flex, который принимает различные свойства и применяет их для создания гибкого контейнера с определенным стилем
  - [HStack](/src/shared/ui/redesigned/Stack/ui/HStack/): Для установки отступов в ширину
  - [VStack](/src/shared/ui/redesigned/Stack/ui/VStack/): Для установки отступов в высоту
- [Tabs](/src/shared/ui/redesigned/Tabs/): Компонент для отображения табов
- [Text](/src/shared/ui/redesigned/Text/): Компонент для отображения текста
