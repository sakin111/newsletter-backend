import { Router } from "express";
import { NewsLetterController } from "./newsLetter.controller";
import { validateRequest } from "../../middleware/validateRequest";

import { createNewsArticleValidation } from "./newLetter.validation"






const router = Router()


router.get("/latestNews", validateRequest(createNewsArticleValidation), NewsLetterController.GetNews)



export const newsLetterRoutes = router