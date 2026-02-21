import { Router } from "express";
import { newsLetterRoutes } from "../modules/newsLetter/newsLetter.route";




export const router = Router()

const RouteModules = [
    {
        path: "/user",
        route: newsLetterRoutes
    },

]





RouteModules.forEach((route) => {
    router.use(route.path, route.route)
})