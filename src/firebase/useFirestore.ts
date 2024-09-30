import { firebaseDb as db, firebaseStorage } from "./config";
import { useState, useEffect, useCallback } from "react";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PinFormType } from "@/validationScheme/scheme";
import { randomUUID } from "crypto";

type PostUploadType = Omit<PinFormType, "file"> & {
  id: string;
  image: string;
};

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

        // Define the path for the file in storage
        const storagePath = `uploads/${documentId}/${form.file.name}`;
        const storageRef = ref(firebaseStorage, storagePath); // Create a storage reference

        // Upload the file to storage
        await uploadBytes(storageRef, form.file); // Upload the file

        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(storageRef); // Get download URL

        // Prepare the Firestore document reference
        const docRef = doc(db, collectionPath, documentId);

        const { file, ...restForm } = form;

        // Prepare the post data
        const postData: PostUploadType = {
          ...restForm, // Spread the existing form data
          image: downloadURL, // Add the download URL for the image
          id: crypto.randomUUID(), // Generate a unique ID for the post
        };

        console.log(postData);
        console.log(collectionPath);
        console.log(documentId);

        // Store the download URL and post data in Firestore
        await setDoc(docRef, postData); // Store the document
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

  return {
    readDocument,
    writeDocument,
    editDocument,
    deleteDocument,
    uploadPost,
    loading,
    error,
  };
};

export default useFireStore;
