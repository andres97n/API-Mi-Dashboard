

export const getDateFromString = (value: string): Date => {
  if (typeof value !== 'string') return value;
  
  const [year, month, day] = value.split('-');
  return new Date(+year, +month - 1, +day);
}