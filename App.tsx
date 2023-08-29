import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BridgeServer,
  respond,
  start,
  stop,
} from "react-native-http-bridge-refurbished";

export default function App() {
  const [lastCalled, setLastCalled] = useState<number | undefined>();

  useEffect(() => {
    const server = new BridgeServer("http_service", true);
    server.get("/", async (req, res) => {
      // do something
      setLastCalled(Date.now());
      return { message: "OK" }; // or res.json({message: 'OK'});
    });
    server.listen(3000);

    return () => {
      server.stop();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        {lastCalled === undefined
          ? "Request webserver to change text"
          : "Called at " + new Date(lastCalled).toLocaleString()}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
