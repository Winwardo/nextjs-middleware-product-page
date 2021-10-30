import Cookies from "universal-cookie";

export function getCookies(ctx?: {
  req?: { headers?: { cookie?: string } };
}): Record<string, string> {
  const universalCookie = new Cookies(ctx?.req?.headers?.cookie);
  return universalCookie.getAll();
}
