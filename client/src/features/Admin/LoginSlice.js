import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const LoginSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login(state, action) {
            console.log(state);
        },
        loginSuccessful(state,action){
            console.log('item available');
            console.log(localStorage.getItem('userId'));
            if(localStorage.getItem('userId')) {

                let data = {loggedIn: true};
                return {...state, ...data};
            }
        },
        logout(state,action){
            let data ={loggedIn:false};
            localStorage.removeItem('userId');
            return {...state,...data};
        }
    }
});

export const { login,loginSuccessful,logout} = LoginSlice.actions;

export default LoginSlice.reducer
