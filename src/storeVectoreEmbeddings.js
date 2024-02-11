import {openai, supabase } from "./config"
import movies from './content.js'

async function main(input) {
    try {
        // Generate embeddings for all text chunks
        const embeddingResponses = await Promise.all(
            input.map(async (movie) => {
                // Generate embedding for the content
                const embeddingResponse = await openai.embeddings.create({
                    model: "text-embedding-ada-002",
                    input: movie.content,
                });
                return {
                    ...movie,
                    embedding: embeddingResponse.data[0].embedding,
                };
            })
        );

        // Upsert the data into Supabase
        const { data, error } = await supabase
            .from("popchoicemovies")
            .upsert(embeddingResponses, { onConflict: ['content'] });

        if (error) {
            console.error("Error upserting data:", error);
        } else {
            console.log("Upsert successful. Data:", data);
        }

        console.log("Upsert complete!");
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

// main(movies); 