import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface EditableListFieldProps {
    label: string;
    placeholder: string;
    items: string[];
    onChangeItem: (index: number, value: string) => void;
    onRemoveItem: (index: number) => void;
    onAddItem: () => void;
}

const EditableListField: React.FC<EditableListFieldProps> = ({
    label,
    placeholder,
    items,
    onChangeItem,
    onRemoveItem,
    onAddItem,
}) => (
    <>
        <Text style={styles.label}>{label}:</Text>
        {items.map((item, index) => (
            <View key={`${label}-${index}`} style={styles.itemContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={item}
                    onChangeText={(text) => onChangeItem(index, text)}
                />
                <TouchableOpacity onPress={() => onRemoveItem(index)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        ))}
        <TouchableOpacity onPress={onAddItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar {label.toLowerCase()}</Text>
        </TouchableOpacity>
    </>
);

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 4,
    },
    removeButton: {
        marginLeft: 8,
    },
    removeButtonText: {
        color: "red",
    },
    addButton: {
        marginTop: 8,
    },
    addButtonText: {
        color: "blue",
    },
});

export default EditableListField;
