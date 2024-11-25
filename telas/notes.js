import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from "react-native";
import {createNotesTable, getNotes, updateNote} from "../database";

const NotesScreen = () => {
    const [note, setNote] = useState('')
    const [noteID, setNoteID] = useState('')


    useEffect(() => {
        const getMyNote = async () => {
            const result = await getNotes()
            setNote(result.note)
            setNoteID(result.id)
        }
        getMyNote()
    }, [])

    const handleUpdateNote = () => {
        updateNote(note, noteID)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas anotações ;D</Text>
            <TextInput style={styles.input}
                       value={note}
                       onChangeText={newinfo => setNote(newinfo)}/>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateNote}>
                <Text style={styles.textSave}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        alignContent: 'center',
        margin: 0,
        border: 0,
    },
    saveButton: {
        width: '95%',
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    textSave: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: "center",
    },
    title: {
        margin: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        flex: 1,
        width: '95%',
        height: '80%',
        borderWidth: 1,
        borderColor: 'blue',
        padding: 10,
        backgroundColor: '#FAFAD2',
        borderRadius: 5,
        marginBottom: 10,
        verticalAlign: "top",
    },
})

export default NotesScreen