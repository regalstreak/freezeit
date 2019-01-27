import { config } from "./firebaseConfig";
import firebase from "firebase/app";

const firebaseInstance = firebase.initializeApp(config);

export default { firebaseInstance };
