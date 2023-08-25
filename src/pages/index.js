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

  const handleTxtAreaChange = (event) => {
    setTxtAreaValue(event.target.value);
  };

  const setTxtAreaValueByType = (event) => {
    const id = event.target.id;

    if(id == "allType") {
      let union = [];
      for(let key in questions) union.push(questions[key].join('\n'));
      setTxtAreaValue(union.join('\n'))
    } else {
      setTxtAreaValue(questions[id].join('\n'));
    }
  };

  const randomize = () => {
    const txt = txtAreaValue;
    const txtArr = txt.split("\n");
    const chosenTxt =txtArr[Math.floor(Math.random() * txtArr.length)];
    
    if(chosenTxt.trim()==='') setTxt('###');
    else setTxt(chosenTxt);
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm h-full lg:flex lg:flex-col gap-5 p-12">
         <p className="font-bold text-xl">Interview Prep. Helper</p>
         <div className="flex w-full p-10 justify-center items-center bg-white border-2 border-slate-500">
            <p className="text-lg font-bold">{txt}</p>
          </div>
          <div className="w-2/3">
           <div className="flex flex-col gap-2 w-full h-full">
              <p className="my-3">Type text, every <i>new line</i> is another option for randomization</p>
              <textarea placeholder="type here...." className="h-52 outline-none p-5" value={txtAreaValue} onChange={handleTxtAreaChange}></textarea>
              <p className="my-3">Options below are prepared questions for interview (some questions are tailored for me)</p>
              <div className="grid grid-cols-4 gap-2">
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

