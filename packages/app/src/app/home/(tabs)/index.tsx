import { ToastControl } from '@/app/CurrentToast';
import { useAuthStore } from '@/store/auth';
import { ExternalLink } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Anchor, Button, H2, Paragraph, XStack, YStack } from 'tamagui';

export default function TabOneScreen() {
  const router = useRouter();

  const signOut = () => {
    useAuthStore.getState().signOut();
    router.replace('/auth/sign-in');
  };

  return (
    <YStack f={1} ai='center' gap='$8' px='$10' pt='$5'>
      <H2>Tamagui + Expo</H2>

      <XStack
        ai='center'
        jc='center'
        fw='wrap'
        gap='$1.5'
        pos='absolute'
        b='$8'
      >
        <ToastControl />

        <Button onPress={() => signOut()}>sign out</Button>

        <Paragraph fos='$5'>Add</Paragraph>

        <Paragraph fos='$5' px='$2' py='$1' col='$blue10' bg='$blue5' br='$3'>
          tamagui.config.ts
        </Paragraph>

        <Paragraph fos='$5'>to root and follow the</Paragraph>

        <XStack
          ai='center'
          gap='$1.5'
          px='$2'
          py='$1'
          br='$3'
          bg='$purple5'
          hoverStyle={{ bg: '$purple6' }}
          pressStyle={{ bg: '$purple4' }}
        >
          <Anchor
            href='https://tamagui.dev/docs/core/configuration'
            textDecorationLine='none'
            col='$purple10'
            fos='$5'
          >
            Configuration guide
          </Anchor>
          <ExternalLink size='$1' col='$purple10' />
        </XStack>

        <Paragraph fos='$5' ta='center'>
          to configure your themes and tokens.
        </Paragraph>
      </XStack>
    </YStack>
  );
}
