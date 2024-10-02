import { firebaseDb as db, firebaseStorage } from "./config";
import { useState, useCallback } from "react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  WhereFilterOp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PinFormType } from "@/validationScheme/scheme";
import { PostUploadType } from "@/types/types";

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

  // Upload file function
  const uploadPost = useCallback(
    async (documentId: string, form: PinFormType) => {
      setError(null);
      setLoading(true);
      try {
        // Ensure the file is provided
        if (!form.file) {
          setError("No file provided for upload");
          return; // Early exit if no file
        }

        const storagePath = `uploads/${documentId}/${form.file.name}`;
        const storageRef = ref(firebaseStorage, storagePath); // Create a storage reference

        await uploadBytes(storageRef, form.file); // Upload the file

        const downloadURL = await getDownloadURL(storageRef); // Get download URL

        const postId =
          form.title + "_" + documentId + "_" + Date.now().toString();

        // Prepare the Firestore document reference
        const docRef = doc(db, collectionPath, postId);

        const { file, ...restForm } = form;

        // Prepare the post data
        const postData: PostUploadType = {
          ...restForm,
          image: downloadURL,
          id: crypto.randomUUID(),
          uploadedDate: Date.now().toString(),
          userId: documentId,
        };

        await setDoc(docRef, postData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to upload file"
        );
      } finally {
        setLoading(false);
      }
    },
    [collectionPath]
  );

  // Query Documents
  const queryDocuments = useCallback(
    async (field: string, operator: WhereFilterOp, value: any) => {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, collectionPath),
          where(field, operator, value)
        );
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return documents;
      } catch (error: any) {
        setError(error.message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [collectionPath]
  );

  return {
    readDocument,
    writeDocument,
    editDocument,
    deleteDocument,
    uploadPost,
    queryDocuments,
    loading,
    error,
  };
};

export default useFireStore;
