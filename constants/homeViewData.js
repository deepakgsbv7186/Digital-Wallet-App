import icons from './icons';
import images from './images';
import {COLORS} from './theme';

const featuresData = [
  {
    id: 1,
    icon: icons.reload,
    color: COLORS.purple,
    backGroundColor: COLORS.lightpurple,
    description: 'Top Up',
  },
  {
    id: 2,
    icon: icons.send,
    color: COLORS.yellow,
    backGroundColor: COLORS.lightyellow,
    description: 'Transfer',
  },
  {
    id: 3,
    icon: icons.internet,
    color: COLORS.green,
    backGroundColor: COLORS.lightGreen,
    description: 'Internet',
  },
  {
    id: 4,
    icon: icons.wallet,
    color: COLORS.red,
    backGroundColor: COLORS.lightRed,
    description: 'Wallet',
  },
  {
    id: 5,
    icon: icons.bill,
    color: COLORS.yellow,
    backGroundColor: COLORS.lightyellow,
    description: 'Bill',
  },
  {
    id: 6,
    icon: icons.games,
    color: COLORS.green,
    backGroundColor: COLORS.lightGreen,
    description: 'Games',
  },
  {
    id: 7,
    icon: icons.phone,
    color: COLORS.red,
    backGroundColor: COLORS.lightRed,
    description: 'Mobile Prepaid',
  },
  {
    id: 8,
    icon: icons.more,
    color: COLORS.purple,
    backGroundColor: COLORS.lightpurple,
    description: 'More',
  },
];

const specialPromoData = [
  {
    id: 1,
    img: images.promo_banner,
    title: 'Bonus Cashback1',
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 2,
    img: images.promo_banner,
    title: 'Bonus Cashback2',
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 3,
    img: images.promo_banner,
    title: 'Bonus Cashback3',
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 4,
    img: images.promo_banner,
    title: 'Bonus Cashback4',
    description: "Don't miss it. Grab it now!",
  },
];

export {featuresData, specialPromoData};
