import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type  EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskSameTitle) {
      return Alert.alert('Tarefa já existe', 'Não é possível adicionar tarefas com o mesmo título');
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => oldTasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      }

      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover tarefa', 'Deseja remover a tarefa?', [
      { 
        text: 'Não', 
        style: 'cancel' 
      },
      { 
        style: 'destructive',
        text: 'Sim', 
        onPress: () => {    
          const updatedTasks = tasks.filter(task => task.id !== id);

          setTasks(updatedTasks);
        } 
      } 
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}))
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if (!taskToBeUpdated)
      return;

      taskToBeUpdated.title = taskNewTitle;

      setTasks(updatedTasks);

  }
  

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})