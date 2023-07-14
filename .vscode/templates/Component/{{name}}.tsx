import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './{{name}}.module.scss';


interface {{ name }}Props {
    className?:string;
}

export const {{name}} = memo((props: {{name}}Props) => {
    const {className} = props;

    return (<div className={classNames(cls.{{name}}, {}, [className])}></div>);
});