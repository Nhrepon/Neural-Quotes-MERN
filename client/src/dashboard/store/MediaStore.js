import {create} from "zustand";
import {useState} from "react";
import axios from "axios";


const MediaStore = create((set)=>({

    fileList:null,
    totalFile:null,
    getFileList: async (pageNo, perPage)=>{
        //set({fileList: null});
        const res = await axios.get(`api/fileLoad?pageNo=${pageNo}&perPage=${perPage}`);
        set({fileList:res.data['file']});
        set({totalFile:res.data['total']});
        return res.data['status'] === "success";
    }








}));

export default MediaStore;