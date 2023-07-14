import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const VStack = memo((props: VStackProps) => {
  const { align = 'start' } = props;
  return <Flex {...props} direction='column' align={align} />;
});
