import React, { useEffect } from "react";
import { View, Text, Button, FlatList, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContactStore } from "./useContactStore";
import { PACIENTE_CONTACTO_POST } from "./ContactosPOST";
import { getAllContactos } from "./ContactosGETALL";

interface ContactosComponentProps {
  afiliadoData: {
    nombre: string;
    documento: string;
    tipoUsuario: string;
    id: number; // Recibimos el id como prop
  };
}

const ContactosComponent: React.FC<ContactosComponentProps> = ({
  afiliadoData,
}) => {
  const navigation = useNavigation();
  const {
    contactos,
    showAddContact,
    contactInfo,
    toggleAddContact,
    updateContactInfo,
    resetContactInfo,
    fetchContactos,
  } = useContactStore();

  useEffect(() => {
    // Ahora pasamos el id al llamar a la función getAllContactos
    const fetchContacts = async () => {
      try {
        const fetchedContactos = await getAllContactos(afiliadoData.id);
        // Actualizamos los contactos con la data obtenida
        fetchContactos();
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
      }
    };

    fetchContacts(); // Llamar para obtener los contactos
    resetContactInfo(afiliadoData.id); // Reseteamos el formulario con el ID del usuario
  }, [afiliadoData.id, fetchContactos]);

  const handleAddContact = async () => {
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
      Alert.alert("Error", "Por favor completa los campos obligatorios.");
      return;
    }

    try {
      await PACIENTE_CONTACTO_POST(contactInfo);
      Alert.alert("Éxito", "El contacto ha sido agregado correctamente.");
      resetContactInfo(afiliadoData.id);
      toggleAddContact();
      // Refrescar la lista de contactos
      fetchContactos();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar el contacto.");
    }
  };

  const renderContactItem = ({ item }: { item: any }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.email}</Text>
      <Text>{item.observation}</Text>
    </View>
  );

  return (
    <View>
      <Text>Nombre: {afiliadoData.nombre}</Text>
      <Text>DNI: {afiliadoData.documento}</Text>

      <Button title="Agregar Contacto" onPress={toggleAddContact} />

      {showAddContact && (
        <View>
          <Text>Nombre:</Text>
          <TextInput
            value={contactInfo.name}
            onChangeText={(text) => updateContactInfo("name", text)}
          />

          <Text>Teléfono:</Text>
          <TextInput
            keyboardType="numeric"
            value={contactInfo.phone}
            onChangeText={(text) => updateContactInfo("phone", text)}
          />

          <Text>Email:</Text>
          <TextInput
            value={contactInfo.email}
            onChangeText={(text) => updateContactInfo("email", text)}
          />

          <Text>Observación:</Text>
          <TextInput
            value={contactInfo.observation}
            onChangeText={(text) => updateContactInfo("observation", text)}
            multiline
            numberOfLines={4}
            style={{
              height: 80,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              textAlignVertical: "top",
            }}
          />

          <Button title="Guardar Contacto" onPress={handleAddContact} />
        </View>
      )}

      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContactItem}
      />
    </View>
  );
};

export default ContactosComponent;
