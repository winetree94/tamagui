import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationEn from '@/assets/i18n/en-us.json';
import translationKo from '@/assets/i18n/ko-kr.json';

const resources = {
  'ko-KR': { translation: translationKo },
  'en-US': { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode || 'ko';
  }

  console.log('language: ', savedLanguage);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
