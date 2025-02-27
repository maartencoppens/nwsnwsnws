import express, { Request, Response, Router } from "express";
import { getNews, getNewsBySlug, addNews } from "./data/newsService"
import { log } from "console";

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
    res.render("news-detail", { title: "News Article" , news: newsSlug});
})


router.get("/add", (req: Request, res: Response): void => {
    res.render("add-news", { title: "Add News" });
});

router.post("/news", (req: Request, res: Response): void => {
    const addNewsObject = {
        "title": req.body.articleTitle?.trim(),
        "content": req.body.articleContent?.trim(),
        "date": req.body.articleDate?.trim()
    }
    const addNewsVariable = addNews(addNewsObject)  
    console.log(addNewsVariable);
    res.render("/",)
})

export default router;