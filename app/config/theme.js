import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { Colors, DefaultTheme as PaperDefaultTheme } from "react-native-paper";

const LightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  // mode: "exact",
  roundness: 8,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: Colors.indigoA700,
    accent: Colors.pinkA700,
    stars: Colors.amber500,
    background: Colors.grey50,
    // background: "#151515",
    // surface: Colors.grey900,
    // background: Colors.white,
    trash: Colors.red700,
    lightGrey: Colors.grey100,
    mediumGrey: Colors.grey400,
  },
};

export default LightTheme;
