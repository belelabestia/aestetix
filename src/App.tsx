import { FC } from 'react'
import * as Radix from '@radix-ui/themes'
import { Layout, Data } from 'aestetix'

export const App: FC = () => (
  <Radix.Theme panelBackground="translucent">
    <Layout.Screen>
      <Radix.Grid rows="1fr 180px">
        <Radix.Text>Ciaone</Radix.Text>
        <Data.Audio.Player />
      </Radix.Grid>
    </Layout.Screen >
    <Radix.ThemePanel />
  </Radix.Theme>
)

export default App