import { View, Text, TextInput } from "react-native";

function Input({ title, value, setValue, error, setError,type ,secure}) {

  return (
    <View>
      <Text
        style={{
          color: error ? "#ff5555" : "#70747a",
          marginVertical: 5,
          paddingLeft: 15,
        }}
      >
        {error ? error : title}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (error) {
            setError("");
          }
        }}
        keyboardType={type}
        secureTextEntry={secure}
        style={{
          backgroundColor: "#e1e2e4",
          borderRadius: 26,
          borderWidth: 1,
          borderColor: error ? "#ff5555" : "#e1e2e4",
          height: 52,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
      />
    </View>
  );
}

export default Input;
