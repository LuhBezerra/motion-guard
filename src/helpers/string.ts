export const getCapitalizedString = (value: string) => value.slice(0, 1).toUpperCase() + value.slice(1);

export const parseValueToString = (value?: number | string | boolean) => 
  value ? String(value) : ''

export const enum StringMascara {
  CPF = "$1.$2.$3-$4",
  CNPJ = "$1.$2.$3/$4-$5",
  Telefone = "($1) $2-$3",
}

export function isIfalEmail(email?: string) {
  if (!email) return false;

  return email.endsWith('@aluno.ifal.edu.br');
}

export const addZeroCpfOrCnpj = (value: string, type: 'cpf' | 'cnpj') => {
  const valueLength = value.length;

  if (type === 'cpf' && valueLength < 11) {
    return '0' + value;

  } else if (type === 'cnpj' && valueLength < 14) {
    return '0' + value;
  }

  return value;
}