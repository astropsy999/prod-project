import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '../../../../shared/ui/deprecated/Drawer';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const { wasArticlesPageOpened } = useJsonSettings();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!wasArticlesPageOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ wasArticlesPageOpened: true }));
    }
  }, [dispatch, wasArticlesPageOpened]);

  const onClose = () => {
    setIsOpen(false);
  };

  const text = (
    <Text
      title={t('Welcome to the Articles Page')}
      text={t('Here you can find some interesting items')}
    />
  );

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
