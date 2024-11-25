import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, Vibration, TouchableOpacity} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Audio} from "expo-av";

const PomodoroScreen = () => {
    const [minutes, setMinutes] = useState(5);
    const [selectedOption, setSelectedOption] = useState('Tempo de ESTUDOS acabou. Inicie o tempo de PAUSA.');
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sound, setSound] = useState();
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerEnd();
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);
    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);
    const handleTimerEnd = async () => {
        setIsRunning(false);
        Vibration.vibrate();
        const {sound} = await Audio.Sound.createAsync(require('../assets/alarm2.mp3'));
        setSound(sound);
        await sound.playAsync();
        alert(`${selectedOption}`);
    };
    const startTimer = () => {
        setTimeLeft(minutes * 60);
        setIsRunning(true);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.timerText}> {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60} </Text>
            <Picker selectedValue={minutes} style={styles.picker} onValueChange={(itemValue) => setMinutes(itemValue)}>
                <Picker.Item label="5 minutos" value={5}/>
                <Picker.Item label="15 minutos" value={15}/>
                <Picker.Item label="25 minutos" value={25}/>
            </Picker>

            <Picker selectedValue={selectedOption} style={styles.picker} onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                <Picker.Item label="ESTUDAR" value='Tempo de ESTUDOS acabou. Inicie o tempo de PAUSA.' />
                <Picker.Item label="DESCANSAR" value="Tempo de PAUSA acabou. Inicie o tempo de ESTUDOS."/>
            </Picker>
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
                <Text style={styles.texStart}>.:: INICIAR ::.</Text>
            </TouchableOpacity>
            <Text style={styles.descript}>
                1. Escolha um tempo que deseja estudar/descansar;{'\n'}
                2. Escolha o objetivo deste tempo: Estudar ou Pausar;{'\n'}
                3. Clique em INICIAR.{'\n'}
                A técnica de pomodoro resume-se em estudar por X minutos e a cada x minutos estudando, você pode pausar "descansar" por outros x minutos e assim sucessivamente. A cada um bloco de estudo + um bloco de pausa você completa um ciclo, o ideal é que realize ao menos 4 ciclos para que então dê uma pausa mais longa. Exemplo:
                A cada 25 minutos estudando, você pode pausar por 5 minutos. Depois de 4 ciclos realize uma pausa longa de 25 minutos.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    timerText: {
        textAlign: "center",
        fontSize: 60,
        marginBottom: 20,
        marginTop: 20,
        color: 'red',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
    },
    startButton: {
        width: '95%',
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    texStart: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: "center",
    },
    descript: {
        width: '95%',
        marginTop: 20,
    },
})

export default PomodoroScreen