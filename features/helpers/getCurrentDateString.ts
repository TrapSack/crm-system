export const getCurrentDateString = (): `${string}-${string}-${string}` => {
  const date = new Date(Date.now());

  const month = date.getMonth();

  const day = date.getDay();

  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};
