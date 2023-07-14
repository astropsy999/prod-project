import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
  className?: string;
}

/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const Loader = ({ className }: LoaderProps) => (
  <div className={classNames('lds-roller', {}, [className])}>
    <div className='lds-ellipsis'>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
