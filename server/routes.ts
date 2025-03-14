import express, { Request, Response, Router } from "express";
import { News, Comments, getAllNews, getNewsBySlug, insertNews, removeNews, getAllComments, getCommentByNews, addComment } from "./services/newsService";



const router: Router = express.Router();



// Homepagina
router.get("/", async (req: Request, res: Response) => {
    const news: News[] = await getAllNews();
    res.render("news", { news, title: "Recent nieuws" });
});
  
router.get("/news/delete/:slug", async (req: Request, res: Response) => {
    const slug: string = req.params.slug;
     await removeNews(slug);
 
     res.redirect("/")

})

router.get("/news/:slug", async (req: Request, res: Response) => {
    const slug: string = req.params.slug;
    const news: News = await getNewsBySlug(slug);
    console.log(news.id);
    const newsId = news.id;
    if (newsId !== undefined) {
        const comments: Comments[] = await getCommentByNews(newsId);
        console.log(comments);
        
        res.render("news-detail", { title: "News Article", news, comments });
    } else {
        res.status(404).send("News not found");
    }
})


router.get("/add", (req: Request, res: Response): void => {
    res.render("add-news", { title: "Add News" });
});

router.post("/news", (req: Request, res: Response): void => {
    const newNewsTitle: string = req.body.articleTitle?.trim();
    const newNewsContent: string = req.body.articleContent?.trim();

    const addNewsVariable = insertNews(newNewsTitle, newNewsContent);  
    console.log(addNewsVariable);
    res.redirect("/")
})

router.get("/comments", async (req: Request, res: Response) => {
    const comments: News[] = await getAllComments();
    console.log(comments);
    
    res.render("comments", { comments, title: "Comments" });
});

//add Comment:
router.post("/add-comment", (req: Request, res: Response): void => {
    const news_id: string = String(req.body.news_id?.trim());
    const commentProfileName: string = req.body.commentProfileName?.trim();
    const commentContent: string = req.body.commentContent?.trim();

    const addCommentVariable = addComment(news_id, commentProfileName, commentContent)

    // const addNewsVariable = (commentProfileName, commentContent);  
    // console.log(addNewsVariable);
    res.redirect("/")
})


export default router;