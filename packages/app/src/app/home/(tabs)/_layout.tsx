import { Link, Tabs } from 'expo-router';
import { Button, useTheme } from 'tamagui';
import { Atom, AudioWaveform } from '@tamagui/lucide-icons';
import { t } from 'i18next';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.accentBackground.val,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Atom color={color} />,
          headerRight: () => (
            <Link href='/modal' asChild>
              <Button mr='$4' bg='$purple8' color='$purple12'>
                Hello!
              </Button>
            </Link>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: t('chat.title'),
          tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
