import {NotionService} from "./src/services/notion.service.js";
import Core from "@actions/core";
import Github from "@actions/github";

function main() {
    try {

        const commits = Github.context.payload.commits;
        const secret = Core.getInput('notion_secret');
        const database = Core.getInput('notion_database');

        commits.forEach((commit) => {
            const array = commit.message.split(/\r?\n/);
            const title = array.shift();

            let description = "";
            array.forEach((element) => {
                description += " " + element;
            });

            const notion = new NotionService(secret, database);
            notion.addItem({
                commitTittle: title,
                commitDescription: description,
                commitBy: commit.author.name,
                commitUrl: commit.url,
                project: Github.context.repo.repo,
                commitId: commit.id
            });
        });
    } catch (error) {
        console.error(error);
    }
}

main();
