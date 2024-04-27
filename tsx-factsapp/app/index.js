import { Suspense } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  GluestackUIProvider,
  Heading,
  Spinner,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import FactArea from "../components/FactArea";
import HeaderMenu from "../components/HeaderMenu";
import StoreProvider from "../context/storeContext";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StoreProvider>
        <Box style={styles.container}>
          {/* <StatusBar barStyle={"default"} hidden={false} /> */}
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal={16}
          >
            <Heading size="2xl">Random Facts</Heading>
            <HeaderMenu />
          </Box>
          <Suspense fallback={<Spinner />}>
            <FactArea />
          </Suspense>
        </Box>
      </StoreProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  factYear: {
    fontSize: 14,
    fontWeight: "400",
  },
});
