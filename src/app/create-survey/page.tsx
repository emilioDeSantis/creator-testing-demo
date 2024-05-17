"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import firestore from "../../../firebaseConfig"; // Adjust the path to your firebaseConfig file
import { v4 as uuidv4 } from "uuid";
import HeavyHitterButton from "../components/HeavyHitterButton";
import { createSurvey } from "../firebaseUtils";
const CreateNewSurvey: React.FC = () => {
    const [surveyName, setSurveyName] = useState("");
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurveyName(event.target.value);
    };

    const handleCreateSurvey = async () => {
        const newSurveyId = await createSurvey(surveyName);
        if (newSurveyId) {
            router.push(`/create-survey/${newSurveyId}`);
        } else {
            alert("Error creating survey. Check the console for more information.");
        }
    };

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100vh",
                padding: "2rem",
            }}
        >
            <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
                Create new survey
            </h1>
            <input
                style={{
                    padding: "0.5rem",
                    fontSize: "1rem",
                    width: "100%",
                    maxWidth: "400px",
                    marginBottom: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
                type="text"
                placeholder="Enter survey name"
                value={surveyName}
                onChange={handleInputChange}
            />
            <HeavyHitterButton
                text="Create survey"
                onClick={handleCreateSurvey}
            />
        </main>
    );
};

export default CreateNewSurvey;
