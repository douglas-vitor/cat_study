import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList, Button} from "react-native";
import {Calendar} from "react-native-calendars";
import {getTasksToday} from "../database";

const HomeScreen = () => {
    const getMyTasks = async () => {
            const tasksData = await getTasksToday()
            setTasks(tasksData)
        }
        getMyTasks()
    const today = new Date().toISOString().split('T')[0]; //YYYY-MM-DD
    const [tasks, setTasks] = useState([])

    useEffect(() => {

        getMyTasks()
    }, []);

    return (
        <View style={styles.container}>
            <Calendar style={styles.calendario}
                      current={today}
                      markedDates={{[today]: {selected: true,
                              marked: true, selectedColor: 'blue'}}}/>
            <Text style={styles.title}>Minhas tarefas de hoje :P</Text>
            <FlatList data={tasks}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({item}) => (
                          <View style={styles.taskItem}>
                              <Text>" {item.task} "</Text>
                              <Text>Data: {item.remember}</Text>
                          </View>)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendario: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
    },
    title: {
        margin: 5,
        marginTop: 5,
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
})

export default HomeScreen