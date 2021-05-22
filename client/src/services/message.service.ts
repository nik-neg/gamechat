import Message from '../interfaces/message';

export const generateMessage = async (
  userId: number,
  roomId: string,
  text: string,
  language: string,
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
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/${userId}/gamechatroom/${roomId}/${language}`,
      option,
    );
    console.log(res);
    const data: Message = await res.json();
    console.log('[game service] generateMessage', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const translateAllMessages = async (
  language: string,
  roomId: string,
): Promise<Message[] | []> => {
  const option = {
    method: 'PATCH',
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/gamechatroom/${roomId}/all/${language}`,
      option,
    );
    const data: Message[] = await res.json();
    console.log('[game service] translateAllMessages', data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAllMessages = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/all`,
    );
    const messages = await res.json();
    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAllMessagesFromChatRoom = async (roomId: string) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/gamechatroom/${roomId}`,
    );
    const messages = await res.json();
    return messages;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// export const translateMessage = async (): Promise<Message[] | []> => {
//   const option = {
//     method: 'PATCH',
//   };
//   try {
//     const res = await fetch(
//       `${process.env.REACT_APP_SERVER_BASE_URL}/message/gamechatroom/1/FR`,
//       option,
//     );
//     const data: Message[] = await res.json();
//     console.log('[game service] translateMessage', data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
