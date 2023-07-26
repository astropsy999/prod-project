import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Интерфейс для определения свойств компонента Portal
interface PortalProps {
  children: ReactNode; // Принимает дочерние элементы в качестве React узлов (node)
  element?: HTMLElement; // Необязательное свойство для указания DOM элемента, в который будет произведено портальное рендеринг
}

// Компонент Portal, который использует createPortal из React для портального рендеринга дочерних элементов в определенный DOM элемент
export const Portal = (props: PortalProps) => {
  const { children, element = document.body } = props;

  // createPortal() позволяет рендерить дочерние элементы (children) в указанный DOM элемент (element)
  // Возвращаемый результат createPortal() будет помещен в элемент, указанный вторым параметром (element)
  return createPortal(children, element);
};
