export const validationMsgs: Record<string, string> = {
  required: 'Campo obrigatório',
  email: 'E-mail inválido',
};

export const states = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

export const months = [
  { short: 'Jan', name: 'Janeiro', index: 1 },
  { short: 'Fev', name: 'Fevereiro', index: 2 },
  { short: 'Mar', name: 'Março', index: 3 },
  { short: 'Abr', name: 'Abril', index: 4 },
  { short: 'Mai', name: 'Maio', index: 5 },
  { short: 'Jun', name: 'Junho', index: 6 },
  { short: 'Jul', name: 'Julho', index: 7 },
  { short: 'Ago', name: 'Agosto', index: 8 },
  { short: 'Set', name: 'Setembro', index: 9 },
  { short: 'Out', name: 'Outubro', index: 10 },
  { short: 'Nov', name: 'Novembro', index: 11 },
  { short: 'Dez', name: 'Dezembro', index: 12 },
];

export const acceptFiles = '.tiff, .tif, .png, .gif, .jpg, .jpeg, .jpe, .jfif, .bmp, .dib, .pdf, .dic, .docx, .xls, .xlsx, .zip';


export const interpolationMessage = (input: string, ...parameters: Array<string | number>): string => {
  // eslint-disable-next-line unicorn/no-array-reduce
  const output = parameters.reduce<string>((old, current, index) => old.split(`{{${index}}}`).join(current.toString()), input);

  return output;
};

export const namePrepositionToLowerCase = (value: string): string => {
  const regex = /\s(da|de|do|e|del|von|di|der)\s/gi;

  return value.replaceAll(regex, match => match.toLowerCase());
};
