import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonTheme } from '../../../Button/Button';
import { Card } from '../../../Card/Card';
import { Drawer } from '../../../Drawer/Drawer';
import { Input } from '../../../Input/Input';
import { Modal } from '../../../Modal/Modal';
import { HStack, VStack } from '../../../Stack';
import { StarRating } from '../../../StarRating/StarRating';
import { Text } from '../../../Text/Text';

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
      <>
        <Text title={feedbackTitle} />
        <Input
          value={feedback}
          onChange={setFeedback}
          placeholder={t('Ваш отзыв')}
        />
      </>
    );

    return (
      <Card className={className} max>
        <VStack align={'center'} gap={'8'}>
          <Text title={starsCount ? t('Вы оценили статью') : title} />
          <StarRating
            selectedStars={starsCount}
            size={40}
            onSelect={onSelectStars}
          />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            {modalContent}
            <VStack max gap={'32'}>
              <HStack gap={'16'} justify={'end'}>
                <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                  {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandler}>{t('Отправить')}</Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
            <VStack gap={'32'}>
              {modalContent}
              <Button onClick={acceptHandler} size={ButtonSize.L} fullWidth>
                {t('Отправить')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </Card>
    );
  },
);
