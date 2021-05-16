export const fetchAllGamesFromAPI = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/game/rawg`,
    );
    const games = await res.json();
    return games;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAllGamesFromDB = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/game/db`);
    const games = await res.json();
    return games;
  } catch (error) {
    console.log(error);
    return [];
  }
};
