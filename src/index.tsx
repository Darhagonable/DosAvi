import { ThemeContextConsumer, ThemeContextProvider } from "Contexts/themeContext";
import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";
import * as Notifications from "expo-notifications";

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
import { ItemsProvider } from "Contexts/ItemsContext";

const lightTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const darkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
    }
  }
}

const myTheme = {
  roundness: 8,
  colors: {
    primary: "#8ED9E2",
    secondary: "#E9878A"
  }
};

const themes = {
  light: merge(lightTheme, myTheme),
  dark: merge(darkTheme, myTheme)
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

function AppWrapper() {
  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        {({ mode }) => (
          <PaperProvider theme={themes[mode]}>
            <NavigationContainer theme={themes[mode]}>
              <ItemsProvider>
                <App/>
              </ItemsProvider>
            </NavigationContainer>
          </PaperProvider>
        )}
      </ThemeContextConsumer>
    </ThemeContextProvider>
  );
}

registerRootComponent(AppWrapper);