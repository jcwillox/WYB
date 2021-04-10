import { DarkTheme, DefaultTheme } from "react-native-paper";
import deepmerge from "deepmerge";

const LightTheme = deepmerge(DefaultTheme, {
  // roundness: 8,
  colors: {
    primary: "#304ffe", // Indigo A700
    listing: "#00bfa5", // Teal A700
    account: "#c51162", // Pink A700
    stars: "#ffc107", // Amber 500
  },
  // animation: {
  //   scale: 50,
  // },
});

export default LightTheme;

// {
//   primary: "",
//   accent: "#304ffe",
//   background: "#F2F2F2",
//   backgroundDark: "#757575",
// };
