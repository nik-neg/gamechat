export const makeAllChatRooms = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/gamechatroom/makeAll`,
    );
    const games = await res.json();
    return games;
  } catch (error) {
    console.log(error);
    return [];
  }
};
