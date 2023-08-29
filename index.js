import Core from "@actions/core";
import Github from "@actions/github";
import {NotionApi} from "./app/notion-api.js";

async function main() {
    try {

        const commits = Github.context.payload.commits;
        const secret = Core.getInput('NOTION_SECRET');
        const database = Core.getInput('NOTION_DATABASE');

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
    } catch (error) {
        Core.setFailed(`Error: ${error}`);
    }
}

main();
