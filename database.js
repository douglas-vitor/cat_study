import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('banco.sqlite');


export const initDatabase = async () => {
    await db.execAsync(`
PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT);
    CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, created DATE DEFAULT (datetime('now', 'localtime')), remember DATE);
`);
}

export const startUser = async () => {
    if (await db.getFirstAsync(`SELECT * FROM notes`)) {
    } else {
        console.log('[DB] Nova tentativa de start user.')
        await db.execAsync(`
PRAGMA journal_mode = WAL;
INSERT INTO notes (note) VALUES ('Pensando...');
    INSERT INTO tasks (task, remember) VALUES ('Conhecer a tela Pomodoro.', datetime('now', 'localtime'));
    INSERT INTO tasks (task, remember) VALUES ('Crie sua primeira anotação.', datetime('now', 'localtime'));
`);
    }
}

export const getNotes = async () => {
    return await db.getFirstAsync(`SELECT * FROM notes`)
}

export const updateNote = async (newNote, id) => {
    await db.runAsync('UPDATE notes SET note = ? WHERE id = ?', newNote, id)
    console.log('[DB] Anotações sendo atualizada.')
}

export const createTasks = async (rememberDate, content) => {
    await db.execAsync(`INSERT INTO tasks (task, remember) VALUES ('${content}', '${rememberDate}')`)
    console.log('[DB] Taks criada.')
}

export const getTasks = async () => {
    return await db.getAllAsync('SELECT * FROM tasks')
}
export const getTasksToday = async () => {
    const today = new Date().toISOString().split('T') //YYYY-MM-DD
    return await db.getAllAsync('SELECT * FROM tasks WHERE remember = ?', today)
}

export const deleteTask = async (taskID) => {
    await db.runAsync('DELETE FROM tasks WHERE id = $value', {$value: taskID})
    console.log('[DB] Tasks deletada.')
}

