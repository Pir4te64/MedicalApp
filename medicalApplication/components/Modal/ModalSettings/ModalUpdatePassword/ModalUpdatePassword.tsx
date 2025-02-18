import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import CustomAlert from "../../Modal"; // Ajusta la ruta según tu estructura
import UpdatePasswordForm from "./Formulario"; // Ajusta la ruta según tu estructura
import { actualizarContrasena } from "./ModalUP.data";

interface ModalUpdatePasswordProps {
  visible: boolean;
  onClose: () => void;
  afiliado: { nombre: string; documento: string; seudonimo: string } | null;
}

const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({
  visible,
  onClose,
  afiliado,
}) => {
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  // Estados para la alerta
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleAlertClose = () => {
    setAlertVisible(false);
    // Si la alerta es de éxito, se cierra el modal
    if (alertType === "success") {
      onClose();
    }
  };

  const handleSubmit = async (values: { newPassword: string; confirmPassword: string }) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        console.log("Las contraseñas no coinciden");
        setPasswordsMatch(false);
        setAlertTitle("Error");
        setAlertMessage("Las contraseñas no coinciden");
        setAlertType("error");
        setAlertVisible(true);
        return;
      } else {
        setPasswordsMatch(true);
      }

      console.log("Enviando nueva contraseña para afiliado:", afiliado?.nombre);

      if (!afiliado?.seudonimo) {
        throw new Error("El seudónimo del afiliado es requerido");
      }

      const result = await actualizarContrasena(
        values.newPassword,
        values.confirmPassword,
        afiliado.seudonimo,
        passwordsMatch
      );
      console.log("Resultado de la actualización:", result);

      // Muestra alerta de éxito
      setAlertTitle("Éxito");
      setAlertMessage("La contraseña se actualizó correctamente");
      setAlertType("success");
      setAlertVisible(true);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setAlertTitle("Error");
      setAlertMessage("Error al actualizar la contraseña");
      setAlertType("error");
      setAlertVisible(true);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar Contraseña</Text>
            {afiliado ? (
              <Text style={styles.afiliadoInfo}>
                {`Afiliado seleccionado: ${afiliado.nombre}`}
              </Text>
            ) : (
              <Text style={styles.afiliadoInfo}>
                No se ha seleccionado un afiliado.
              </Text>
            )}
            <UpdatePasswordForm onSubmit={handleSubmit} onCancel={onClose} />
          </View>
        </View>
      </Modal>

      {/* Componente CustomAlert para mostrar mensajes */}
      <CustomAlert
        visible={alertVisible}
        onClose={handleAlertClose}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  afiliadoInfo: {
    fontSize: 14,
    marginBottom: 15,
    color: "#555",
  },
});

export default ModalUpdatePassword;
