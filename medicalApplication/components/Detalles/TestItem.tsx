import React, { memo } from "react";
import { View, Text, FlatList, StyleSheet, Linking } from "react-native";
import { ActivityIndicator } from "react-native";
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
      <Text style={styles.link} onPress={() => Linking.openURL(item.urlRecipe)}>
        Ver receta
      </Text>
    )}
  </View>
));

const PatientResults = ({ data }) => {
  if (!data || !data.body) {
    return <Text>No hay resultados disponibles</Text>;
  }
  const [visibleData, setVisibleData] = React.useState(data.body.slice(0, 50));
  const [loading, setLoading] = React.useState(false);
  const loadMore = () => {
    if (loading || visibleData.length >= data.body.length) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleData((prevData) => [
        ...prevData,
        ...data.body.slice(prevData.length, prevData.length + 50),
      ]);
      setLoading(false);
    }, 1000); // Simula tiempo de carga
  };
  const renderItem = React.useCallback(
    ({ item }) => <TestItem item={item} />,
    []
  );

  return (
    <FlatList
      data={visibleData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#0066cc" /> : null
      }
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
