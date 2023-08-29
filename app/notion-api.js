import {Client} from "@notionhq/client";
import Core from "@actions/core";

export class NotionApi {
    notion;
    databaseId;

    constructor(secretKey, databaseId) {
        this.notion = new Client({auth: secretKey});
        this.databaseId = databaseId;
    }

    async addItem({commitTittle, commitDescription, commitBy, commitUrl, project, commitId}) {
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
                                    content: commitTittle
                                }
                            }
                        ]
                    },
                    description: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: commitDescription,
                                },
                            },
                        ],
                    },
                    commit_by: {
                        type: "multi_select",
                        multi_select: [
                            {
                                name: commitBy
                            }
                        ]
                    },
                    url: {
                        url: commitUrl
                    },
                    project: {
                        type: "multi_select",
                        multi_select: [
                            {
                                name: project
                            }
                        ]
                    },
                    commit_id: {
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
            Core.setFailed(`Error: ${error}`);
        }
    }
}
