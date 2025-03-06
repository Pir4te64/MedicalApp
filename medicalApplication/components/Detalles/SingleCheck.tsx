import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";

const options = [
  { label: "Laboratorio", value: "LABORATORY" },
  { label: "Receta", value: "RECIPE" },
  { label: "Imagenología", value: "IMAGENOLOGY" },
];

const SingleChoiceCheckbox = ({ selectedOption, onSelect }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Selecciona una opción:
      </Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onSelect(option.value)}
        >
          <CheckBox
            title={option.label}
            checked={selectedOption === option.value}
            onPress={() => onSelect(option.value)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SingleChoiceCheckbox;
