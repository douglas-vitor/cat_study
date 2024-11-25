import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HometScreen from './telas/home'
import TasksScreen from './telas/tasks'
import PomodoroScreen from './telas/pomodoro'
import NotesScreen from './telas/notes'
import {initDatabase, startUser} from "./database";
import {useEffect} from "react";


const Drawer = createDrawerNavigator()

export default function App() {
  useEffect(() => {
    initDatabase().then(() => {}).catch(() =>  console.log('[BD] Erro ao iniciar BD'))
    startUser().then(() => {}).catch(() => console.log('[BD] Erro no start user.'))
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HometScreen} />
        <Drawer.Screen name="Tarefas" component={TasksScreen} />
        <Drawer.Screen name="Pomodoro" component={PomodoroScreen} />
        <Drawer.Screen name="Anotações" component={NotesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
