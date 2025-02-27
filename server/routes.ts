import express, { Request, Response, Router } from "express";
import { getNews, getNewsBySlug, addNews } from "./data/newsService"

const router: Router = express.Router();

// Homepagina
router.get("/", (req: Request, res: Response): void => {
    const news = getNews()
    console.log(news)
  res.render("news", { title: "News" , news: news});
});

router.get("/news/:slug", (req: Request, res: Response): void => {
    const slug: string = req.params.slug;
    const newsSlug = getNewsBySlug(slug);
    console.log(newsSlug)
    res.render("news-detail", { title: "News Article" , news: newsSlug});
})

export default router;