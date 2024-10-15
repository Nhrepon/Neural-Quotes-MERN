import React from 'react';
import {create} from "zustand";
import axios from "axios";


const UserStore = create((set)=>({

    isFormSubmit: false,

    registrationFormValue: {email:"", password:""},

    registrationFormOnChange:(name, value)=>{
        set((state)=>({
            registrationFormValue:{
                ...state.registrationFormValue,
                [name]: value,
            },
        }));
    },

    userRegistration: async (postBody)=>{
        try {
            set({isFormSubmit: true});
            const response = await axios.post(`/api/userRegistration`, postBody);
            set({isFormSubmit: false});

            if (response.data["status"]==="duplicate"){
                return false;
            }else {
                return response.data["status"] === "success";
            }

        }catch (e) {
            return {status:"error", error:e}
        }
    },
    //////////////////////////////////////////////////////////////

    loginFormValue: {email:"", password:""},

    loginFormOnChange:(name, value)=>{
        set((state)=>({
            loginFormValue:{
                ...state.loginFormValue,
                [name]: value,
            },
        }));
    },

    userLogin:async (postBody)=>{
        try {
            set({isFormSubmit:true});
            const response = await axios.post(`/api/userLogin`, postBody);
            sessionStorage.setItem("email",postBody.email);

            set({isFormSubmit:false});

            if(response.data["status"] === "userNotFound"){
                return false;
            } else {
                return response.data["status"] === "success";
            }

        }catch (e) {
            return {status:"error", error:e}
        }
    },




    userProfileForm: {userName: "", firstName: "", lastName: "", age: "", gender: "", userMobile: "", userAddress: "", userPostalCode: "", userDistrict: "", userCity: "", userState: "",userCountry: ""},
    userProfileFormOnChange:(name, value)=>{
        set((state)=>({
            userProfileForm:{
                ...state.userProfileForm,
                [name]:value,
            },
        }))
    },
    userProfile: null,
    getUserProfile: async ()=>{
        try {
            const profileData = await axios.get("/api/userProfileRead");
            
            if(profileData.data["status"] === "success"){
                set({ userProfile: profileData.data['profile'] });
                set({ userProfileForm: profileData.data['profile'] });
            }else {
                set({ userProfile: null});
            }

        }catch (error) {
            return ({status:"error", message:error});
        }
    },

    userProfileUpdate: async (postBody)=>{
        try {
            set({userProfile:null});
            const response = await axios.post("/api/userProfileUpdate", postBody);
            return response.data["status"] === "success";
        }catch (error) {
            return ({status:"error", message:error});
        }
    },













    userLogout: async ()=>{
        try {
            set({isFormSubmit:true});
            const response = await axios.post("/api/userLogout");
            set({isFormSubmit:false});

            return response.data["status"]==="success";
        }catch (error) {
            return ({status:"error", message:error});
        }
    },






}));









export default UserStore;