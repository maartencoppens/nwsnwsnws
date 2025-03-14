// Importeer sql uit db.ts
import sql from "./db";

// Interface voor een nieuwsartikel
export interface News {
  id?: number;
  slug?: string;
  title: string;
  content?: string;
  image_url?: string;
  created_at?: string;
}

export interface Comments {
  id: number;
  created_at?: string;
  news_id: number;
  author: string;
  comment: string;
}

// Alle nieuwsartikelen ophalen
export async function getAllNews(): Promise<News[]> {
  try {
    const data: News[] = await sql`select * from news`;
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Could not fetch news: " + error);
  }
}

export async function getNewsBySlug(slug: string): Promise<News> {
  try {
    const data: News[] = await sql`select * from news where slug = ${slug}`;
    return data[0];
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Could not fetch news: " + error);
  }
}

export async function insertNews(title: string, content: string) {
  try {
    const slug: string = title.toLowerCase().replace(/\s/g, "-");

  await sql`INSERT INTO news (title, slug, content)
                          VALUES (${title}, ${slug}, ${content});`;
  } catch (error) {
    console.error("Error inserting news:", error);
    throw new Error("Could not insert news: " + error);
  }
}

export async function removeNews(slug: string): Promise<News[]> {
  try {
    const data: News[] = await sql`DELETE FROM news WHERE slug = ${slug};`;
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Could not fetch news: " + error);
  }
}

export async function getAllComments(): Promise<News[]> {
  try {
    const data: News[] = await sql`SELECT * FROM comments`;
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Could not fetch comments: " + error);
  }
}

export async function getCommentByNews(newsId: number): Promise<Comments[]> {
  try {
    const data: Comments[] = await sql`SELECT * FROM comments 
    WHERE news_id = ${newsId} 
    ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Could not fetch comments: " + error);
  }
}
export async function addComment(
  newsId: string,
  author: string,
  comment: string
) {
  try {
      await sql`INSERT INTO comments (news_id, author, comment) 
    VALUES (${newsId}, ${author}, ${comment});`;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Could not fetch comments: " + error);
  }
}
