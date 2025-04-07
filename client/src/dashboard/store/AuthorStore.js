import React from 'react';
import {create} from "zustand";
import axios from "axios";

const AuthorStore = create((set)=>({

    authorForm:{name:"",bio:"",profilePicture:"",nationality:""},
    authorFormOnChange:(name, value)=>{
        set((state)=>({
            authorForm:{
                ...state.authorForm,
                [name]:value,
            }
        }));
    },
    createAuthor: async (postBody)=>{
        try{
            const res =await axios.post("/api/createAuthor", postBody);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },

    authorList:null,
    totalAuthor:null,
    getAuthorList:async (pageNo, perPage, allData)=>{
        try{
            const res =await axios.get(`/api/authorList?pageNo=${pageNo}&perPage=${perPage}&allData=${allData}`);
            if(res.data.status === "success" && res.data.data){
                set({authorList: res.data['data'], totalAuthor: res.data['total']});
            }
            return res.data["status"] === "success";
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },

    updateAuthor: async (id, postBody)=>{
        try{
            const res =await axios.put("/api/updateAuthor/"+id, postBody);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    deleteAuthor: async (id)=>{
        try{
            const res =await axios.delete("/api/deleteAuthor/"+id);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    }






}));

export default AuthorStore;