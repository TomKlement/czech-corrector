"use client";
import { useState } from "react";
import axios from "axios";

export default function Corrector() {

  const[text, setText] = useState<string>("");
  const[correctedText, setcorrectedText] = useState<string>("")

  const clickHandle = async () => {
    try {

        const response = await axios.post("/api/correct-text", {text})
        setcorrectedText(response.data.correctedText)

        } catch(error) {
          console.error("Chyba při odesílání požadavku:", error);
        }
  }

    return (
    <div>
      <input onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") clickHandle()}}></input>
      <button onClick={clickHandle}>Opravit</button>

      <p>{correctedText ? `${correctedText}` : "Zatím žádný text k opravě"}</p>

    </div>
    )
  }