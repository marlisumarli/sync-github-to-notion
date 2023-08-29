import {Client} from "@notionhq/client";
import Core from "@actions/core";

export class NotionApi {
    notion;
    databaseId;

    constructor(secretKey, databaseId) {
        this.notion = new Client({auth: secretKey});
        this.databaseId = databaseId;
    }

    async addItem({commitTitle, commitDescription, commitBy, branch, commitUrl, project, commitId}) {
        try {
            return await this.notion.pages.create({
                parent: {
                    database_id: this.databaseId
                },
                properties: {
                    title: {
                        title: [
                            {
                                type: "text",
                                text: {
                                    content: commitTitle
                                }
                            }
                        ]
                    },
                    [Core.getInput('commit_description')]: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: commitDescription,
                                },
                            },
                        ],
                    },
                    [Core.getInput('commit_by')]: {
                        type: "select",
                        select: {
                            name: commitBy
                        }
                    },
                    [Core.getInput('commit_branch')]: {
                        type: "select",
                        select: {
                            name: branch
                        }
                    },
                    [Core.getInput('commit_url')]: {
                        url: commitUrl
                    },
                    [Core.getInput('project')]: {
                        type: "select",
                        select: {
                            name: project
                        }
                    },
                    [Core.getInput('commit_id')]: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: commitId,
                                },
                            },
                        ],
                    }
                },
            });
        } catch (error) {
            Core.setFailed(error);
        }
    }
}
