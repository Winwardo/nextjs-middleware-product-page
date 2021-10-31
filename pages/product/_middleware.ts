import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getCookies } from "../../lib/middleware/getCookies";
import { getProductById } from "../../products";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookies = getCookies(req);
  const auth = cookies["Authorization"];
  const productId = req.page.params?.id;

  if (productId) {
    if (auth) {
      // Only do a more expensive check to the database if we have reason to believe they're a seller
      const product = await getProductById(productId);

      // Alternatively you could make anyone who's logged in as a seller see the SSR page
      // Rather than do a database call in the middleware
      if (auth === product?.sellerId) {
        return NextResponse.rewrite(`${req.nextUrl.pathname}/ssr`);
      }
    }
  }

  return NextResponse.next();
}
