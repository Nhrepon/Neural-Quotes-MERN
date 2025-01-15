import React from 'react';
import {create} from "zustand";
import axios from "axios";

const QuoteStore = create((set)=>({

    quoteForm:{quote:"",authorId:"",categoryId:"",status:"pending"},
    quoteFormOnChange:(name, value)=>{
        set((state)=>({
            quoteForm:{
                ...state.quoteForm,
                [name]:value,
            }
        }));
    },
    createQuote:async (postBody)=>{
        try{
            const res =await axios.post("/api/createQuote", postBody);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    quoteList:null,
    getQuoteList:async ()=>{
        try{
            const res =await axios.get("/api/quoteList");
            set({quoteList: res.data['data']});
            return res.data["status"] === "success";
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    updateQuote:async (id, postBody)=>{
        try{
            const res =await axios.put("/api/updateQuote/"+id, postBody);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    deleteQuote:async (id)=>{
        try{
            const res =await axios.delete("/api/deleteQuote/"+id);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    }







}));

export default QuoteStore;