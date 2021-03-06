import React from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = (props) => {
    const onChangeLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }


    return (
        <div className='container'>
            <img src="https://flagcdn.com/32x24/tr.png" alt="Türkce" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }}></img>
            <img src="https://flagcdn.com/32x24/gb.png" alt="English" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }}></img>
        </div>
    );
};

export default withTranslation()(LanguageSelector);