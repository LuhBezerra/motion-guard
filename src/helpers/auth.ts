import { ROUTES } from "@/constants/routes";
import { getCookie } from "./cookie";
import { AUTH_TOKEN } from "@/constants/cookies";
import { TokenDecoded } from "@/store/services/auth/auth.types";

export const checkIsPublicRoute = (asPath: string) => {
  // Pega os valores do objeto ROUTES.PUBLIC e transforma em um array
  const appPublicRoutes = Object.values(ROUTES.PUBLIC);

  // Verifica se a rota atual é uma rota pública
  return appPublicRoutes.includes(asPath);
}

export const checkIsAutenticatedUser = () => {
  return !!getCookie(AUTH_TOKEN);
}

// Função para obter o usuário a partir do token JWT
export const getUser = (token?: string): TokenDecoded | null => {
  // Obtém o token atual ou usa um valor padrão do cookie
  const currentToken = token || getCookie(AUTH_TOKEN);

  // Se não houver token, retorna null
  if (!currentToken) return null;

  // Divide o token em suas partes (cabeçalho, payload, assinatura)
  const tokenParts = currentToken.split('.');

  // Verifica se o token possui três partes
  if (tokenParts.length !== 3) return null;

  // Obtém o payload do token
  const [, payload] = tokenParts;

  // Se não houver payload, retorna null
  if (!payload) return null;

  try {
    // Decodifica o payload em base64 e o analisa como JSON
    const decodedPayload = JSON.parse(atob(payload));

    // Obtém a data de expiração do payload
    const { exp } = decodedPayload;

    // Se não houver data de expiração, retorna null
    if (!exp) return null;

    // Obtém o tempo atual em segundos
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // Calcula a validade do token com base na data de expiração
    const isValidToken = exp >= currentTimeInSeconds;

    // Retorna o payload com a propriedade isValidToken
    return { ...decodedPayload, isValidToken };
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return null;
  }
};
