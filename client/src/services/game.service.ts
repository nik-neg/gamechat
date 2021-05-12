export const translateText = async (text: string) => {
  // const formData = new FormData();
  // formData.append('content', text);
  // formData.append('translatedContent', '');
  // formData.append('isQuestion', 'false');
  // formData.append('likes', '0');
  // formData.append('liked', 'false');
  // formData.append('createdAt', '2020-12-17T02:24:00.000Z');
  // formData.append('updatedAt', '2020-12-17T02:24:00.000Z');

  //const { formData } = this.state;
  // const formToSubmit = new FormData();
  // for (const key in formData) {
  //   formToSubmit.append(key, formData[key]);
  // }

  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: text,
      translatedContent: '',
      isQuestion: false,
      likes: 0,
      liked: false,
      createdAt: '2020-12-17T02:24:00.000Z',
      updatedAt: '2020-12-17T02:24:00.000Z',
    }),
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/message/1/gamechatroom/1`,
      option,
    );
    console.log(res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
