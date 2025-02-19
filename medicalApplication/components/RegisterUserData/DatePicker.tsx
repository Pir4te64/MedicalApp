import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerInputProps {
    date: Date;
    onChange: (date: Date) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ date, onChange }) => {
    const [show, setShow] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View>
            <Button title="Seleccionar fecha" onPress={() => setShow(true)} />
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default DatePickerInput;
