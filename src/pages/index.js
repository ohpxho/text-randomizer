import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'; 
import Data from '../data.json';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [questions, setQuestions] = useState({});
  
  useEffect(()=>{
    setQuestions(Data);
  },[]);

  const [txt, setTxt] = useState('###');
  const [txtAreaValue, setTxtAreaValue] = useState('');
  const [chosenTxt, setChosenTxt] = useState({});

  const handleTxtAreaChange = (event) => {
    setTxtAreaValue(event.target.value);
  };

  const setTxtAreaValueByType = (event) => {
    const id = event.target.id;

    setChosenTxt({});

    if(id == "allType") {
      let union = [];
      for(let key in questions) union.push(questions[key].join('\n'));
      setTxtAreaValue(union.join('\n'))
    } else {
      setTxtAreaValue(questions[id].join('\n'));
    }
  };

  const randomize = () => {
    const chosenTxt = getRandomTxt();
    const txtNoOfTimesChosen = getTxtNoOfTimesChosen(chosenTxt);    

    if(txtNoOfTimesChosen>=1) removeTxtFromTxtArea(chosenTxt);

    if(chosenTxt.trim()==='') setTxt('###');
    else setTxt(chosenTxt);
  }

  const getRandomTxt = () => {
    const txt = txtAreaValue;
    const txtArr = txt.split("\n");
    const chosenTxt =txtArr[Math.floor(Math.random() * txtArr.length)];
    return chosenTxt;
  }

  const getTxtNoOfTimesChosen = (txt) => {
    if(!chosenTxt[txt]) chosenTxt[txt] = 1;
    else chosenTxt[txt]++;
    return chosenTxt[txt]
  }

  const removeTxtFromTxtArea = (txt) => {
    const txtArr = txtAreaValue.split('\n');
    for(let i=0; i<txtArr.length; i++) if(txtArr[i]==txt) txtArr.splice(i, 1)
    setTxtAreaValue(txtArr.join('\n'));
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <div className="z-10 w-full items-center justify-center font-mono text-sm h-full flex flex-col gap-5 p-12">
         <div className="mb-5">
          <p className="font-bold text-xl lg:mb-0">Interview Prep. Helper</p>
          <p className="text-xs"><i>for programmers</i></p>
         </div>
         <div className="sticky top-0 flex w-full p-10 justify-center items-center bg-white border-2 border-slate-500">
            <p className="text-lg font-bold">{txt}</p>
            <span className="absolute left-5 top-5">{chosenTxt[txt]}</span>
          </div>
          <div className="w-full lg:w-2/3">
           <div className="flex flex-col gap-2 w-full h-full">
              <p className="my-3">Type text, every <i>new line</i> is another option for randomization</p>
              <textarea placeholder="type here...." className="h-52 outline-none p-5" value={txtAreaValue} onChange={handleTxtAreaChange}></textarea>
              <p className="my-3">Options below are prepared questions for interview (some questions are tailored for me)</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.keys(questions).map((key) => (<button id={key} onClick={setTxtAreaValueByType} className="p-2 bg-slate-400 text-slate-100">{key}</button>))}
                <button id="allType" onClick={setTxtAreaValueByType} className="p-2 bg-slate-400 text-slate-100">*</button>
              </div>
              
              <button onClick={randomize} className="cursor-pointer w-full my-5 py-3 bg-green-500 text-white">randomize</button>
           </div>
         </div>
      </div>
    </main>
  )
}

//https://www.simplilearn.com/web-development-interview-questions-article
//https://intellipaat.com/blog/interview-question/web-developer-interview-questions/
//https://www.interviewbit.com/software-engineering-interview-questions/#various-categories-of-software
//https://www.indeed.com/career-advice/interviewing/software-engineer-interview-questions
//https://blog.hubspot.com/website/backend-interview-questions
//https://www.interviewbit.com/front-end-developer-interview-questions//
//https://www.interviewbit.com/javascript-interview-questions/