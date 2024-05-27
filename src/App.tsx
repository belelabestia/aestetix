import { FC } from 'react';
import { Layout, Data, Radix } from 'aestetix';

export const App: FC = () => (
  <Layout.Theme panelBackground="translucent">
    <Layout.Screen>
      <Layout.Grid rows="1fr auto">
        <Data.Text>Ciaone</Data.Text>
        <Radix.Card>
          <Data.Audio.Player
            source="https://static.belelabestia.it/Night%20in%20Tokyo%2001%20-%20Simpatico.wav"
            title="Doctor Um & Big Ass - Night in Tokyo"
          />
        </Radix.Card>
      </Layout.Grid>
    </Layout.Screen>
    {/* <Radix.ThemePanel /> */}
  </Layout.Theme>
);

export default App;