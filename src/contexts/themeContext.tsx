import React, { useContext, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

interface IThemeContext {
  mode: ColorSchemeName,
  setMode: (theme: ColorSchemeName) => void
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
  const [mode, setMode] = useState<ColorSchemeName>(Appearance.getColorScheme());

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeContextConsumer = ThemeContext.Consumer;