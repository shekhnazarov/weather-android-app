import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Loader from "./components/loader";
import Weather from "./components/weather";

import * as Location from "expo-location";

const API_KEY = "ada8230873e80edb9b611e91f8f40efa";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const getWeather = async (latitude, longitude) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
      .then((res) => res.json)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsLoading(false);
  };
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("I can't current location, so bad");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, 2000);
  }, []);
  return isLoading ? <Loader /> : <Weather />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
