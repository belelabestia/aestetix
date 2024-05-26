import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const Screen: FC<PropsWithChildren> = props => (
  <div {...props} className={styles.screen} />
);
