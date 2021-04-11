import { Colors, DefaultTheme } from "react-native-paper";

const LightTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.indigoA700,
    accent: Colors.pinkA700,
    stars: Colors.amber500,
    background: Colors.grey50,
    trash: Colors.red700,
    lightGrey: Colors.grey100,
    mediumGrey: Colors.grey400,
  },
};

export default LightTheme;
