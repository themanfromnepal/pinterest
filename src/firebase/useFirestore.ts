import { firebaseDb as db } from "./config";
import { useState, useEffect, useCallback } from "react";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useFireStore = (collectionPath: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read Document
  const readDocument = useCallback(
    async (docId: string) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionPath, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          throw new Error("Document does not exist");
        }
      } catch (error: any) {
        setError(error.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [collectionPath]
  );

  // Create or Update Document
  const writeDocument = useCallback(
    async (docId: string, data: object) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionPath, docId);
        await setDoc(docRef, data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionPath]
  );

  // Edit (update) document
  const editDocument = useCallback(
    async (docId: string, data: object) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionPath, docId);
        await updateDoc(docRef, data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionPath]
  );

  // Delete document
  const deleteDocument = useCallback(
    async (docId: string) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionPath, docId);
        await deleteDoc(docRef);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionPath]
  );

  const storage = getStorage();

  // Upload file function as a callback
  const uploadFile = useCallback(
    async (file: File, documentId: string) => {
      try {
        // Define the path for the file in storage
        const storagePath = `uploads/${documentId}/${file.name}`;
        const storageRef = ref(storage, storagePath); // Create a storage reference
        await uploadBytes(storageRef, file); // Upload the file

        const downloadURL = await getDownloadURL(storageRef); // Get download URL

        // Update Firestore document with the file URL
        const docRef = doc(db, collectionPath, documentId);
        await updateDoc(docRef, { userImage: downloadURL }); // Store the download URL in the document

        return downloadURL; // Return the file URL
      } catch (error) {
        console.error("File upload failed", error);
        throw new Error("Failed to upload file");
      }
    },
    [collectionPath]
  );

  return {
    readDocument,
    writeDocument,
    editDocument,
    deleteDocument,
    uploadFile,
    loading,
    error,
  };
};

export default useFireStore;
