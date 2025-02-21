import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ContactosComponent from "@/components/Contactos/ContactosComponent";
import { Afiliado } from "@/utils/types";

const Contactos = () => {
  const { afiliado } = useLocalSearchParams();

  let afiliadoData: Afiliado | null = null;
  try {
    afiliadoData = afiliado ? JSON.parse(afiliado as string) : null;
  } catch (error) {
    console.error("Error al parsear afiliado:", error);
  }

  if (!afiliadoData) {
    return (
      <View style={styles.container}>
        <Text>No se encontró información del afiliado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ContactosComponent afiliadoData={afiliadoData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Contactos;
