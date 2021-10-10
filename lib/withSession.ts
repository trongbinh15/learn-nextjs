
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession, Session } from "next-iron-session";
type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
) => void | Promise<any>;


const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || "",
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })

export default withSession;