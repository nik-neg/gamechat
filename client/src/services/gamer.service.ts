export const fetchAllGamers = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/gamer`);
    const gamers = await res.json();
    return gamers;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAllGamersFromChatRoom = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/gamer/gamechatroom/${id}`,
    );
    const gamers = await res.json();
    return gamers;
  } catch (error) {
    console.log(error);
    return [];
  }
};
