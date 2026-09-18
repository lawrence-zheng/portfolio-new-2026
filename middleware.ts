import { NextResponse } from "next/server"

/**
 * Launch build only: the unfinished case studies still live in the repo so they can be
 * worked on, but their public routes return a 404 until each one ships.
 * To publish one, remove its path from `matcher` below and drop `comingSoon: true`
 * from its entry in `projectsData` (app/page.tsx).
 */
export const config = {
  matcher: [
    "/govini",
    "/play-for-people-skills",
    "/icpsr-project",
    "/delallo",
    "/placeholder-project",
  ],
}

export function middleware(request: Request) {
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 })
}
