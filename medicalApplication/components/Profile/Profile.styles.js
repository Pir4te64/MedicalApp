import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: "#0066cc",
    borderRadius: 12,
  },
  profileDetails: {
    marginVertical: 10,
    flexDirection: "row", // Acomoda los elementos en fila
    alignItems: "center", // Alinea verticalmente
    justifyContent: "space-between", // Espacia los elementos
    gap: 10, // Espaciado entre elementos (opcional)
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    fontSize: 18,
    color: "#ffffff",
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
    color: "#0066cc",
  },
  afiliadoContainer: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  afiliadoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
  },
  afiliadoName: {
    fontSize: 18,
    color: "black",
  },
  afiliadoContent: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
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
    color: "white",
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
  iconsContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  reloadButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconsColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  iconStyle: {
    fontSize: 24, // Ajusta el tamaño si es necesario
  },
});
