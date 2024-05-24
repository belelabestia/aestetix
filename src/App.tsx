import { FC } from 'react'
import { Layout } from 'aestetix'
import { Card, Flex, ScrollArea, ThemePanel } from '@radix-ui/themes'

export const App: FC = () => <Layout.Main>
  <Layout.Screen>
    <ScrollArea>
      <Flex height="100%" direction="column" justify="center" align="center">
        <Card>
          Hi! Welcome to Aestetix.
        </Card>
        <ThemePanel defaultOpen={false} />
      </Flex>
    </ScrollArea>
  </Layout.Screen>
</Layout.Main>

export default App