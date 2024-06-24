import { Text, TouchableOpacity } from "react-native";

function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#202020",
        height: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
