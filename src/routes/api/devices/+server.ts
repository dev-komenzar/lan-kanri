import { NOTION_DATABASE, NOTION_TOKEN } from '$env/static/private';
import { Client } from "@notionhq/client";
import dayjs from 'dayjs';
import type { RequestHandler } from './$types';


const notion = new Client({
  auth: NOTION_TOKEN
})
const  today = dayjs()

export const GET = (
  async() =>{
    const page = await notion.databases.query({
      database_id: NOTION_DATABASE,
      filter:{
        property: '支払い済',
        date: {
          after: today.format('YYYY-MM-DD')
        }
      }
    }).catch(
      e => {throw new Error(e)}
    )
      console.dir(page.results);
      

    return new Response(JSON.stringify(page.results))
  }
) satisfies RequestHandler