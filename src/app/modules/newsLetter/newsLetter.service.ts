/* eslint-disable @typescript-eslint/no-explicit-any */
import { envVar } from "../../config/env";





const getNews = async (
  apiKey: string,
  query: Record<string, string>
) => {
  try {
    const baseUrl = envVar.BASE_URL;

    const filteredQuery: Record<string, string> = {};
    for (const key in query) {
      if (query[key]) filteredQuery[key] = query[key];
    }

    const params = new URLSearchParams({
      apikey: apiKey,
      ...filteredQuery,
    });

    const url = `${baseUrl}?${params.toString()}`;
    console.log(url, "this is url");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch news: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();


    if (!data || !Array.isArray(data.results)) {
      throw new Error("Invalid API response format");
    }

    return data.results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching news:", error.message);
    }
    throw new Error("Failed to fetch news");
  }
};

export const NewLetterService = {
  getNews
}