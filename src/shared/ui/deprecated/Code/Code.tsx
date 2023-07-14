import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CopyBtn from '@/shared/assets/icons/copy-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}
/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const Code = memo(({ className, text }: CodeProps) => {
  const { t } = useTranslation();

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
      >
        <CopyBtn className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
