import { addYears, differenceInWeeks, parseISO } from "date-fns";

export function isMenorDeIdade(dataNascimento?: string) {
  if (!dataNascimento) return undefined;
  // Converte a data de nascimento para um objeto Date
  const dataNascimentoObj = new Date(dataNascimento);

  // Obtém a data atual
  const dataAtual = new Date();

  // Calcula a diferença em milissegundos entre as datas
  const diferencaEmMilissegundos =
    dataAtual.getTime() - dataNascimentoObj.getTime();

  // Converte a diferença em milissegundos para anos
  const idade = Math.floor(
    diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25)
  );

  // Define a idade limite para ser considerado menor de idade (18 anos)
  const idadeLimite = 18;

  // Verifica se a idade é menor que o limite
  return idade < idadeLimite;
}

export function calcularNumeroSemanas(
  dataInicial: string,
  dataFinal: string
): number {
  const dataInicialObj = parseISO(dataInicial);
  const dataFinalObj = parseISO(dataFinal);

  // Calcula o número de semanas completas entre as duas datas
  const numeroSemanas = differenceInWeeks(dataFinalObj, dataInicialObj);

  return numeroSemanas;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
export function stringToHours(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
}

// Função para calcular a data final 2 anos após a data inicial
export function calcularDataFinalMaximaEstagio(dataInicial: Date): Date {
  const dataFinal = addYears(dataInicial, 2);

  return new Date(dataFinal);
}

// Alguns datas como por exemplo '2021-01-01' são interpretadas como 31/12/2020, ou consideradas invalidas e por isso é necessário fazer essa conversão
export function padronizarData(dataStr?: string | Date) {
  // Se 'dataStr' estiver vazio (null, undefined ou string vazia), retorna undefined.
  if (!dataStr) return undefined;

  // Declara uma variável 'data' que será usada para armazenar o objeto Date.
  let data;

  // Verifiqua se 'dataStr' é uma string.
  if (typeof dataStr === 'string') {
    if (dataStr.includes('-')) {
      dataStr = dataStr.split('T')[0];
      dataStr = dataStr.split('-').reverse().join('/');
    }
    // Se for uma string, divide a string usando '/' como delimitador.
    const partes = dataStr.split('/');
    // Verifixa se a string foi dividida em três partes (dia, mês e ano).
    if (partes.length === 3) {
      // Se sim, cria um novo objeto Date usando as partes. Subtraia 1 do mês porque os meses são zero-indexados em JavaScript.
      data = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    } else {
      // Se a string não tiver três partes, retorna undefined.
      return undefined;
    }
  } else {
    // Se 'dataStr' não for uma string, assume que é um objeto Date e atribua-o diretamente a 'data'.
    data = dataStr;
  }

  // Verifiqu se a data criada é válida. Se não for, retorne undefined.
  if (isNaN(data.getTime())) {
    return undefined;
  } else {
    // Se a data for válida, retorna o objeto Date.
    return data;
  }
}
