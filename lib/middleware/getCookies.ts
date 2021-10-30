import { NextRequest } from "next/server";
import Cookies from "universal-cookie";

export function getCookies(req: NextRequest): Record<string, string> {
  const universalCookie = new Cookies(req.headers.get("cookie"));
  return universalCookie.getAll();
}
