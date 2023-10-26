import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN } from "./constants/cookies";
import { ROUTES } from "./constants/routes";
import { TokenDecoded } from "./store/services/auth/auth.types";
import { getUser } from "./helpers/auth";
import { isRouteAllowed } from "./helpers/routes";

export default function middleware(request: NextRequest) {
  // Tenta obter o token de autenticação do cookie
  const token = request.cookies.get(AUTH_TOKEN)?.value;

  // Define as URLs para a página de login e a raiz da seção "events"
  const loginURL = new URL(ROUTES.PUBLIC.LOGIN, request.url);
  const eventsURL = new URL(ROUTES.PRIVATE.EVENTS.ROOT, request.url);

  // Verifica se o token é válido usando a função getUser
  const user: TokenDecoded | null = token ? getUser(token) : null;

  // Se não há token ou o token não é válido
  if (!token || !user || !user.isValidToken) {
    // Se a rota atual é pública, prossegue sem redirecionar
    if (Object.values(ROUTES.PUBLIC).includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // Caso contrário, redireciona para a página de login
    return NextResponse.redirect(loginURL);
  }

  // Se há um token válido e o usuário está na página de login
  if (token && request.nextUrl.pathname === ROUTES.PUBLIC.LOGIN) {
    // Redireciona para a página "estagios"
    return NextResponse.redirect(eventsURL);
  }

  // Se o token é válido e o usuário está em outras rotas, permite o acesso
  return NextResponse.next();
}

// Configuração para definir em quais rotas este middleware deve ser aplicado
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
  ],
};
