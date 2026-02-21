import { Schema, model } from "mongoose";
import { INewsArticle, INewsSource } from "./newsLetter.interface";


const newsArticleSchema = new Schema<INewsArticle>(
  {
    article_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: String,
    content: String,
    keywords: {
      type: [String],
      default: [],
    },
    creator: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      index: true,
    },
    country: {
      type: [String],
      index: true,
    },
    category: {
      type: [String],
      index: true,
    },
    datatype: String,
    pubDate: {
      type: Date,
      required: true,
      index: true,
    },
    fetched_at: {
      type: Date,
      required: true,
    },
    image_url: String,
    video_url: {
      type: String,
      default: null,
    },
    source: {
      type: Schema.Types.ObjectId,
      ref: "NewsSource",
      required: true,
    },
    duplicate: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export const NewsArticle = model<INewsArticle>(
  "NewsArticle",
  newsArticleSchema
);




const newsSourceSchema = new Schema<INewsSource>(
  {
    source_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const NewsSource = model<INewsSource>(
  "NewsSource",
  newsSourceSchema
);