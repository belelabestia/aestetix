import { FC, PropsWithChildren } from "react"
import style from './styles.module.css'

export const Scroll: FC<PropsWithChildren> =
  ({ children }) => <div className={style.scroll}>{children}</div>