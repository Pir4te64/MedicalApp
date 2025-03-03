import React, { memo } from "react";
import { View, Text, FlatList, StyleSheet, Linking } from "react-native";

// Función para formatear la fecha a dd/mm/yyyy
const parseDate = (dateArray) => {
  if (!dateArray || dateArray.length < 3) return "";
  const [year, month, day] = dateArray;
  return `${day}/${month}/${year}`;
};

// Componente memorizado para cada ítem de la lista
const TestItem = memo(({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.testName}>{item.test}</Text>
    <Text>Fecha: {parseDate(item.date)}</Text>
    <Text>Laboratorio: {item.laboratory}</Text>
    <Text>Resultado: {item.result}</Text>
    <Text>
      Rango: {item.referenceMin} {item.referenceMax && `- ${item.referenceMax}`}
    </Text>
    {item.urlRecipe && (
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(item.urlRecipe)}
      >
        Ver receta
      </Text>
    )}
  </View>
));

const PatientResults = ({ data }) => {
  if (!data || !data.body) {
    return <Text>No hay resultados disponibles</Text>;
  }

  // Si la altura de cada ítem es aproximadamente fija (por ejemplo, 100), se puede usar getItemLayout.
  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  return (
    <FlatList
      data={data.body}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TestItem item={item} />}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={10}      // Número de elementos iniciales a renderizar
      maxToRenderPerBatch={10}     // Número máximo a renderizar en cada lote
      windowSize={21}              // Tamaño de la ventana de renderizado
      removeClippedSubviews={true} // Remueve elementos fuera de la pantalla
      getItemLayout={getItemLayout} // Si los ítems tienen altura fija
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    marginVertical: 12,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  testName: {
    fontSize: 18,
    color: "#0066cc",
    marginBottom: 8,
  },
  link: {
    color: "blue",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});

export default PatientResults;
