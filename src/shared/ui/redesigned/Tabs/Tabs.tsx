import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import cls from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo(
  ({ className, tabs, onTabClick, value, direction = 'row' }: TabsProps) => {
    const { t } = useTranslation();

    const clickHandle = useCallback(
      (tab: TabItem) => () => {
        onTabClick(tab);
      },
      [onTabClick],
    );

    return (
      <Flex
        className={classNames(cls.Tabs, {}, [className])}
        direction={direction}
        align='start'
        gap={'8'}
      >
        {tabs.map((tab) => {
          const isSelected = tab.value === value;
          return (
            <Card
              variant={isSelected ? 'light' : 'normal'}
              className={classNames(
                cls.tab,
                { [cls.selected]: isSelected },
                [],
              )}
              key={tab.value}
              onClick={clickHandle(tab)}
              border='round'
            >
              {tab.content}
            </Card>
          );
        })}
      </Flex>
    );
  },
);
