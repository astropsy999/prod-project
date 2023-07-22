import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  ({ className }: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={(
          <Card padding='16' max border='partial'>
            <HStack
              max
              justify={'between'}
              className={classNames('', {}, [className])}
            >
              <Text title={t('Профиль пользователя')} />
              {canEdit && (
                <div>
                  {readonly ? (
                    <Button
                      variant={'outline'}
                      onClick={onEdit}
                      data-testid={'EditableProfileCardHeader.EditButton'}
                    >
                      {t('Редактировать')}
                    </Button>
                  ) : (
                    <HStack gap={'8'}>
                      <Button
                        variant={'outline'}
                        onClick={onCancelEdit}
                        data-testid={'EditableProfileCardHeader.CancelButton'}
                        color='error'
                      >
                        {t('Отменить')}
                      </Button>
                      <Button
                        variant={'outline'}
                        onClick={onSave}
                        data-testid={'EditableProfileCardHeader.SaveButton'}
                        color='success'
                      >
                        {t('Сохранить')}
                      </Button>
                    </HStack>
                  )}
                </div>
              )}
            </HStack>
          </Card>
        )}
        off={(
          <HStack
            max
            justify={'between'}
            className={classNames('', {}, [className])}
          >
            <TextDeprecated title={t('Профиль пользователя')} />
            {canEdit && (
              <div>
                {readonly ? (
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                    data-testid={'EditableProfileCardHeader.EditButton'}
                  >
                    {t('Редактировать')}
                  </ButtonDeprecated>
                ) : (
                  <HStack gap={'8'}>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEdit}
                      data-testid={'EditableProfileCardHeader.CancelButton'}
                    >
                      {t('Отменить')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                      data-testid={'EditableProfileCardHeader.SaveButton'}
                    >
                      {t('Сохранить')}
                    </ButtonDeprecated>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        )}
      />
    );
  },
);
