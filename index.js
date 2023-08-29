import Core from "@actions/core";
import Github from "@actions/github";
import {NotionApi} from "./app/notion-api.js";

async function main() {
    try {
        const secret = Core.getInput('notion_secret');
        const database = Core.getInput('notion_database');
        const commits = Github.context.payload.commits;

        commits.forEach((commit) => {
            const array = commit.message.split(/\r?\n/);
            const title = array.shift();

            let description = "";
            array.forEach((element) => {
                description += " " + element;
            });

            const notion = new NotionApi(secret, database);
            notion.addItem({
                commitTittle: title,
                commitDescription: description,
                commitBy: commit.author.name,
                commitUrl: commit.url,
                project: Github.context.repo.repo,
                commitId: commit.id
            });
        });
        console.log(Github.context.payload.repository);
        console.log(Github.context.payload.installation);
    } catch (error) {
        Core.setFailed(`Error: ${error.message}`);
    }
}

main();
