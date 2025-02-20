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
  afiliadoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Alinea nombre a la izquierda y botón a la derecha
    marginBottom: 10,
  },
  afiliadoName: {
    fontSize: 18,
    fontWeight: "bold",
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
  // NUEVOS ESTILOS PARA LOS ÍCONOS
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#0066cc",
    borderRadius: 12,
    padding: 10,
  },
  reloadButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
});
