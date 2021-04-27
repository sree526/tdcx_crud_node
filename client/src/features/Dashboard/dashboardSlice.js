import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    tasks:[],
    task:{},
    taskStatus:''
};

const DashboardSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getTasks() {
        },
        postTasks() {
        },
        putTasks() {

        },
        updateTasks(state,action){
            console.log(current(state.tasks));
                if(Array.isArray(action.payload)) {
                    state.tasks = action.payload;
                    state.taskStatus = '';
                } else if(typeof action.payload === "string"){
                    state.taskStatus = action.payload.taskStatus;
                    state.tasks = [];
                }else {
                    state.taskStatus = '';
                    state.tasks = [...state.tasks, action.payload];
                }


        },
        updateTask(state,action) {
            console.log(action.payload);
            state.taskStatus = '';
            state.tasks = state.tasks.map((item) => (
                item._id===action.payload._id? {...item, task: action.payload.task,completed:action.payload.completed,createdAt:action.payload.createdAt, updatedAt: action.payload.updatedAt}: item))
        },
        deleteTasks(){
        },
        removeTasks(state, action){
            return {
                tasks:[
                    ...state.tasks.filter(task => task._id !== action.payload._id)
                ],
                taskStatus:''
            }
        },
        getTask(state,action){
            console.log(action);
            state.task = state.tasks.filter(task => task._id=== action.payload)[0];
        }
    }
});

export const { getTasks,updateTasks,deleteTasks, postTasks,removeTasks, getTask,putTasks, updateTask} = DashboardSlice.actions;

export default DashboardSlice.reducer
