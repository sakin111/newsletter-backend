import dotenv from "dotenv"

dotenv.config()

export interface envConfig {
    PORT: string,
    DB_URL: string,
    FRONTEND_URL: string
    NEWS_LETTER_API_KEY: string
    BASE_URL:string

}


const envProviders = (): envConfig => {
    const requiredConfig: string[] = ['PORT', 'DB_URL','FRONTEND_URL','NEWS_LETTER_API_KEY','BASE_URL']
    requiredConfig.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`please define the ${key} in your .env file`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        NEWS_LETTER_API_KEY: process.env.NEWS_LETTER_API_KEY as string,
        BASE_URL: process.env.BASE_URL as string

    }
}




export const envVar = envProviders()
