import { createVNode } from "vue";

export default {
    toast: (text) => {

        let toast = document.querySelector("#ttoast")
        let toastText = document.querySelector("#ttoasttext");
       
        if(!toast){
            const body = document.querySelector("body")
            
            
            toast = document.createElement("div");
            toast.classList.add('toast')
            toast.classList.add('toast-invisible')
            toast.id = "ttoast"
            toastText =  document.createElement("p");
            toastText.classList.add('ttoast-text')
            toastText.id = 'ttoasttext'
            toast.append(toastText)
            body.append(toast)
           
        }
        toastText.innerHTML = text
        toast.classList.remove("toast-invisible")
        toast.classList.add("toast-visible")
        setTimeout(() => {
            toast.classList.remove('toast-visible')
            toast.classList.add("toast-toinvisible")
        }, 1000)

        setTimeout(() => {
            toast.classList.remove("toast-toinvisible")
            toast.classList.add("toast-invisible")
        }, 3000)
    }
}