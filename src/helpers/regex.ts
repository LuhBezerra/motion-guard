export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CNPJRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
export const CPFRegex = /(\d{3})(\d{3})(\d{3})(\d{2})/;
export const telefoneRegex = /^(\d{2})(\d{4,5})(\d{4})?$/;
export const CEPRegex = /^(\d{5})(\d)/

export const removeSpecialCaracter = (string: string) =>
  string.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

export const addMask = (field: string, regex: RegExp, replaceValue: string) =>
  field.replace(regex, replaceValue);
