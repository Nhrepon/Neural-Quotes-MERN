
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
    totalQuote:null,
    getQuoteList:async (pageNo, perPage, status, filter, authorId)=>{
        try{
            const res =await axios.get(`/api/quoteList?pageNo=${pageNo}&perPage=${perPage}&status=${status}&filter=${filter}${authorId ? "&authorId="+authorId : ""}`);
            set({quoteList: res.data['data']});
            set({totalQuote: res.data['total']});
            return res.data["status"] === "success";
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    singleQuote: null,
    getSingleQuote:async (id)=>{
        try{
            set({singleQuote: null});
            const res = await axios.get("/api/singleQuote/"+id);
            // if (res.data.status === "success") {
            //     set({singleQuote: res.data});
            // }
            set({singleQuote: res.data});
            return res.data["status"] === "success";
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    quoteMeta:async (id, sharedCount, likes)=>{
        try{
            const metaData = {
                sharedCount:sharedCount,
                likes:likes
            }
            const res =await axios.put("/api/quoteMeta/"+id, metaData);
            return res.data;
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