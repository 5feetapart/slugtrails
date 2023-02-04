import { CollectionReference, getFirestore, type DocumentData, collection, doc, DocumentReference } from "firebase/firestore";
import { app } from "../firebase";
import type { UserDoc } from "$lib/User";

const fs = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(fs, collectionName) as CollectionReference<T>;
};

const createDoc = <T = DocumentData>(collectionName: string, docName: string) => {
    return doc(fs, collectionName, docName) as DocumentReference<T>;
};

export const usersCollection = createCollection<UserDoc>("users");

export const createUserDoc = (uid: string) => createDoc<UserDoc>("users", uid);