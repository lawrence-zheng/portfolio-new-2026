import { NextResponse } from "next/server"

/**
 * Routes that exist in the repo but should not be public: the component playground, plus case
 * studies hidden from the homepage for now (`hidden: true` in app/page.tsx).
 * Visible work-in-progress case studies are not listed here: they are reachable but password-gated
 * in their own page.tsx (see lib/case-study-access.ts).
 */
export const config = {
  matcher: ["/placeholder-project", "/govini", "/play-for-people-skills"],
}

export function middleware(request: Request) {
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 })
}
