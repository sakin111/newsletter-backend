

import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NewLetterService } from "./newsLetter.service";
import { envVar } from "../../config/env";








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
 




export const NewsLetterController ={
  GetNews
}