import i18n from 'i18next';
import {initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources : {
        en: {
            translation: {
                'Sign Up' : 'Sign Up',
                'Password Mismatch' : 'Password Mismatch',
                'Username' : 'Username',
                'Displayname' : 'Displayname',
                'Password' : 'Password',
                'Password Repeat' : 'Password Repeat',
                'Login' : 'Login', 
                'Logout' : 'Logout'
            }
        },
        tr : {
            translation:{
                'Sign Up' : 'Kayit Ol',
                'Password Mismatch' : 'Sifre eslesmiyor',
                'Username' : 'Kullanici Adi',
                'Displayname' : 'Görünecek Isim' ,
                'Password' : 'Sifre',
                'Password Repeat' : 'Sifre Tekrar',
                'Login' : 'Giris Yap', 
                'Logout' : 'Cikis Yap'
            }
        }
    },
    fallbackLng : 'tr',
    ns : ['translation'],
    defaultNS: 'translation',
    keySeparator : false,
    interpolation:{
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;