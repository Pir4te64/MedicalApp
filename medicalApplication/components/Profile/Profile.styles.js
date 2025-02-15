import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: "#0066cc", // Azul suave para el fondo
    borderRadius: 12,
  },
  profileDetails: {
    marginVertical: 15,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileText: {
    fontSize: 18,
    color: "#ffffff", // Texto blanco para contraste
    marginLeft: 10,
  },
  afiliadosSection: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  afiliadosTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#0066cc", // Título azul
  },
  afiliadoItem: {
    marginBottom: 20,
  },
  afiliadoName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  afiliadoInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  afiliadoText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  noAfiliados: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
