import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { Button } from '../../../Button/Button';
import { MapDirectionClass } from '../../styles/consts';
import popupsCls from '../../styles/popups.module.scss';
import cls from './ListBox.module.scss';
import { Icon } from '../../../Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom-right',
    label,
  } = props;

  const optionsClasses = [MapDirectionClass[direction], popupsCls.menu];

  const selectedItem = useMemo(() => items?.find((item) => item.value === value), [items, value]);

  return (
    <HStack gap={'4'}>
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as={'div'}
        className={classNames(cls.ListBox, {}, [className, popupsCls.popups])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button
            variant='filled'
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupsCls.active]: active,
                    [popupsCls.disabled]: item.disabled,
                    [popupsCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
