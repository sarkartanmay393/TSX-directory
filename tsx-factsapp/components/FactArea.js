import { StyleSheet } from "react-native";
import { Fragment, startTransition, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  ButtonSpinner,
  Text,
} from "@gluestack-ui/themed";

const FactArea = () => {
  const [loading, setLoading] = useState(false);
  const [currentFact, setCurrentFact] = useState(undefined);

  const loadFact = async () => {
    const url =
      "https://numbersapi.p.rapidapi.com/6/21/date?fragment=true&json=true";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ddfef432efmsh176bc99bac019dap108e74jsn1237de87d8e5",
        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      },
    };
    setLoading(true);
    try {
      const response = await fetch(url, options);
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
    loadFact();
  }, []);

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
        <Button style={styles.button} title="Reload" onPress={loadFact}>
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
