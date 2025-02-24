import React from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";
import { Contact } from "./Contactos.Interface";
import { styles } from "./Contactos.Styles";
import { deleteContact } from "./ContactosDelete";

interface EditableContactProps {
    item: Contact;
    contactos: Contact[];
    setContactos: (contactos: Contact[]) => void;
    handleUpdateContact: (contactId: string, updatedData: Partial<Contact>) => void;
    getContacts: () => Promise<void>; // Función para recargar contactos
}

const EditableContact: React.FC<EditableContactProps> = ({
    item,
    contactos,
    setContactos,
    handleUpdateContact,
    getContacts
}) => {

    const handleDeleteContact = async () => {
        Alert.alert(
            "Eliminar contacto",
            "¿Estás seguro de que deseas eliminar este contacto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        const success = await deleteContact(item.id);
                        if (success) {
                            // 🔹 Eliminamos el contacto de la UI antes de recargar
                            setContactos(contactos.filter((c) => c.id !== item.id));
                            await getContacts(); // Recarga la lista de contactos
                        } else {
                            Alert.alert("Error", "No se pudo eliminar el contacto.");
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <View style={styles.contactCard}>
            <Text style={styles.contactName}>Editar Contacto</Text>

            <Text>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={item.name}
                onChangeText={(text) =>
                    setContactos(contactos.map((c) =>
                        c.id === item.id ? { ...c, name: text } : c
                    ))
                }
            />

            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={item.email}
                onChangeText={(text) =>
                    setContactos(contactos.map((c) =>
                        c.id === item.id ? { ...c, email: text } : c
                    ))
                }
            />

            <Text>Teléfono:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={item.phone}
                onChangeText={(text) =>
                    setContactos(contactos.map((c) =>
                        c.id === item.id ? { ...c, phone: text } : c
                    ))
                }
            />

            <Text>Observación:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={item.observation || ""}
                onChangeText={(text) =>
                    setContactos(contactos.map((c) =>
                        c.id === item.id ? { ...c, observation: text } : c
                    ))
                }
                multiline
                numberOfLines={3}
            />

            <View style={styles.buttonContainer}>
                <Button title="Guardar" onPress={() => handleUpdateContact(item.id, item)} />
                <Button
                    title="Eliminar"
                    onPress={handleDeleteContact}
                    buttonStyle={styles.deleteButton}
                />
            </View>
        </View>
    );
};

export default EditableContact;
