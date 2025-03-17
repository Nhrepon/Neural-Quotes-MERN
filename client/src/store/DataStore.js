import React from 'react';
import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const DataStore = create((set)=>({
    categoryListWithQuotes:[],
    categoryId:null,
    getCategoryWithQuotes: async ()=>{
        const res = await axios.get("/api/categoryWithQuotes");
        if(res.data.status === "success"){
            set({categoryListWithQuotes:res.data.data});
            set({categoryId:res.data.data[0]._id});
        }
    },
    quoteListByCategory:[],
    total:null,
    getQuoteListByCategory : async (id, pageNo, perPage)=>{
        try{
            const res = await axios.get(`/api/quoteByCategory/${id}?pageNo=${pageNo}&perPage=${perPage}`);
            if(res.data.status === "success"){
                set({quoteListByCategory:res.data.data});
                set({total:res.data.total});
            }
        }catch (e) {
            toast.error(e.message);
        }
    },









}));

export default DataStore;