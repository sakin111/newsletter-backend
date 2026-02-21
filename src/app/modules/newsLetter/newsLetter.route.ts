import { Router } from "express";
import { NewsLetterController } from "./newsLetter.controller";
import { validateRequest } from "../../middleware/validateRequest";

import { createNewsArticleValidation } from "./newLetter.validation"

import { queryNews } from "./newsLetter.controller"


const router = Router()



router.get("/latestNews", validateRequest(createNewsArticleValidation), NewsLetterController.GetNews)

router.get("/query-news", queryNews);



export const newsLetterRoutes = router