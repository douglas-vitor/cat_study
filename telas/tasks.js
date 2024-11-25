import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity} from "react-native";
import {getTasks, createTasks, deleteTask} from "../database";
import { Picker } from "@react-native-picker/picker";

const TasksScreen = () => {
    const getMyTasks = async () => {
            const tasksData = await getTasks()
            setTasks(tasksData)
        }

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')
    const [selMonth, setselMonth] = useState('1')
    const [selDay, setselDay] = useState('1')
    const [selYear, setselYear] = useState('2024')



    useEffect(() => {
        getMyTasks()
        const agetMonth = new Date().getMonth() + 1
        const agetYear = new Date().getFullYear()
        const agetDay = new Date().getDay()
        setselYear(agetYear.toString())
        setselMonth(agetMonth.toString())
        setselDay(agetDay.toString())

    }, []);

    const handleSaveTask = () => {
        const remember = selYear + '-' + selMonth + '-' + selDay
        createTasks(remember, task)
        setTask('')
        getMyTasks()
    }

    const handleDeleteTask = (id) => {
        deleteTask(id)
        getMyTasks()
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas tarefas ^u^</Text>

            <FlatList data={tasks}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({item}) => (
                          <View style={styles.taskItem}>
                              <Text>" {item.task} "</Text>
                              <Text>Data: {item.remember}</Text>
                              <Button title='Feito' onPress={() => handleDeleteTask(item.id)}></Button>
                          </View>)}/>

            <Text style={styles.titleNewTask}>Criar nova tarefa!</Text>
            <TextInput style={styles.inputTask}
            placeholder={'Informações sobre a tarefa...'}
            value={task}
            onChangeText={newinfo => setTask(newinfo)}/>

        <View style={styles.dateContainer}>
            <Picker selectedValue={selDay} style={styles.picker}
                    onValueChange={(itemValue) => setselDay(itemValue)}>
                {Array.from({length: 31}, (_, i) => (
                <Picker.Item key={i + 1} label={(i + 1).toString()} value={(i + 1).toString()}/>))}
            </Picker>

            <Picker selectedValue={selMonth} style={styles.picker}
                    onValueChange={(itemValue) => setselMonth(itemValue)}>
                <Picker.Item label="Janeiro" value="1"/>
                <Picker.Item label="Fevereiro" value="2"/>
                <Picker.Item label="Março" value="3"/>
                <Picker.Item label="Abril" value="4"/>
                <Picker.Item label="Maio" value="5"/>
                <Picker.Item label="Junho" value="6"/>
                <Picker.Item label="Julho" value="7"/>
                <Picker.Item label="Agosto" value="8"/>
                <Picker.Item label="Setembro" value="9"/>
                <Picker.Item label="Outubro" value="10"/>
                <Picker.Item label="Novembro" value="11"/>
                <Picker.Item label="Dezembro" value="12"/>
            </Picker>

            <Picker selectedValue={selYear} style={styles.picker} onValueChange={(itemValue) => setselYear(itemValue)}>
                <Picker.Item label="2024" value="2024"/>
                <Picker.Item label="2025" value="2025"/>
                <Picker.Item label="2026" value="2026"/>
                <Picker.Item label="2027" value="2027"/>
            </Picker>
        </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                <Text style={styles.textSave}>SALVAR TAREFA</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        margin: 5,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    taskItem: {
        alignSelf: "center",
        width: '95%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        marginBottom: 20,
    },
    titleNewTask: {
        margin: 5,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
    },
    inputTask: {
        width: '95%',
        height: 80,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FAFAD2',
        alignSelf: 'center',
        verticalAlign: 'top',
    },
    saveButton: {
        width: '95%',
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
    },
    textSave: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: "center",
    },
    dateContainer: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: "center",
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 100,
    },
})

export default TasksScreen