import React from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
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
  dateKey,
  textKey,
  placeholder,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      {items.map((item, index) => (
        <View key={`${label}-${index}`} style={styles.itemContainer}>
          {/* Fecha */}
          <Text style={styles.label}>Fecha:</Text>
          <DateTimePicker
            value={item[dateKey]}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) setItems(index, dateKey, selectedDate);
            }}
          />

          {/* Input de texto con un ícono a la derecha */}
          <Input
            placeholder={placeholder}
            value={item[textKey]}
            onChangeText={(text) => setItems(index, textKey, text)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            rightIcon={<Icon name="link" size={20} color="gray" />}
          />

          {/* Botones de eliminar y agregar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            {/* Botón de eliminar */}
            <Icon
              name="remove-circle-outline"
              size={24}
              color={items.length > 1 ? "red" : "gray"}
              onPress={items.length > 1 ? () => removeItem(index) : undefined}
            />
            {/* Botón de agregar */}
            <Icon
              name="add-circle-outline"
              size={24}
              color="green"
              onPress={() => addItem({ [dateKey]: new Date(), [textKey]: "" })}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      ))}
    </>
  );
};

export default DateListField;
