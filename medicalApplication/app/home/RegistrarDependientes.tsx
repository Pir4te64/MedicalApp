import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterDependientes from "@/components/Registrardependientes/RegistrarDep";
import LottieView from "lottie-react-native";

export default function RegistrarDependientesScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View style={styles.innerContainer}>
        {/* Animación con Lottie */}
        <LottieView
          source={require("@/assets/animations/registro.json")}
          autoPlay
          loop
          style={styles.lottie}
          resizeMode="contain"
        />

        <RegisterDependientes />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});
