"use client";
import React, { useEffect } from "react";
import NewQuestion from "./components/NewQuestion";
import QuestionEditor from "./components/QuestionEditor";
import PublishButton from "./components/PublishButton";
import { doc, setDoc } from "firebase/firestore";
import firestore from "../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface Question {
    question: string;
    options: string[];
}

interface Survey {
    questions: Question[];
    name: string;
}

const CreateSurvey: React.FC = () => {
    const [survey, setSurvey] = React.useState<Survey>({
        questions: [],
        name: "",
    });

    const [surveyName, setSurveyName] = React.useState("");
    const router = useRouter();

    useEffect(() => {
        setSurvey(prev => ({
            ...prev,
            name: surveyName,
        }));
    }, [surveyName]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurveyName(event.target.value);
    };

    const publish = async () => {
        try {
            const formattedSurvey: Survey = {
                ...survey,
                questions: survey.questions
                    .filter((question) => question.question !== "")
                    .map((question) => ({
                        ...question,
                        options: question.options.filter((option) => option !== "")
                    }))
            };
            const docId = survey.name.replace(/\s/g, "-") + uuidv4();
            await setDoc(doc(firestore, "surveys", docId), formattedSurvey);
            router.push("/"); // Redirect to home page
        } catch (error) {
            console.error("Error updating document:", error);
            alert(
                "Error updating document. Check the console for more information."
            );
        }
    };

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                height: "100vh",
                paddingBottom: "2rem",
                marginTop: "4rem",
            }}
        >
            <div
                style={{
                    width: "100%",
                    marginBlock: "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        width: "26rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBlock: "1.2rem",
                        borderBottom: "1px solid #eee",
                    }}
                >
                    Create your survey
                </h1>
                <div
                    style={{
                        position: "absolute",
                        right: "1.2rem",
                    }}
                >
                    <PublishButton onClick={publish} />
                </div>
                <div
                    style={{
                        position: "absolute",
                        left: "1.2rem",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Name your survey"
                        value={surveyName}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    width: "100%",
                    flexGrow: 1,
                    paddingInline: "1.2rem",
                    gap: "1.6rem",
                }}
            >
                <div
                    style={{
                        width: "20rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        borderRadius: "4px",
                    }}
                ></div>
                <div
                    style={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        maxHeight: "100%",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        paddingInline: "8rem",
                        paddingTop: "6rem",
                        overflowY: "auto",
                        paddingBottom: "24rem",
                    }}
                >
                    {survey.questions.map((question, index) => (
                        <QuestionEditor
                            key={index}
                            index={index}
                            setSurvey={setSurvey}
                            survey={survey}
                        />
                    ))}

                    <NewQuestion setSurvey={setSurvey} survey={survey} />
                </div>
                <div
                    style={{
                        width: "20rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        borderRadius: "4px",
                    }}
                ></div>
            </div>
        </main>
    );
};

export default CreateSurvey;
