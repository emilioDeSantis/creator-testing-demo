import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Survey, Question, Option, Parameters, QuestionType, Result } from "./types"; // Adjust the path to your types file
import firestore from "../../firebaseConfig";

export const fetchSurvey = async (surveyId: string): Promise<Survey | null> => {
    console.log("Fetching survey with ID:", surveyId);
    try {
        const docRef = doc(firestore, "surveys", surveyId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Survey;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return null;
    }
};

const sanitizeString = (str: string): string => {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

export const createSurvey = async (name: string): Promise<string | null> => {
    const sanitizedSurveyId = sanitizeString(name) + '-' + uuidv4();
    const newSurvey: Survey = {
        name,
        questions: [],
    };
    try {
        await setDoc(doc(firestore, "surveys", sanitizedSurveyId), newSurvey);
        return sanitizedSurveyId;
    } catch (error) {
        console.error("Error creating survey:", error);
        return null;
    }
};

export const updateSurvey = async (surveyId: string, survey :Survey, ): Promise<boolean> => {
    try {
        await setDoc(doc(firestore, "surveys", surveyId), survey);
        return true;
    } catch (error) {
        console.error("Error updating survey:", error);
        return false;
    }
};

export const submitResults = async (surveyId: string, results: Result): Promise<boolean> => {
    try {
        const resultsRef = collection(doc(firestore, "surveys", surveyId), "results");
        await addDoc(resultsRef, { results });
        return true;
    } catch (error) {
        console.error("Error submitting answers:", error);
        return false;
    }
};

// Add more utility functions as needed
