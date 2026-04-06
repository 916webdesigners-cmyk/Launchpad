import { collection, addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { QuestionnaireAnswers, GeneratedWorkflow } from "@/types";

/**
 * Save a generated workflow to Firestore
 */
export async function saveWorkflow(
  answers: QuestionnaireAnswers,
  workflow: GeneratedWorkflow
): Promise<string> {
  const docRef = await addDoc(collection(db, "workflows"), {
    answers,
    workflow,
    createdAt: serverTimestamp(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "server",
  });

  return docRef.id;
}

/**
 * Retrieve a saved workflow by document ID
 */
export async function getWorkflow(
  id: string
): Promise<{ answers: QuestionnaireAnswers; workflow: GeneratedWorkflow } | null> {
  const docSnap = await getDoc(doc(db, "workflows", id));

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    answers: data.answers as QuestionnaireAnswers,
    workflow: data.workflow as GeneratedWorkflow,
  };
}
