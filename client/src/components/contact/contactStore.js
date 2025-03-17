import React from 'react';
import {create} from "zustand";
import axios from "axios";

const ContactStore = create((set)=>({
    contactFormValue:{name:"",email:"", mobile:"",subject:"",message:""},
    contactFormOnChange:(name, value)=>{
        set((state)=>({
            contactFormValue:{
                ...state.contactFormValue,
                [name]:value
            }
        }));
    },
    contactFormOnSubmit:async (reqBody)=>{
        try {
            const res = await axios.post("/api/create-message", reqBody);
            if (res.data.status === "success") {
                set({contactFormValue:res.data.data});
                return {status:"success", data:res.data};
            }else {
                return {status:"failed", message:res.data.message};
            }
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    inboxList:null,
    getInboxList:async (pageNo, perPage)=>{
        try{
            const res =await axios.get(`/api/inbox?pageNo=${pageNo}&perPage=${perPage}`);
            set({inboxList: res.data['data']});
            set({totalInbox: res.data['total']});
            return res.data["status"] === "success";
        }catch (e) {
            return {status:"error", message:e.message};
        }
    }








}));

export default ContactStore;