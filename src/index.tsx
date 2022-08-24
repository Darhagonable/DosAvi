import { ThemeContextConsumer, ThemeContextProvider } from "contexts/themeContext";
import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";

import "react-native-gesture-handler";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from "react-native-paper";
import merge from "deepmerge";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const MyTheme = {
  colors: {
    primary: "#8ED9E2",
    secondary: "#E9878A"
  }
};

function AppWrapper() {
  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        {({ mode }) => {
          const theme = merge(mode === "dark" ? CombinedDarkTheme : CombinedDefaultTheme, MyTheme);

          return (
            <PaperProvider theme={theme}>
              <NavigationContainer theme={theme}>
                <App/>
              </NavigationContainer>
            </PaperProvider>
          );
        }}
      </ThemeContextConsumer>
    </ThemeContextProvider>
  );
}

registerRootComponent(AppWrapper);