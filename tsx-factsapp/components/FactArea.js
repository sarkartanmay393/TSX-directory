import { StyleSheet } from "react-native";
import { Fragment, startTransition, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  ButtonSpinner,
  Text,
} from "@gluestack-ui/themed";
import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import { getUrlObj } from "../utils/index";

const FactArea = () => {
  const { category } = useContext(storeContext);
  const [loading, setLoading] = useState(false);
  const [currentFact, setCurrentFact] = useState(undefined);

  const loadFact = async (obj) => {
    setLoading(true);
    try {
      const response = await fetch(obj.url, obj.options);
      const json = await response.json();
      startTransition(() => {
        setCurrentFact(json);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFact(getUrlObj(category));
  }, [category]);

  return (
    <Box style={styles.centered}>
      <Box style={styles.facts}>
        {currentFact === undefined ? (
          <Text>No fact loaded yet</Text>
        ) : (
          <Fragment>
            {currentFact.year > 0 ? <Text>{currentFact.year}</Text> : <></>}
            <Text color="green" size="2xl" fontWeight="500">
              {currentFact.text.charAt(0).toUpperCase() +
                currentFact.text.substring(1, currentFact.text.length)}
            </Text>
          </Fragment>
        )}
      </Box>
      <Box style={styles.actions}>
        <Button
          style={styles.button}
          title="Reload"
          onPress={() => loadFact(getUrlObj(category))}
        >
          {loading ? (
            <ButtonSpinner />
          ) : (
            <ButtonText>
              {currentFact === undefined ? "Load" : "Next"}
            </ButtonText>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default FactArea;

const styles = StyleSheet.create({
  actions: {
    flex: 0.2,
  },
  facts: {
    flex: 1,
    alignItems: "start",
    justifyContent: "center",
  },
  centered: {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingHorizontal: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
});
