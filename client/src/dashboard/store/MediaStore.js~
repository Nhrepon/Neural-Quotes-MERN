import {create} from "zustand";
import {useState} from "react";
import axios from "axios";


const MediaStore = create((set)=>({

    fileList:null,
    getFileList: async ()=>{
        const res = await axios.get("api/fileLoad");
        set({fileList:res.data['file']});
        return res.data['status'] === "success";
    }








}));

export default MediaStore;