import { Text, StyleSheet } from "react-native";
import React from "react";

const Title = ({ text, color, bottom, top }) => {

  return (
    <Text
      style={[
        styles.text,
        { color: color, marginBottom: bottom, marginTop: top },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 34,
    fontFamily: "LeckerliOne-Regular",
  },
});

export default Title;
