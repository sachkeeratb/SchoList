import * as React from "react" // Import React
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react" // Import Chakra UI
import { ColorModeSwitcher } from "./ColorModeSwitcher" // Import the colour switcher
import { Logo } from "./Logo" // Import the logo

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Hello FBLA
          </Text>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
