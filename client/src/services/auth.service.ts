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
