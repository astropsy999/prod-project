import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(
  ({ className, item }: NotificationItemProps) => {
    const content = (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={(
          <Card
            variant='light'
            className={classNames(cls.NotificationItem, {}, [className])}
          >
            <Text title={item.title} text={item.description} />
          </Card>
        )}
        off={(
          <CardDeprecated
            theme={CardTheme.OUTLINED}
            className={classNames(cls.NotificationItem, {}, [className])}
          >
            <TextDeprecated title={item.title} text={item.description} />
          </CardDeprecated>
        )}
      />
    );

    if (item.href) {
      return (
        <a
          className={cls.link}
          target={'_blank'}
          href={item.href}
          rel='noreferrer'
        >
          {content}
        </a>
      );
    }
    return content;
  },
);
