import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getCookies } from "../../lib/middleware/getCookies";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookies = getCookies(req);
  const auth = cookies["Authorization"];

  if (auth !== undefined) {
    return NextResponse.rewrite(`${req.nextUrl.pathname}/ssr`);
  }

  return NextResponse.next();
}
