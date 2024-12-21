import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDXeomV42odYOY4tcpXlPXsXiRMXurbBQA",
  authDomain: "netflix-clone-4eb45.firebaseapp.com",
  projectId: "netflix-clone-4eb45",
  storageBucket: "netflix-clone-4eb45.firebasestorage.app",
  messagingSenderId: "89912585841",
  appId: "1:89912585841:web:426445f6f114308326f5d0"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);


const signup = async(name,email,password)=>{

try{
 const res= await createUserWithEmailAndPassword(auth,email,password);
 const user=res.user;
await addDoc(collection(db,"user"),{
  uid:user.uid,
  name,
  authProvider:'local',
  email,
})

}
catch(error){
console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "))

}
}

const login =async (email,password)=>{
try{
await signInWithEmailAndPassword(auth,email,password)
}
catch(error){
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "))

}
}

const logout =async()=>{
  signOut(auth);
}
export {auth,db,login,signup,logout};