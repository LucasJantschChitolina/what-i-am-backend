import { Client } from "@notionhq/client"
import dotenv from 'dotenv'
dotenv.config()

const notion = new Client({ auth: process.env.NOTION_KEY})

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(text) {
  try {
    await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: databaseId },
        properties: {
          title: { 
            title:[
              {
                "text": {
                  "content": text
                }
              }
            ]
          }
        }
      },
    })
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

export const getDatabase = async () => {
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });

        const responseResults = response.results.map((page) => {
                return {
                    id: page.id,
                    title: page.properties.Title.title[0].plain_text,
                    image_url: page.properties.ImageUrl.rich_text[0]?.plain_text,
                    description: page.properties.Description.rich_text[0]?.plain_text,
                    link_url: page.properties.LinkUrl.rich_text[0]?.plain_text
                };
            }

        )
        return responseResults;
    } catch (error) {
        console.error(error.body)
    }

    return responseResults;
};
