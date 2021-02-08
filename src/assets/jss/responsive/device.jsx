const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopS: "1240px",
  laptopL: "1440px",
  desktop: "2560px"
};
export const device = {
  mobileS: `@media screen and (max-width: ${size.mobileS})`,
  mobileM: `@media screen and (max-width: ${size.mobileM})`,
  mobileL: `@media screen and (max-width: ${size.mobileL})`,
  tablet: `@media screen and (max-width: ${size.tablet})`,
  laptop: `@media screen and (max-width: ${size.laptop})`,
  laptopS: `@media screen and (max-width: ${size.laptopS})`,
  laptopL: `@media screen and (max-width: ${size.laptopL})`,
  desktop: `@media screen and (max-width: ${size.desktop})`,
  desktopL: `@media screen and (max-width: ${size.desktop})`
};


// reponsive material-ui

// [theme.breakpoints.up("sm")]: {
//   marginLeft: theme.spacing(1),
//   width: "auto"
// }