import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {Modal} from "bootstrap";



export function unauthorized(code){
    if(code===401){
        sessionStorage.clear();
        localStorage.clear();
        window.location.href="/login"
    }
}

export function setEmail(email){
    sessionStorage.setItem("email",email)
}

export function getEmail(){
    return sessionStorage.getItem("email")
}

export  function TimestampToDate(timestamp) {
    let date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
}

export async  function DeleteAlert() {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function DeleteAlertWithData(id, name) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this! \nDelete? \nid: "+id+" \nname: "+name+" ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function SuccessAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "OK",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function FailAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "warning",
        confirmButtonColor: "#fcac3f",
        confirmButtonText: "Try Again",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function InfoAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "info",
        confirmButtonColor: "#198754",
        confirmButtonText: "Go Ahead",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}


export async function modalHide(id){
    // Close the modal programmatically
    const modalElement = document.getElementById(id);
    const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();
}


export function isLogin(){
    //console.log("this is cookie: "+ sessionStorage.getItem('email'));
    //return sessionStorage.getItem('email') != null && Cookies.get("token") != null;

    return !!Cookies.get("token"); // !! to get boolean result
}


export function isAdmin(){

}



