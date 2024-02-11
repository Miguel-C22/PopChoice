import React from "react";
import useToggle from "./customHooks/toggle";
import useMovie from "./customHooks/movie";

function App() {
  const [questionOne, setQuestionOne] = React.useState("")
  const [questionTwo, setQuestionTwo] = React.useState("")
  const [questionThree, setQuestionThree] = React.useState("")

  //Custom Hooks
  const { toggle, toggleFunction } = useToggle();
  const { 
    main, 
    title, 
    poster, 
    content, 
    loading, 
    setLoading
  } = useMovie()
 
  const query = `
  What's your favorite movie and why? ${questionOne}. 
  Are you in the mood for something new or classic? ${questionTwo}. 
  Do you wanna have fun or do you want something serious? ${questionThree}. `;

  const userInput = async (e) => {
    e.preventDefault()
    main(query)
    toggleFunction()
    
  }

  const playAgain = () => {
    toggleFunction()
    setQuestionOne("")
    setQuestionTwo("")
    setQuestionThree("")
    setLoading(false)
  }

  return (
<div className="flex justify-center items-center flex-col mx-auto px-10 text-white">
  <img src="images/PopChoice Icon.png" 
    className="w-32 mt-11" 
    alt="PopChoice Icon"/>
  <h1 className="mb-12 mt-4 text-4xl font-extrabold">POPCHOICE</h1>
  {!toggle ? (
    <form onSubmit={userInput} className="flex flex-col gap-8 items-center max-w-lg md:max-w-3xl">
      <div className="w-full sm:w-96 flex flex-col gap-3">
        <p className="mb-2">What's your favorite movie and why?</p>
        <textarea
          className="bg-[#3B4877]
         text-white placeholder-text-white 
          pl-5 pr-5 pt-3 pb-12 resize-none 
          rounded w-full overflow-y-hidden overflow-y-autoext-white"
          onChange={(e) => setQuestionOne(e.target.value)}
          placeholder="The Shawshank Redemption
          Because it taught me to never give up hope no matter how hard life gets"
          required
        />
        <p className="mb-2">Are you in the mood for something new or a classic?</p>
        <textarea
          className="bg-[#3B4877]
         text-white placeholder-text-white 
          pl-5 pr-5 pt-3 pb-12 resize-none 
          rounded w-full overflow-y-hidden overflow-y-autoext-white"
          onChange={(e) => setQuestionTwo(e.target.value)}
          placeholder="I want to watch movies that were released after 1990"
          required
        />
        <p className="mb-2">Do you wanna have fun or do you want something serious?</p>
        <textarea
          className="bg-[#3B4877]
         text-white placeholder-text-white
          pl-5 pr-5 pt-3 pb-12 resize-none 
          rounded w-full overflow-y-hidden overflow-y-autoext-white"
          onChange={(e) => setQuestionThree(e.target.value)}
          placeholder="I want to watch something stupid and fun"
          required
        />
      </div>
      <button className="bg-[#51E08A] 
        w-full md:w-96 py-5 mb-8 
        font-extrabold text-4xl rounded text-black"
      >Let's go</button>
    </form>
  ) : (
    <div className="flex flex-col justify-center items-center gap-8 max-w-lg md:max-w-3xl w-full px-8 mb-8">
      <h2 className="text-center text-4xl font-semibold">{title}</h2>
      {loading? <img 
        src={poster} 
        alt="Movie Poster" 
        className="xl:max-w-96  lg:max-w-96 sm:max-w-96 md:max-w-96  h-auto" /> :
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      }
      <p className="max-w-96 lg:max-w-96 xl:max-w-96">{content}</p>
      <button 
        onClick={playAgain} 
        className="bg-[#51E08A] w-full md:w-96 py-5 
        font-extrabold text-4xl rounded text-black"
      >Go Again</button>
    </div>
  )}
</div>
  );
}

export default App;
