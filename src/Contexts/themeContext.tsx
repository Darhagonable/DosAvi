import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useContext, useState,useEffect } from "react";
import { useColorScheme } from "react-native";

export type Mode = "light" | "dark";
export type ThemeSetting = "light" | "dark" | "system-theme";

interface IThemeContext {
  mode: Mode
  themeSetting: ThemeSetting
  setThemeSetting: (themeSetting: ThemeSetting) => void
}

const ThemeContext = React.createContext<IThemeContext>({} as IThemeContext);

export const { Provider } = ThemeContext;

export function useThemeContext() {
  const value = useContext(ThemeContext);

  if (!value)
    throw new Error("Tried to access ThemeContext outside of provider!");

  return value;
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme() ?? "light";

  const [mode, setMode] = useState<Mode>();

  const [themeSetting, setThemeSetting] = useState<ThemeSetting>();

  const { getItem: getThemeSetting, setItem: setThemeSettingInStore } = useAsyncStorage("themeSetting");

  const readFromStorage = async () => {
    const item = await getThemeSetting() as ThemeSetting ?? "system-theme";
    setThemeSetting(item);
  };

  const writeToStorage = async (newThemeSetting: ThemeSetting) => {
    await setThemeSettingInStore(newThemeSetting);
    setThemeSetting(newThemeSetting);
  };

  useEffect(() => {
    readFromStorage();
  }, []);


  useEffect(() => {
    setMode(themeSetting === "system-theme" ? colorScheme : themeSetting);
  }, [colorScheme, themeSetting]);

  if(mode && themeSetting) return (
    <ThemeContext.Provider value={{ mode, themeSetting, setThemeSetting: writeToStorage }}>
      {children}
    </ThemeContext.Provider>
  );

  return null;
}

export const ThemeContextConsumer = ThemeContext.Consumer;