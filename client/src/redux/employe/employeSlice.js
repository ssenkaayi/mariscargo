import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentEmploye:null,
    error:null,
    loading:false
}

const employeSlice = createSlice({
    name:'employe',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            // state.error = null;
        },
        signInSuccess:(state,action)=>{
            state.currentEmploye = action.payload;
            state.loading = false;
            state.error = null;

        }
        ,
        signOutStart:(state)=>{
            state.loading=true;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false
        }
        ,
        signOutSuccess:(state)=>{
            state.currentEmploye = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure:(state,action)=>{
            state.error =action.payload;
            state.loading=false;  
        },
        // updateUserStart:(state)=>{
        //     state.loading=true;
        // },
        // updateUserSuccess:(state,action)=>{
        //     state.currentUser = action.payload;
        //     state.loading = false;
        //     state.error = null;

        // },
        // updateUserFailure:(state,action)=>{
        //     state.error = action.payload;
        //     state.loading =false;

        // },
        // deleteUserStart:(state)=>{
        //     state.loading=true;
        // },
        // deleteUserSuccess:(state)=>{
        //     state.currentUser = null;
        //     state.loading = false;
        //     state.error = null;
        // },
        // deleteUserFailure:(state,action)=>{
        //     state.error = action.payload
        //     state.loading = false;

        // }
    }
})

export const{
    signInStart,signInSuccess,signInFailure,
    signOutFailure,signOutStart,signOutSuccess
} =  employeSlice.actions;

export default employeSlice.reducer;


// ,updateUserFailure,
//     updateUserStart,updateUserSuccess,
//     deleteUserFailure,deleteUserStart,deleteUserSuccess,
//     signOutFailure,signOutStart,signOutSuccess
