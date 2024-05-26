import { FC } from 'react';
import { Layout, Data, Radix } from 'aestetix';

export const App: FC = () => (
  <Layout.Theme panelBackground="translucent">
    <Layout.Screen>
      <Layout.Grid rows="1fr 180px">
        <Data.Text>Ciaone</Data.Text>
        <Data.Audio.Player />
      </Layout.Grid>
    </Layout.Screen>
    <Radix.ThemePanel />
  </Layout.Theme>
);

export default App;