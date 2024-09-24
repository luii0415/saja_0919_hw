const API_KEY = process.env.REACT_APP_API_KEY_young;
const API_URL = process.env.REACT_APP_API_BASE_URL_young;
export const fetchYoungBookData = async () => {
  const numOfRows = 5; // 요청 레코드 수
  const pageNo = 1; // 페이지 번호
  const url = `${API_URL}?serviceKey=${API_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
