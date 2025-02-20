// Allergic.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    marginLeft: 8,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  allergiesList: {
    marginTop: 10,
  },
  allergyItem: {
    marginVertical: 4,
  },
  allergyText: {
    fontSize: 18,
  },
  predefinedButton: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  predefinedButtonText: {
    fontSize: 14,
    color: "#333",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledButtonText: {
    color: "#888",
  },
});
