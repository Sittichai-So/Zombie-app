import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import translationTH from './locales/th.json';
import translationEN from './locales/en.json';

export const resources = {
  th: { translation: translationTH },
  en: { translation: translationEN },
};

// Allow users to override the system language
const getDeviceLanguage = () => {
  const locale = Localization.getLocales()[0];
  if (locale) {
    return locale.languageCode === 'th' ? 'th' : 'en';
  }
  return 'en';
};

// Initialize i18n
const initI18n = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false,
    },
    returnNull: false, // Return key instead of null if translation not found
    returnEmptyString: false, // Return key instead of empty string
  });
  
  console.log('i18n initialized with language:', i18n.language);
};

initI18n();

// Allow RTL layout (not needed for this app but good practice)
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default i18n;
