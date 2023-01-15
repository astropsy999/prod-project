import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Popover } from '@/shared/ui/Popups';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(
  ({ className }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onDrawerOpen = useCallback(() => {
      setIsOpen(true);
    }, []);

    const onDrawerClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const trigger = (
      <Button onClick={onDrawerOpen} theme={ButtonTheme.CLEAR}>
        <Icon Svg={NotificationIcon} inverted />
      </Button>
    );

    return (
      <>
        <BrowserView>
          <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction='bottom-left'
            trigger={trigger}
          >
            <NotificationList className={cls.notifications} />
          </Popover>
        </BrowserView>
        <MobileView>
          {trigger}
          <Drawer isOpen={isOpen} onClose={onDrawerClose}>
            <NotificationList />
          </Drawer>
        </MobileView>
      </>
    );
  },
);
