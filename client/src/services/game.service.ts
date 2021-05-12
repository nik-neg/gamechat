export const translateText = async (text: string) => {
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(text),
  };
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}`, option);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
