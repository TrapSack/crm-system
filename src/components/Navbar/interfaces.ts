export interface INavbarItem {
  title: string;
  to: string;
  subLinks?: ISubLink[];
}

interface ISubLink {
  title: string;
  to: string;
}
