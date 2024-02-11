import React from 'react'
import {openai, supabase } from "../config"

export default function useMovie() {

    const [content, setContent] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [poster, setPoster] = React.useState("") 
    const [loading, setLoading] = React.useState(false) 
    
    const main = async (input) => {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input,
        }); 
        
        const embedding = embeddingResponse.data[0].embedding;
        
        const { data } = await supabase.rpc('match_popchoicemovies', {
          query_embedding: embedding,
          match_threshold: 0.50,
          match_count: 1
        });

        moviePoster(data[0].title)
        setTitle(data[0].title)
        setContent(data[0].content)
      }

    const moviePoster = async (movieTitle) => {
        await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setPoster(`https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`)
          setLoading(true)
        })
      }


      return { 
        main, 
        title, 
        content, 
        poster, 
        loading, 
        setLoading
      }
}
