import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./Profile.styles";

export interface Action {
    label: string;
    onPress: () => void;
}

interface ProfileActionsProps {
    actions: Action[];
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ actions }) => {
    return (
        <View>
            {actions.map((action, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.updateButton}
                    onPress={action.onPress}
                >
                    <Text style={styles.buttonText}>{action.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ProfileActions;
