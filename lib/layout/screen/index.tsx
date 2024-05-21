import { FC, PropsWithChildren } from 'react'
import styles from './styles.module.css'

export const Screen: FC<PropsWithChildren> =
  ({ children }) => <div className={styles.screen}>{children}</div>
