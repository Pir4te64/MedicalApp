import React from "react";
import { View, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";

const options = [
  { label: "Laboratorio", value: "LABORATORY" },
  { label: "Receta", value: "RECIPE" },
  { label: "Imagenología", value: "IMAGENOLOGY" },
];

const SingleChoiceCheckbox = ({ selectedOption, onSelect }) => {
  return (
    <View style={{ marginVertical: 10, width: "100%" }}>
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
            textStyle={{ fontSize: 16 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SingleChoiceCheckbox;
