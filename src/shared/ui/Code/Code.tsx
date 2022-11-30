import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import CopyBtn from 'shared/assets/icons/copy-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  children: ReactNode;
}

export const Code = memo(({ className, children }: CodeProps) => {
  const { t } = useTranslation();

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
        <CopyBtn className={cls.copyIcon} />
      </Button>
      <code>{children}</code>
    </pre>
  );
});
