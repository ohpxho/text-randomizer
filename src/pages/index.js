import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'; 

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [txt, setTxt] = useState('');
  const [txtAreaValue, setTxtAreaValue] = useState('');

  const handleTxtAreaChange = (event) => {
    setTxtAreaValue(event.target.value);
  };

  const randomize = () => {
    const txt = txtAreaValue;
    const txtArr = txt.split("\n");
    setTxt(txtArr[Math.floor(Math.random() * txtArr.length)]); 
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm h-full lg:flex lg:flex-col gap-5 ">
         <div className="flex p-10 justify-center items-center bg-white border-2 border-slate-500">
            <p className="text-lg font-bold">{txt}</p>
          </div>

         <div className="flex flex-col gap-2 h-full">
            <textarea className="h-52 outline-none p-5" value={txtAreaValue} onChange={handleTxtAreaChange}></textarea>
            <input type="file" id="txt-file"/>
            <button onClick={randomize} className="cursor-pointer w-full py-3 bg-green-500 text-white">randomize</button>
         </div>
      </div>
    </main>
  )
}

