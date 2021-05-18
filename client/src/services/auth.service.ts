import Gamer from '../interfaces/gamer';

export const login = async (email: string, password: string) => {
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/gamer/login`,
      option,
    );
    const gamer = await res.json();
    console.log(`gamer`, gamer);
    return gamer;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const register = async (gamer: Gamer) => {
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...gamer,
    }),
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/gamer/register`,
      option,
    );
    const gamer = await res.json();
    return gamer;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const supportedLanguages = [
  {
    language: 'BG',
    name: 'Bulgarian',
  },
  {
    language: 'CS',
    name: 'Czech',
  },
  {
    language: 'DA',
    name: 'Danish',
  },
  {
    language: 'DE',
    name: 'German',
  },
  {
    language: 'EL',
    name: 'Greek',
  },
  {
    language: 'EN',
    name: 'English',
  },
  {
    language: 'ES',
    name: 'Spanish',
  },
  {
    language: 'ET',
    name: 'Estonian',
  },
  {
    language: 'FI',
    name: 'Finnish',
  },
  {
    language: 'FR',
    name: 'French',
  },
  {
    language: 'HU',
    name: 'Hungarian',
  },
  {
    language: 'IT',
    name: 'Italian',
  },
  {
    language: 'JA',
    name: 'Japanese',
  },
  {
    language: 'LT',
    name: 'Lithuanian',
  },
  {
    language: 'LV',
    name: 'Latvian',
  },
  {
    language: 'NL',
    name: 'Dutch',
  },
  {
    language: 'PL',
    name: 'Polish',
  },
  {
    language: 'PT',
    name: 'Portuguese',
  },
  {
    language: 'RO',
    name: 'Romanian',
  },
  {
    language: 'RU',
    name: 'Russian',
  },
  {
    language: 'SK',
    name: 'Slovak',
  },
  {
    language: 'SL',
    name: 'Slovenian',
  },
  {
    language: 'SV',
    name: 'Swedish',
  },
  {
    language: 'ZH',
    name: 'Chinese',
  },
];

export const fetchAllSupportedLanguage = async (userLanguage: string) => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    let url = `${process.env.REACT_APP_SERVER_BASE_URL}/gamer/languages`;
    url = encodeURI(url);
    const res = await fetch(url, option);
    const languages = res.json();
    return languages;
  } catch (error) {
    console.log(error);
    return [];
  }
};
