import Message from '../interfaces/message';

export const generateMessage = async (
  text: string,
): Promise<Message | undefined> => {
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: text,
      translatedContent: {},
      isQuestion: false,
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/1/gamechatroom/1`,
      option,
    );
    const data: Message = await res.json();
    console.log('[game service] generateMessage', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const translateText = async (): Promise<Message[] | []> => {
  const option = {
    method: 'PATCH',
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/gamechatroom/1/EN`,
      option,
    );
    const data: Message[] = await res.json();
    console.log('[game service] translateText', data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
