import Message from '../interfaces/message';

export const generateMessage = async (
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
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/1/gamechatroom/1/${language}`,
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

export const translateAllMessages = async (): Promise<Message[] | []> => {
  const option = {
    method: 'PATCH',
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/gamechatroom/1/all/FR`,
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
