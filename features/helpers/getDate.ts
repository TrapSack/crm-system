import { months } from "@/config/constants";

type DateString = `${string}-${string}-${string}`;

export const getDate = (dateString: DateString) => {
  const date = new Date(dateString);

  const mounth = months[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();

  return `${mounth} ${day}th ${year}`;
};
