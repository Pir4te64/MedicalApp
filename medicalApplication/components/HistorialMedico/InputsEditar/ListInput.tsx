import React from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { styles } from "../HistorialStyles"; // Asegúrate de importar los estilos

interface ListFieldProps {
  label: string;
  items: string[];
  setItems: (index: number, value: string) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  placeholder: string;
}

const ListField: React.FC<ListFieldProps> = ({
  label,
  items,
  setItems,
  addItem,
  removeItem,
  placeholder,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      {items.map((item, index) => (
        <View key={`${label}-${index}`} style={{ marginBottom: 12 }}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={item}
            onChangeText={(text) => setItems(index, text)}
          />
          <TouchableOpacity
            onPress={() => removeItem(index)}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={addItem} style={{ marginTop: 8 }}>
        <Text style={{ color: "blue" }}>Agregar {label.toLowerCase()}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ListField;
