import { DropdownDirection } from '../../../types/ui';
import cls from './popups.module.scss';

export const MapDirectionClass: Record<DropdownDirection, string> = {
  'bottom-left': cls.optionsBottomLeft,
  'bottom-right': cls.optionsBottomRight,
  'top-right': cls.optionsTopRight,
  'top-left': cls.optionsTopLeft,
};
