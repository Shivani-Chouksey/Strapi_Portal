import Home from "@/components/pages/Home";
import axios from "axios";
import { Metadata } from "next";
const BaseUrl = "http://localhost:1337/api/home-page?locale=en&populate=deep";

const getApiData = async () => {
  try {
    const responseData = await axios.get(BaseUrl);
    return responseData.data?.data;
  } catch (error) {
    console.error(error);
  }
};

// Dynamic metadata function
export async function generateMetadata() {
  const data = await getApiData();

  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

export default async function HomePage() {
  const homePageAllData = await getApiData();
  return (
    <>
      <Home homePageAllData={homePageAllData} />
    </>
  );
}
