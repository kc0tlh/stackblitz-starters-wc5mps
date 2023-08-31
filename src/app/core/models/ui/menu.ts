import { NavItem } from './nav-item';

export class Menu {
  id: string;
  type: string;
  title: string;
  hide: boolean;
  disable: boolean;
  icon: string;
  restrictKey: string;
  subItems: Array<NavItem>;
  clevertapEvent: string;
  hideInMobile: boolean;
}

export enum MenuType {
  MAIN = 'MAIN',
  ICON = 'ICON'
}
