/* eslint-disable @typescript-eslint/no-explicit-any */

import { envVar } from "../../config/env";
import cron from "node-cron"
import axios from "axios"
import { NewsArticle, NewsSource } from "./newsLetter.model";


async function getSourceId(source_id: string | null, source_name: string | null, url: string) {

  const sourceIdStr = source_id || source_name || url;

  const source = await NewsSource.findOneAndUpdate(
    { source_id: sourceIdStr },
    {
      source_id: sourceIdStr,
      name: source_name || "Unknown Source",
      url,
    },
    { upsert: true, new: true }
  );

  return source._id;
}




const fetchStoreData  = async () =>{
  try {
    const response = await axios.get(
       `https://newsdata.io/api/1/latest?apikey=${envVar.NEWS_LETTER_API_KEY}`
    )
    const news = response.data.results
   for (const item of news) {
  const sourceId = await getSourceId(item.source_id, item.source_name, item.link);

  await NewsArticle.updateOne(
    { article_id: item.guid || item.link },
    {
      article_id: item.guid || item.link,
      link: item.link,
      title: item.title,
      description: item.description,
      content: item.content,
      pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
      fetched_at: new Date(),
      source: sourceId,
      category: item.category || [],
      language: item.language || "",
      country: item.country || [],
      creator: item.creator || [],
      keywords: item.keywords || [],
    },
    { upsert: true }
  );
}
  } catch (error) {
    console.log("Cron Error:", error);
  }
}






let running  = false

export const cronJob = () => {
  cron.schedule("0 * * * *", async() =>{
    
  if(running)  return
  running = true
 console.log("Cron Job started: fetching News.... ")
    try {
      await fetchStoreData();
      console.log("News fetched and stored successfully");
    } catch (error) {
      console.error("Cron Error:", error);
    }finally{
      running = false
    }
  })
};