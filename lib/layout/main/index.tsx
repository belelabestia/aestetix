import { Theme } from "@radix-ui/themes";
import { FC, PropsWithChildren } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => <Theme
  accentColor="yellow"
  grayColor="olive"
  panelBackground="solid"
  children={children}
/>