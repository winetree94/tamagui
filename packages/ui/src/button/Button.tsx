import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import { Button } from 'tamagui';

export type MyExpoButtonProps = ComponentProps<typeof Button>;

export type MyExpoButtonRef = ComponentRef<typeof Button>;

export const MyExpoButton = forwardRef<MyExpoButtonRef, MyExpoButtonProps>(
  function MyExpoButton(props, ref) {
    return <Button {...props} ref={ref}></Button>;
  },
);
