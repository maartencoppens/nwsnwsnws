import express, { Request, Response, Router } from "express";
import { News, getAllNews, getNewsBySlug, insertNews, removeNews } from "./services/newsService";



const router: Router = express.Router();



// Homepagina
router.get("/", async (req: Request, res: Response) => {
    const news: News[] = await getAllNews();
    res.render("news", { news, title: "Recent nieuws" });
});
  

router.get("/news/:slug", async (req: Request, res: Response) => {
    const slug: string = req.params.slug;
    const news: News = await getNewsBySlug(slug);
 
    res.render("news-detail", { title: "News Article" , news});
})


router.get("/add", (req: Request, res: Response): void => {
    res.render("add-news", { title: "Add News" });
});

router.post("/news", (req: Request, res: Response): void => {
    // const addNewsObject = {
    //     "title": req.body.articleTitle?.trim(),
    //     "content": req.body.articleContent?.trim(),
    //     "date": req.body.articleDate?.trim()
    // }
    const newNewsTitle: string = req.body.articleTitle?.trim();
    // const newNewsSlug: string = req.body.articleSlug?.trim();
    const newNewsContent: string = req.body.articleContent?.trim();

    const addNewsVariable = insertNews(newNewsTitle, newNewsContent);  
    console.log(addNewsVariable);
    res.redirect("/")
})

export default router;