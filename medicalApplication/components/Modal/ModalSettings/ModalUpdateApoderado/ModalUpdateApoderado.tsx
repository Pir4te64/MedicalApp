import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesModal } from "./ModalUpdateAPoderado.styles";
import { API } from "@/utils/api";
import CustomAlert from "../../Modal";

interface Afiliado {
  nombre: string;
  documento: string;
  tipoUsuario: string;
  tipoCuenta: string;
  seudonimo: string; // Add this line
}

interface ModalUpdateAPoderadoProps {
  visible: boolean;
  afiliado: Afiliado | null;
  tipoSeleccionado: string | null;
  onClose: () => void;
}

const ModalUpdateAPoderado: React.FC<ModalUpdateAPoderadoProps> = ({
  visible,
  afiliado,
  tipoSeleccionado,
  onClose,
}) => {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const obtenerTipoSeleccionado = async () => {
      const tipo = await AsyncStorage.getItem("tipoSeleccionado");
      setTipoUsuario(tipo);
    };

    if (visible) {
      obtenerTipoSeleccionado();
    }
  }, [visible]);

 
  // Función de envío de datos
  const handleUpdate = async () => {
    console.log("Enviando datos...");

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("Token no encontrado");
        return;
      }

      // Definir el valor de "role" basado en tipoSeleccionado
      const role = tipoSeleccionado === "dependiente" ? "D" : tipoSeleccionado === "apoderado" ? "A" : "";

      const url = `${API.UPDATE_DEPENDIENTE}?role=${role}&seudonimo=${afiliado?.seudonimo}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data); // Verifica la respuesta de la API

      if (response.ok) {
        setAlertMessage("Datos actualizados correctamente.");
        setAlertType("success");
        setAlertVisible(true); // Mostrar la alerta de éxito
      } else {
        setAlertMessage(data.message || "Error al actualizar.");
        setAlertType("error");
        setAlertVisible(true); // Mostrar la alerta de error
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setAlertMessage("Ocurrió un error al procesar la solicitud.");
      setAlertType("error");
      setAlertVisible(true); // Mostrar la alerta de error
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          <Text style={stylesModal.modalTitle}>Seguro que deseas cambiar?</Text>

          <Text style={stylesModal.modalText}>
            Has escogido: {tipoUsuario || tipoSeleccionado || "No seleccionado"}
          </Text>

          {/* Mostrar pseudónimo */}
          <Text style={stylesModal.modalText}>
            Pseudónimo: {afiliado?.seudonimo || "No asignado"}
          </Text>

          {/* Botón de actualización */}
          <View style={stylesModal.buttonsContainer}>
            <TouchableOpacity style={stylesModal.closeButton} onPress={onClose}>
              <Text style={stylesModal.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={stylesModal.updateButton}
              onPress={handleUpdate} // Llama a handleUpdate aquí
            >
              <Text style={stylesModal.updateButtonText}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertType === "success" ? "Éxito" : "Error"}
        message={alertMessage}
        type={alertType}
      />
    </Modal>
  );
};

export default ModalUpdateAPoderado;
