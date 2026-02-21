/* eslint-disable @typescript-eslint/no-explicit-any */
import { envVar } from "../../config/env";
import { NewsArticle } from "./newsLetter.model";




const getNews = async (apiKey: string, query: Record<string, any>) => {
  try {
    const baseUrl = envVar.BASE_URL;

    const params = new URLSearchParams({
      apikey: apiKey,
      ...query,
    });

    const url = `${baseUrl}?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

 
    for (const article of data.articles) {
      await NewsArticle.findOneAndUpdate(
        { article_id: article.article_id },
        article,
        { upsert: true, new: true }
      );
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    throw new Error("Failed to fetch news");
  }
};


export const NewLetterService = {
  getNews
}