import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import Title from "../common/Title";

const Splash = ({navigation}) => {


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  const translateY = new Animated.Value(0);
  const duration = 800;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Title text="Realtime Message App" color={"#fff"} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default Splash;
