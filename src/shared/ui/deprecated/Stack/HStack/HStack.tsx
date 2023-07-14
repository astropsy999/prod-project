import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const HStack = memo((props: HStackProps) => (
  <Flex direction='row' {...props} />
));
