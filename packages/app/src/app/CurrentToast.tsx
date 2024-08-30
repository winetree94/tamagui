import { Toast, useToastController, useToastState } from '@tamagui/toast';
import { Button, H4, XStack, YStack, getTokens, isWeb } from 'tamagui';
import { MyExpoButton } from '@expo-app/ui';

export function CurrentToast() {
  const currentToast = useToastState();
  const token = getTokens();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? token.size.$12 : token.size.$0}
      br={token.size.$6}
      animation='quick'
    >
      <YStack ai='center' p='$2' gap='$2'>
        <Toast.Title fow='bold'>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}

export function ToastControl() {
  const toast = useToastController();

  return (
    <YStack gap='$2' ai='center'>
      <H4>Toast demo</H4>
      <XStack gap='$2' jc='center'>
        <MyExpoButton
          onPress={() => {
            toast.show('Successfully saved!', {
              message: "Don't worry, we've got your data.",
            });
          }}
        >
          Show
        </MyExpoButton>
        <Button
          onPress={() => {
            toast.hide();
          }}
        >
          Hide
        </Button>
      </XStack>
    </YStack>
  );
}
