import axios from "axios";

const getLinks = async () => {
  try {
    const data = await axios(process.env.SHEETS_API_URL || "");
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getLinks;
