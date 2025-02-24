import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "./Contactos.Styles";

interface ContactFormProps {
    contactInfo: {
        name: string;
        phone: string;
        email: string;
        observation?: string;
    };
    updateContactInfo: (field: string, value: string) => void;
    handleAddContact: () => void;
    toggleAddContact: () => void;
    showAddContact: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
    contactInfo,
    updateContactInfo,
    handleAddContact,
    toggleAddContact,
    showAddContact,
}) => {
    return (
        <>
            <Button title="Agregar Contacto" onPress={toggleAddContact} />

            {showAddContact && (
                <View style={styles.formContainer}>
                    <Text>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={contactInfo.name}
                        onChangeText={(text) => updateContactInfo("name", text)}
                    />

                    <Text>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={contactInfo.phone}
                        onChangeText={(text) => updateContactInfo("phone", text)}
                    />

                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={contactInfo.email}
                        onChangeText={(text) => updateContactInfo("email", text)}
                    />

                    <Text>Observación:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={contactInfo.observation}
                        onChangeText={(text) => updateContactInfo("observation", text)}
                        multiline
                        numberOfLines={4}
                    />

                    <Button title="Guardar Contacto" onPress={handleAddContact} />
                </View>
            )}
        </>
    );
};

export default ContactForm;
