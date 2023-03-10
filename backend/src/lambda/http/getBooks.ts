import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getBookForUser as getBookForUser } from '../../businessLogic/books'
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const books = await getBookForUser(getUserId(event))
    const items = books.Items
    return {
      statusCode: 200,
      body: JSON.stringify({items})
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
