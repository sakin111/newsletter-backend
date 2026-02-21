import { Document, Types } from "mongoose";

export interface INewsArticle extends Document {
  article_id: string;
  link: string;
  title: string;
  description?: string;
  content?: string;
  keywords: string[];
  creator: string[];
  language: string;
  country: string[];
  category: string[];
  datatype: string;
  pubDate: Date;
  fetched_at: Date;
  image_url?: string;
  video_url?: string | null;
  source: Types.ObjectId;
  duplicate: boolean;
}




export interface INewsSource extends Document {
  source_id: string;
  name: string;
  url: string;
  icon?: string | null;
  priority: number;
}