import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "./InformacionStyles.styles";

interface AllergyInputProps {
    title: string;
    placeholder: string;
    allergies: { allergy: string }[];
    onAddAllergy: (allergy: string) => void;
}

const AllergyInput: React.FC<AllergyInputProps> = ({ title, placeholder, allergies, onAddAllergy }) => {
    const [allergy, setAllergy] = useState("");

    return (
        <View style={styles.allergyContainer}>
            <Text style={styles.subtitle}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={allergy}
                onChangeText={setAllergy}
                onSubmitEditing={() => {
                    if (allergy.trim() !== "") {
                        onAddAllergy(allergy.trim());
                        setAllergy("");
                    }
                }}
            />
            {allergies.map((item, index) => (
                <Text key={index} style={styles.allergyText}>
                    {item.allergy}
                </Text>
            ))}
        </View>
    );
};

export default AllergyInput;
