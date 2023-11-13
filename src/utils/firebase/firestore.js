import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();
const fruitCollectionRef = collection(db, "fruits");

const firestoreFunctions = {
  async addFruitToFirestore(fruitData) {
    try {
      const docRef = await addDoc(fruitCollectionRef, fruitData);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },
  async fetchAllFruits() {
    try {
      const querySnapshot = await getDocs(fruitCollectionRef);
      const fruits = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return fruits;
    } catch (error) {
      throw error;
    }
  },

  async fetchFruitByName(fruitName) {
    try {
      const lowercaseFruitName = fruitName.toLowerCase();
      const fruitQuery = query(
        fruitCollectionRef,
        where("nameLowerCase", "==", lowercaseFruitName)
      );

      const querySnapshot = await getDocs(fruitQuery);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const selectedFruit = {
        id: doc.id,
        ...doc.data(),
      };

      return selectedFruit;
    } catch (error) {
      throw error;
    }
  },

  async isFruitNameUnique(fruitName) {
    const fruitQuery = query(
      fruitCollectionRef,
      where("name", "==", fruitName)
    );

    const querySnapshot = await getDocs(fruitQuery);
    return querySnapshot.empty;
  },
  async updateFruitInFirestore(fruitId, updatedFruitData) {
    const fruitDocRef = doc(fruitCollectionRef, fruitId);
    try {
      await setDoc(fruitDocRef, updatedFruitData, { merge: true });
    } catch (error) {
      throw error;
    }
  },
  async deleteFruitFromFirestore(fruitId) {
    const fruitDocRef = doc(fruitCollectionRef, fruitId);
    try {
      await deleteDoc(fruitDocRef);
    } catch (error) {
      throw error;
    }
  },
};

export const {
  addFruitToFirestore,
  fetchAllFruits,
  fetchFruitByName,
  isFruitNameUnique,
  updateFruitInFirestore,
  deleteFruitFromFirestore,
} = firestoreFunctions;
export default firestoreFunctions;
