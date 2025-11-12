import { Request, Response } from "express";
import fs from "fs";
import path from "path";
const dataPath = path.join(__dirname, "../../data/faqs.json");


// Read the JSON data once (synchronously for simplicity)
const faqs = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// POST /api/search 
export const searchFAQs = (req: Request, res: Response) => {
    const { query } = req.body;

    if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Query cannot be empty" });
    }
    // converting the query to LowerCase 
    const searchTerm = query.toLowerCase();
    const scored = faqs
        .map((item: any) => {
            const titleScore = item.title.toLowerCase().includes(searchTerm) ? 2 : 0;
            const bodyScore = item.body.toLowerCase().includes(searchTerm) ? 1 : 0;
            const score = titleScore + bodyScore;
            return { ...item, score };
        })
        .filter((item: any) => item.score > 0)
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 3);// Taking top 3 Results 

    // Handle no matches
    if (scored.length === 0) {
        return res.status(200).json({
            message: "No matches found for your query.",
            results: [],
        });
    }

    // 5️⃣ Send response
    return res.status(200).json({
        results: scored.map((i: any) => ({
            id: i.id,
            title: i.title,
            snippet: i.body.slice(0, 80) + "...",
        })),
    });
};
