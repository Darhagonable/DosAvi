import { registerRootComponent } from "expo";
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from "react-native-paper";
import App from "./App";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#8ED9E2",
    secondary: "#E9878A"
  }
};

function AppWrapper() {
  return (
    <PaperProvider theme={theme}>
      <App/>
    </PaperProvider>
  );
}

registerRootComponent(AppWrapper);