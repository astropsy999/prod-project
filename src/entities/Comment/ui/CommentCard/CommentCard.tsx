import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as ApplinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/deprecated/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });
  if (isLoading) {
    return (
      <VStack
        data-testid='CommentCard.Loading'
        gap={'8'}
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border={'50%'} />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width={'100%'} height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Card padding={'24'} max border='partial'>
          <VStack
            data-testid='CommentCard.Content'
            gap={'8'}
            max
            className={classNames(cls.CommentCardRedesigned, {}, [className])}
          >
            <AppLink to={getRouteProfile(comment?.user.id)}>
              <HStack gap={'8'}>
                {comment?.user.avatar ? (
                  <Avatar size={30} src={comment?.user.avatar} />
                ) : null}
                <Text title={comment?.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment?.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          data-testid='CommentCard.Content'
          gap={'8'}
          max
          className={classNames(cls.CommentCard, {}, [className])}
        >
          <ApplinkDeprecated
            to={getRouteProfile(comment?.user.id)}
            className={cls.header}
          >
            {comment?.user.avatar ? (
              <AvatarDeprecated size={30} src={comment?.user.avatar} />
            ) : null}
            <TextDeprecated
              className={cls.username}
              title={comment?.user.username}
            />
          </ApplinkDeprecated>
          <Text className={cls.text} text={comment?.text} />
        </VStack>
      }
    />
  );
});
