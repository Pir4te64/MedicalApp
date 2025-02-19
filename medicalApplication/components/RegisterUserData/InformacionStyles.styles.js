const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9", // Fondo claro para un estilo minimalista
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333", // Texto oscuro para contraste
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd", // Borde sutil
    backgroundColor: "#fff", // Fondo blanco para destacar
    borderRadius: 8, // Bordes redondeados para suavidad
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333", // Texto oscuro para mejor visibilidad
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: "#007BFF", // Azul moderno
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
