import { collection } from 'firebase/firestore'
import { db } from './firebase'




//room collection
export const roomCollection =collection(db,"rooms")