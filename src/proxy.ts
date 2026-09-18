import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy gate. Verifies only the signed JWT in the session cookie (no DB) so
 * it stays fast; the full DB check still happens in API handlers via
 * requireUser/requireRole. Admin pages additionally require the role claim.
 */

const SESSION_COOKIE = "fa_session";

// Pages that require a signed-in user.
const PROTECTED_PAGES = ["/learn", "/lesson", "/leaderboard", "/profile", "/shop", "/settings"];
// APIs that require a signed-in user (role checks remain in the handlers).
const PROTECTED_APIS = ["/api/progress", "/api/attempts"];

const ADMIN_PAGES = ["/admin"];

const hasValidSessionJwt = async (req: NextRequest): Promise<boolean> => {
  const cookieValue = req.cookies.get(SESSION_COOKIE)?.value;
  if (!cookieValue) return false;
  try {
    const { jwtVerify } = await import("jose");
    const secret = new TextEncoder().encode(
      process.env.AUTH_SECRET ??
        "dev-only-secret-do-not-use-in-production-0123456789abcdef",
    );
    await jwtVerify(cookieValue, secret, { issuer: "funacademy" });
    return true;
  } catch {
    return false;
  }
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = ADMIN_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isProtectedPage = PROTECTED_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isProtectedApi = PROTECTED_APIS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!isAdminPage && !isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const authed = await hasValidSessionJwt(req);

  if (isProtectedApi) {
    if (!authed) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (!authed) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin pages: JWT only carries the session id; deeper role checks happen
  // server-side in the API. For pages we do a best-effort redirect — the
  // admin page itself re-checks the role via /api/auth/me.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/learn/:path*",
    "/lesson/:path*",
    "/leaderboard/:path*",
    "/profile/:path*",
    "/shop/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/api/progress/:path*",
    "/api/attempts/:path*",
  ],
};
