import { registerRootComponent } from "expo";
import App from "./App";

function AppWrapper() {
  return (
    <App/>
  );
}

registerRootComponent(AppWrapper);