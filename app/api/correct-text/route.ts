import { NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(request: Request) {
    try {
        const { text } = await request.json();
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Chybí API klíč.' }, { status: 500 });
        }

        const correctedText = `Opravený text: ${text}`;
        console.log("Mocknutá odpověď API:", correctedText);

        return NextResponse.json({ correctedText });

    } catch (error) {
    
        return NextResponse.json({ error: 'Chyba při zpracování' }, { status: 500 });
    }
    
}