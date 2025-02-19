import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

interface InputsPrincipalesProps {
  formData: {
    weight: string;
    height: string;
    bloodType: string;
  };
  handleChange: (field: string, value: string) => void;
}

const InputsPrincipales: React.FC<InputsPrincipalesProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Input
        label="Peso"
        placeholder="Ingrese su peso"
        value={formData.weight}
        onChangeText={(value) => handleChange("weight", value)}
      />
      <Input
        label="Altura"
        placeholder="Ingrese su altura"
        value={formData.height}
        onChangeText={(value) => handleChange("height", value)}
      />
      <Input
        label="Tipo de Sangre"
        placeholder="Ingrese su tipo de sangre"
        value={formData.bloodType}
        onChangeText={(value) => handleChange("bloodType", value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
    marginVertical: 10,
  },
});

export default InputsPrincipales;
