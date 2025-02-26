import React from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../HistorialStyles"; // Asegúrate de importar los estilos

interface DateListFieldProps {
  label: string;
  items: any[];
  setItems: (index: number, key: string, value: any) => void;
  addItem: (newItem: any) => void;
  removeItem: (index: number) => void;
  showPicker: number | null;
  setShowPicker: (index: number | null) => void;
  dateKey: string;
  textKey: string;
  placeholder: string;
}

const DateListField: React.FC<DateListFieldProps> = ({
  label,
  items,
  setItems,
  addItem,
  removeItem,
  showPicker,
  setShowPicker,
  dateKey,
  textKey,
  placeholder,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      {items.map((item, index) => (
        <View key={`${label}-${index}`} style={{ marginBottom: 12 }}>
          <Text style={styles.label}>Fecha:</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(index)}
            style={styles.dateButton}
          >
            <Text>{item[dateKey].toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showPicker === index && (
            <DateTimePicker
              value={item[dateKey]}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(null);
                if (selectedDate) setItems(index, dateKey, selectedDate);
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={item[textKey]}
            onChangeText={(text) => setItems(index, textKey, text)}
          />
          <TouchableOpacity
            onPress={() => removeItem(index)}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          addItem({
            [dateKey]: new Date(),
            [textKey]: "",
          })
        }
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar {label.toLowerCase()}</Text>
      </TouchableOpacity>
    </>
  );
};

export default DateListField;
