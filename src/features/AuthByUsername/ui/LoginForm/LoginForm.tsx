import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        type='text'
        className={cls.input}
        placeholder={t('Введіть Ім‘я')}
        autofocus
      />
      <Input
        type='text'
        className={cls.input}
        placeholder={t('Введіть Пароль')}
      />
      <Button className={cls.loginBtn}>{t('Увійти')}</Button>
    </div>
  );
};
