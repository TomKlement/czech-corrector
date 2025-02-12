"use client";
import { useState } from "react";
import axios from "axios";

export default function Corrector() {

  const[text, setText] = useState<string>("");
  const[correctedText, setcorrectedText] = useState<string>("");
  const[copied, setCopied] = useState<boolean>(false);
  const[errorMessage, setErrorMessage] = useState<string>("")

  const clickHandle = async () => {
    try {

        setErrorMessage("");
        const response = await axios.post("/api/correct-text", {text})
        setcorrectedText(response.data.correctedText)
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error: any) {

          console.error("Chyba při odesílání požadavku:", error);

          if (error.response?.data?.error) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("Došlo k chybě při komunikaci se serverem.");
          }

        }
  }

  const copyHandle = () => {
    if (correctedText) {
      navigator.clipboard.writeText(correctedText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000);
      }).catch((error) => {
        console.error('Chyba při kopírování:', error);
      });
    }
  }

    return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-green-kelp-200 text-green-kelp-950 rounded-lg shadow-md">
      <h2 className="font-light text-2xl mb-4 text-center text-green-kelp-900">czecho corectiono</h2>
      <textarea
        className="font-light italic h-32 w-full p-5 bg-white text-green-kelp-950 rounded-md mb-2 text-sm align-top resize-none overflow-auto focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") clickHandle(); }}
      />
      <button className="font-light w-full p-2 bg-green-kelp-500 text-white rounded-md mb-4 hover:bg-green-kelp-600 transition duration-300" onClick={clickHandle}>Opravit</button>
      
      {errorMessage && (
        <div className="mb-2 text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
      
        <div>
          <textarea className="font-light italic h-32 w-full p-5 bg-white text-green-kelp-950 rounded-md mb-2 resize-none text-left align-top text-sm focus:outline-none"
            value={correctedText}
            readOnly
          />
          <button className=" font-light min-w-80 w-full p-2 bg-green-kelp-500 text-white rounded-md mb-4 hover:bg-green-kelp-600 transition duration-300" onClick={copyHandle}>{copied ? "Zkopírováno" : "Kopírovat"}</button>
        </div>

    </div>
    )
  }