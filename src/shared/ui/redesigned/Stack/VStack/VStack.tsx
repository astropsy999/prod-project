import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = memo((props: VStackProps) => {
  const { align = 'start' } = props;
  return <Flex {...props} direction='column' align={align} />;
});
