import { useState } from 'react';
import { appLanguages } from '../../common/constants';
import useLanguage from '../../hooks/useLanguage';
import Clickable from './Clickable';

const LanguageSwitcher: React.FC = () => {
  const { isRtl, language, changeLanguage } = useLanguage();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onLanguageButtonClick = (locale: string) => {
    changeLanguage(locale);
    setOpen(false);
  };

  const selectedLanguage =
    appLanguages.find(item => item.locale === language) || appLanguages[0];

  return (
    <div className="relative group">
      <Clickable
        className="p-1  text-black flex items-center "
        onClick={toggleOpen}
      >
        <img
          src={`https://cdn.nyaladev.com/barmaga.io/${selectedLanguage.icon}`}
          className={`w-4 ${isRtl ? 'ml-2' : 'mr-2'}`}
          alt={`${selectedLanguage.label} Flag`}
        />
        <span>{selectedLanguage.label}</span>
      </Clickable>

      <div
        className={`${
          open ? '' : 'hidden'
        } items-center w-32 absolute border border-t-0 rounded-b bg-white p-2 z-50 ${
          isRtl ? 'left-0' : 'right-0'
        }`}
      >
        {appLanguages.map(lang => (
          <Clickable
            key={lang.locale}
            className="flex items-center focus:outline-none border-transparent px-2 py-2  text-black hover:bg-grey-lighter"
            onClick={() => onLanguageButtonClick(lang.locale)}
          >
            <img
              src={`https://cdn.nyaladev.com/barmaga.io/${lang.icon}`}
              className={`w-4 ${isRtl ? 'ml-2' : 'mr-2'}`}
              alt={`${selectedLanguage.label} Flag`}
            />
            {lang.label}
          </Clickable>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
