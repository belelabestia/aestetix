import { FC, PropsWithChildren, useEffect } from 'react';
import styles from './styles.module.css';

export const Screen: FC<PropsWithChildren> = props => {
  useEffect(() => { document.oncontextmenu = () => false }, []);

  return (
    <div {...props} className={styles.screen} />
  );
};
