/* eslint-disable @typescript-eslint/no-explicit-any */
import cron from "node-cron";
import { NewLetterService } from "./newsLetter.service";
import { envVar } from "../../config/env";
import { NewsArticle, NewsSource } from "./newsLetter.model";


cron.schedule("* * * * *", async () => {
  console.log("Cron Job Started: Fetching latest news...");

  try {

    const newsData = await NewLetterService.getNews(envVar.NEWS_LETTER_API_KEY, {});

    for (const article of newsData.articles) {
      const source = await NewsSource.findOne({ source_id: article.source_id });

      if (!source) {
        console.warn(`Source not found for article ${article.article_id}, skipping`);
        continue;
      }

  
      await NewsArticle.findOneAndUpdate(
        { article_id: article.article_id },
        { ...article, source: source._id },
        { upsert: true, new: true }
      );
    }

    console.log(`Cron Job Finished: ${newsData.articles.length} articles processed`);
  } catch (error: any) {
    console.error("Error in Cron Job:", error.message);
  }
});