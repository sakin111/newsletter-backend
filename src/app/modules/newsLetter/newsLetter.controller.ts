

import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NewLetterService } from "./newsLetter.service";

import { envVar } from "../../config/env";
import { NewsArticle } from "./newsLetter.model";
import { QueryBuilder } from "../../utils/QueryBuilder";








const GetNews = catchAsync(async (req: Request, res: Response) => {
  const queryParams = req.query;


  const result = await NewLetterService.getNews(envVar.NEWS_LETTER_API_KEY, queryParams);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "News retrieved successfully",
    data: result,
  });
});
 


export const queryNews = catchAsync(async (req: Request, res: Response) => {
  const { fromDate, toDate, ...query } = req.query;

  let modelQuery = NewsArticle.find();

  // Date range filter
  if (fromDate || toDate) {
    const dateFilter: Record<string, unknown> = {};
    if (fromDate) dateFilter.$gte = new Date(fromDate as string);
    if (toDate) dateFilter.$lte = new Date(toDate as string);
    modelQuery = modelQuery.find({ pubDate: dateFilter });
  }

  const searchableFields = ["title", "description", "content", "keywords", "creator"];
  const qb = new QueryBuilder(modelQuery, query as Record<string, string>);
  qb.filter().search(searchableFields).sort().fields().paginate();

  const data = await qb.build();
  const meta = await qb.getMeta();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "News queried successfully",
    data,
    meta,
  });
});



export const NewsLetterController ={
  GetNews
}