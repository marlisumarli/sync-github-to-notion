import {NotionService} from "./src/services/notion.service.js";
import 'dotenv/config'
// core GitHub

const secret = process.env.NOTION_SECRET;
const database = process.env.DATABASE_ID;

const notion = new NotionService(secret, database);
notion.addItem({
    commitTittle: "Asd",
    commitDescription: "Dsa",
    commitBy: "Marleess",
    commitUrl: "https://www.postman.com/notionhq/workspace/notion-s-api-workspace/request/15568543-a027e2d4-11f2-4068-a82c-cb9fb8562036",
    project: "coba-project",
    commitId: "123"
});
