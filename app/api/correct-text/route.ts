import { NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(request: Request) {
    try {
        const {text} = await request.json();
        const apiKey = process.env.OPENAI_API_KEY;
        const prompt = "Jsi AI, která opravy české texty. Opravit máš pouze následující chyby: Gramatické chyby (např. „mne“ vs. „mě“).Chyby v diakritice. Nesprávně použité čárky. Pravopisné chyby (např. „i“ vs. „y“, měkké a tvrdé souhlásky). Opravy chyb v textu, jako jsou překlepy nebo nesprávné slovo (např. „byl sem“ na „byl jsem“). Při opravách se nevyjadřuj k stylistickým změnám nebo změnám v tónu textu. Opravy se mají soustředit na pravopis, interpunkci a gramatiku, nikoliv na vylepšení stylistiky."
        console.log("API Key:", apiKey);


        if (!apiKey) {
            return NextResponse.json({ error: 'Chybí API klíč.' }, { status: 500 });
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: 'Jsi AI, která opravy české texty. Opravit máš pouze následující chyby: Gramatické chyby (např. „mne“ vs. „mě“).Chyby v diakritice. Nesprávně použité čárky. Pravopisné chyby (např. „i“ vs. „y“, měkké a tvrdé souhlásky). Opravy chyb v textu, jako jsou překlepy nebo nesprávné slovo (např. „byl sem“ na „byl jsem“). Při opravách se nevyjadřuj k stylistickým změnám nebo změnám v tónu textu. Opravy se mají soustředit na pravopis, interpunkci a gramatiku, nikoliv na vylepšení stylistiky.',
                },
                {
                  role: 'user',
                  content: text,
                },
              ],
              temperature: 0.15,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
          
          return NextResponse.json({ correctedText: response.data.choices[0].message.content });
        } catch (error: any) {
            console.error("Chyba při volání OpenAI API:", error.response?.data?.error || error);
            throw new Error("Chyba při zpracování textu.");
          }
          
      }