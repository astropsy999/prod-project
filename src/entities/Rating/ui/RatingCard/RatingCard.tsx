import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/deprecated/Button/Button';
import { Card as CardDeprecated } from '../../../../shared/ui/deprecated/Card/Card';
import { Card } from '../../../../shared/ui/redesigned/Card/Card';
import { Drawer as DrawerDeprecated } from '../../../../shared/ui/deprecated/Drawer/Drawer';
import { Input as InputDeprecated } from '../../../../shared/ui/deprecated/Input/Input';
import { Modal } from '../../../../shared/ui/deprecated/Modal/Modal';
import { HStack, VStack } from '../../../../shared/ui/redesigned/Stack';
import { StarRating } from '../../../../shared/ui/deprecated/StarRating/StarRating';
import { Text as TextDeprecated } from '../../../../shared/ui/deprecated/Text/Text';
import { Text } from '../../../../shared/ui/redesigned/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (startCount: number) => void;
  onAccept?: (startCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo(
  ({
    className,
    onCancel,
    onAccept,
    feedbackTitle,
    hasFeedback,
    title,
    rate = 0,
  }: RatingCardProps) => {
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      },
      [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={(
          <>
            <Text title={feedbackTitle} />
            <Input
              data-testid='RatingCard.Input'
              value={feedback}
              onChange={setFeedback}
              placeholder={t('Ваш отзыв')}
            />
          </>
        )}
        off={(
          <>
            <TextDeprecated title={feedbackTitle} />
            <InputDeprecated
              data-testid='RatingCard.Input'
              value={feedback}
              onChange={setFeedback}
              placeholder={t('Ваш отзыв')}
            />
          </>
        )}
      />
    );

    const content = (
      <>
        {' '}
        <VStack align={'center'} gap={'8'}>
          <ToggleFeatures
            feature={'isAppRedesigned'}
            on={<Text title={starsCount ? t('Вы оценили статью') : title} />}
            off={(
              <TextDeprecated
                title={starsCount ? t('Вы оценили статью') : title}
              />
            )}
          />
          <StarRating
            selectedStars={starsCount}
            size={40}
            onSelect={onSelectStars}
          />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            <VStack max gap={'32'}>
              {modalContent}
              <ToggleFeatures
                feature={'isAppRedesigned'}
                on={(
                  <HStack gap={'16'} justify={'end'}>
                    <Button
                      data-testid='RatingCard.Close'
                      onClick={cancelHandler}
                    >
                      {t('Закрыть')}
                    </Button>
                    <ButtonDeprecated
                      data-testid='RatingCard.Send'
                      onClick={acceptHandler}
                    >
                      {t('Отправить')}
                    </ButtonDeprecated>
                  </HStack>
                )}
                off={(
                  <HStack gap={'16'} justify={'end'}>
                    <ButtonDeprecated
                      data-testid='RatingCard.Close'
                      onClick={cancelHandler}
                      theme={ButtonTheme.OUTLINE_RED}
                    >
                      {t('Закрыть')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      data-testid='RatingCard.Send'
                      onClick={acceptHandler}
                    >
                      {t('Отправить')}
                    </ButtonDeprecated>
                  </HStack>
                )}
              />
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <DrawerDeprecated isOpen={isModalOpen} lazy onClose={cancelHandler}>
            <VStack gap={'32'}>
              {modalContent}
              <ToggleFeatures
                feature={'isAppRedesigned'}
                on={(
                  <Button onClick={acceptHandler} size={'l'} fullWidth>
                    {t('Отправить')}
                  </Button>
                )}
                off={(
                  <ButtonDeprecated
                    onClick={acceptHandler}
                    size={ButtonSize.L}
                    fullWidth
                  >
                    {t('Отправить')}
                  </ButtonDeprecated>
                )}
              />
            </VStack>
          </DrawerDeprecated>
        </MobileView>
      </>
    );

    return (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={(
          <Card className={className} max data-testid='RatingCard'>
            {content}
          </Card>
        )}
        off={(
          <CardDeprecated className={className} max data-testid='RatingCard'>
            {content}
          </CardDeprecated>
        )}
      />
    );
  },
);
