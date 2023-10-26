function isObject(value: any): boolean {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

interface InitialRoute {
  ROOT: string;
}

export default function addRoutePrefix<M extends Record<string, {}>>(
  prefix: string,
  routes: M
): M & InitialRoute {
  const initial: M & InitialRoute = Object.assign(
    {
      ROOT: prefix,
    },
    routes
  );

  return Object.keys(routes).reduce(
    (accumulator: M & InitialRoute, key: string) =>
      Object.assign(accumulator, {
        [key]: isObject(routes[key])
          ? addRoutePrefix(prefix, routes[key])
          : `${prefix}${routes[key]}`,
      }),
    initial
  );
}

// Esta função verifica se um determinado 'pathname' está contido em uma lista de 'allowedRoutes'.
export function isRouteAllowed(pathname: string, allowedRoutes: string[]): boolean {

  // Divide o 'pathname' em segmentos baseado no caracter '/'.
  // Por exemplo, "/estagios/123" torna-se ["estagios", "123"].
  // O 'filter' remove quaisquer segmentos vazios que possam surgir de múltiplas barras.
  const pathSegments = pathname.split('/').filter(segment => segment);

  // Itera sobre cada rota na lista 'allowedRoutes' para verificar se o 'pathname' é permitido.
  for (const route of allowedRoutes) {

    // Divide a 'route' atual em segmentos, assim como fizemos com 'pathname'.
    const routeSegments = route.split('/').filter(segment => segment);

    // Verifica se os números de segmentos são diferentes entre 'pathname' e 'route'.
    // Se forem, então essa 'route' não pode ser uma correspondência para 'pathname'.
    if (pathSegments.length !== routeSegments.length) {
      continue; // Ignora a iteração atual e vai para a próxima 'route'.
    }

    // Assume que a 'route' é uma correspondência até que se prove o contrário.
    let matches = true;

    // Itera sobre cada segmento da 'route'.
    for (let i = 0; i < routeSegments.length; i++) {

      // Se o segmento da 'route' começa com ':' ou se o segmento da 'route' 
      // corresponde exatamente ao segmento de 'pathname', considera esse segmento como correspondente.
      if (routeSegments[i].startsWith(':') || routeSegments[i] === pathSegments[i]) {
        continue; // Ignora a iteração atual e vai para o próximo segmento.
      } else {
        // Se qualquer um dos segmentos não corresponder (e não for um curinga começando com ':'),
        // define 'matches' como false e sai do loop.
        matches = false;
        break;
      }
    }

    // Se todos os segmentos corresponderam (ou foram considerados curingas),
    // retorna 'true' indicando que o 'pathname' é permitido.
    if (matches) {
      return true;
    }
  }

  // Se nenhum 'allowedRoute' correspondeu ao 'pathname', retorna 'false'.
  return false;
}