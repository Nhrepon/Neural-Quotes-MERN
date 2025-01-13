
import {create} from "zustand";
import axios from "axios";

const CategoryStore = create((set)=>({

    categoryForm:{categoryName:"",categoryDesc:"", categoryImg:""},
    categoryFormOnChange:(name, value)=>{
        set((state)=>({
            categoryForm:{
                ...state.categoryForm,
                [name]:value
            }
        }));
    },
    createCategory: async (postBody)=>{
        try{
            const res =await axios.post("/api/createCategory", postBody);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    categoryList:null,
    getCategoryList:async ()=>{

        try{
            const res =await axios.get("/api/categoryList");
            set({categoryList: res.data['data']});
            return res.data["status"] === "success";
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    updateCategory: async (id, postBody)=>{
        try{
            const res =await axios.put("/api/updateCategory/"+id, postBody);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    },
    deleteCategory: async (id)=>{
        try{
            const res =await axios.delete("/api/deleteCategory/"+id);
            return res.data;
        }catch (e) {
            return {status:"error", message:e.message};
        }
    }








}));

export default CategoryStore;