import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { VStack } from 'shared/ui/Stack';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <VStack
        max
        gap={'16'}
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width={'100%'} border={'8px'} height={'60px'} />
        <Skeleton width={'100%'} border={'8px'} height={'60px'} />
        <Skeleton width={'100%'} border={'8px'} height={'60px'} />
      </VStack>
    );
  }

  return (
    <VStack
      max
      gap={'16'}
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
