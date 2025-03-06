import React, { memo, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";

// Función para formatear la fecha a dd/mm/yyyy
const parseDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3)
    return "Fecha no disponible";
  const [year, month, day] = dateArray;
  return `${day}/${month}/${year}`;
};

// Agrupa los datos por "test"
const groupByTest = (data) => {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.test]) {
      grouped[item.test] = [];
    }
    grouped[item.test].push(item);
  });
  return Object.entries(grouped).map(([test, records]) => ({ test, records }));
};

// Componente memorizado para cada grupo de tests
const TestGroup = memo(({ group }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.testName}>{group.test}</Text>
    {group.records.map((item, index) => (
      <View key={index} style={styles.testDetails}>
        <Text>Fecha: {parseDate(item.date)}</Text>
        <Text>Laboratorio: {item.laboratory || "No especificado"}</Text>
        <Text>Resultado: {item.result || "No disponible"}</Text>
        <Text>
          Rango: {item.referenceMin}{" "}
          {item.referenceMax ? `- ${item.referenceMax}` : ""}
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
    ))}
  </View>
));

const PatientResults = ({ data }) => {
  // Validación estricta: data.body debe ser un array con al menos un elemento
  const validData = useMemo(
    () => Array.isArray(data?.body) && data.body.length > 0,
    [data]
  );

  // Agrupar datos si son válidos
  const groupedData = useMemo(
    () => (validData ? groupByTest(data.body) : []),
    [validData, data]
  );

  const [visibleData, setVisibleData] = useState(groupedData.slice(0, 10)); // Se carga en grupos
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading || !validData || visibleData.length >= groupedData.length)
      return;
    setLoading(true);
    setTimeout(() => {
      setVisibleData((prevData) => [
        ...prevData,
        ...groupedData.slice(prevData.length, prevData.length + 10),
      ]);
      setLoading(false);
    }, 1000); // Simula tiempo de carga
  };

  const renderItem = useCallback(({ item }) => <TestGroup group={item} />, []);

  if (!validData) {
    return <Text style={styles.noDataText}>No hay resultados disponibles</Text>;
  }

  return (
    <FlatList
      data={visibleData}
      keyExtractor={(item) => item.test}
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
    fontSize: 20,
    color: "#0066cc",
    marginBottom: 8,
    fontWeight: "bold",
  },
  testDetails: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  link: {
    color: "blue",
    marginTop: 8,
    textDecorationLine: "underline",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default PatientResults;
