import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, rootRedirectPath } from "@/lib/i18n";

// Sends German and French visitors from "/" to their language route. Only "/" is matched:
// /de and /fr are always served as requested, so shared links keep their language.
export function middleware(request: NextRequest) {
  const target = rootRedirectPath(request.cookies.get(LANG_COOKIE)?.value, request.headers.get("accept-language"));
  if (!target) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: "/" };
