import { Popover as HPopover } from '@headlessui/react';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { MapDirectionClass } from '../../styles/consts';
import cls from './Popover.module.scss';
import popupsCls from '../../styles/popups.module.scss';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = memo(
  ({
    className,
    trigger,
    direction = 'bottom-left',
    children,
  }: PopoverProps) => {
    const menuClasses = [MapDirectionClass[direction], popupsCls.menu];

    return (
      <HPopover
        className={classNames(cls.Popover, {}, [className, popupsCls.popups])}
      >
        <>
          <HPopover.Button as={'div'} className={popupsCls.trigger}>
            {trigger}
          </HPopover.Button>

          <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
            {children}
          </HPopover.Panel>
        </>
      </HPopover>
    );
  },
);
