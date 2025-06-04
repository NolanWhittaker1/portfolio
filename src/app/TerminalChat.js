'use client';
import Image from "next/image";
import React, {useState, useRef, useEffect} from "react";
import bg1 from './images/bg-1.jpg';
import bg2 from './images/bg-2.jpg';
import bg3 from './images/bg-3.jpg';

export default function TerminalChat() {
    const [chat, setChat] = useState([{type:"system", content:"Welcome to my Portfolio!"}, {type:"system", content:"Type \'help\' to get started!"}, {type:"system", content:"To learn about me type \'about\'!"}]);
    const [userMessage, setUserMessages] = useState("");
    const [background, setbackground] = useState({userColor:'#AEE4F8', systemColor:'white', backgroundImg:bg3});
    const [indx, setIndx] = useState(0);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    function handleMessage(e) {
        setUserMessages(e.target.value);
    }

    function handleUpdateChat(e) {
        setIndx(0);
        e.preventDefault();
        setChat(c => [...c, {type: "user", content: userMessage }])
        switch (userMessage) {
            case 'help':
                setChat(c => [...c, {type: "system", content: "List of useful commands: about, projects, experience, resume, github, background, clear, help"}])
                break;
            case 'github':
                setChat(c => [...c, {type: "link", content: "https://github.com/NolanWhittaker1"}])
                break;
            case 'projects':
                setChat(c => [
                    ...c,
                    { type: "system_bold", content: "Projects" },
                    { type: "system_bold", content: "Leetcode AI Assistant" },
                    { type: "system", content: "Built a Chrome Extension that integrates OpenAI to assist with coding problems, features algorithm visualizations using mermaid.js, and includes a responsive UI developed through client collaboration." },
                    { type: "system", content: "\n" },
                    { type: "system_bold", content: "BCCompSciConnect" },
                    { type: "system", content: "Created a platform to connect computing science students for collaboration and opportunities, with Google Sign-In for authentication and multiple rounds of user testing to refine the design." },
                    { type: "system", content: "\n" },
                    { type: "system_bold", content: "ShapeUp Fitness" },
                    { type: "system", content: "Developed a full-stack fitness app for personalized training plans, working with a local client to gather requirements and iterate on the UI/UX based on real user feedback." },
                ]);
                break;
            case 'experience':
                setChat(c => [
                    ...c,
                    { type: "system_bold", content: "Experience" },
                    { type: "system_bold", content: "Downhole Battery" },
                    { type: "system", content: "Built a mobile-friendly marketing website using HTML and Tailwind CSS, ensured all requirements were met through direct client communication, and applied modern UI/UX principles for a clean design." },
                ]);
                break;
            case 'clear':
                setChat([]);
                break;
            case 'resume': //To-DO FIX
                setChat(c => [...c, {type: "download", content: "/NolanWhittaker.pdf"}]);
                break;
            case 'about':
                setChat(c => [...c, { type: "system", content: "Hi! I'm Nolan, a third-year Computer Science student at Simon Fraser University (SFU)." }]);
                setChat(c => [...c, { type: "system", content: "I'm passionate about Data Analysis, Software Development, and Backend Development." }]);
                setChat(c => [...c, { type: "system", content: "Outside of tech, I enjoy hockey, hiking, gaming, and traveling." }]);
                setChat(c => [...c, { type: "system", content: "Currently I am working on an application that helps simplify stat tracking for hockey!" }]);
                break;
            case 'theme':
                setChat(c => [...c, { type: "system", content: "Here is a list of themes!" }]);
                setChat(c => [...c, { type: "system", content: "theme grassy" }]);
                setChat(c => [...c, { type: "system", content: "theme sandy" }]);
                setChat(c => [...c, { type: "system", content: "theme snowy" }]);
                break;
            case 'theme grassy':
                setbackground({userColor:'#4CAF50', systemColor:'white', backgroundImg:bg1});
                break;
            case 'theme sandy':
                setbackground({userColor:'#F4E1C1', systemColor:'white', backgroundImg:bg2});
                break;
            case 'theme snowy':
                setbackground({userColor:'#AEE4F8', systemColor:'white', backgroundImg:bg3});
                break;
        }
        setUserMessages("");
    }

    function handleFinishText(e) {
        const words = ['theme', 'theme snowy', 'theme sandy', 'theme grassy', 'about', 'projects', 'resume', 'clear', 'experience', 'github', 'help']
        const results = words.filter(e1 => e1.startsWith(userMessage));
        if(results.length > 0) {
            setUserMessages(results[indx]);
            setIndx((indx + 1) % results.length);
        }
    }

  return (
        <div className="flex items-center justify-center w-screen h-screen sm:text-base md:text-xl lg:text-xl " style={{ backgroundImage: `url(${background.backgroundImg.src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            <div id="container" className="bg-black/80 w-[90%] h-[90%] p-1 border-2 border-solid text-wrap overflow-y-auto scrollbar-hide" style={{color: background.userColor, whiteSpace: 'pre-wrap'}}>
                {chat.map((c, index) => {
                    return (
                    <div key={index}>
                        {c.type === 'user' && (<div style={{color: background.systemColor}}>PS C:\Users\user&gt; &nbsp;<span style={{color: background.userColor}}>{c.content}</span></div>)}
                        {c.type === 'system' && (<p style={{color: background.systemColor}}>{c.content}</p>)}
                        {c.type === 'system_bold' && (<p style={{color: background.systemColor}} className="font-bold">{c.content}</p>)}
                        {c.type === 'link' && (<a href={c.content} target="_blank">Click here</a>)}
                        {c.type === 'download' && (<a href={c.content} download>Click here to download</a>)}
                    </div>
                    );
                })}
                <div className='flex flex-row'>
                    <h2 style={{color: background.systemColor}}>PS C:\Users\user&gt; &nbsp;</h2>
                    <input
                        className="outline-none"
                        type="text"
                        value={userMessage}
                        onChange={handleMessage}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleUpdateChat(e);
                                e.preventDefault(); // optional: to prevent a newline in text inputs
                            } else if(e.key === "Tab") {
                                handleFinishText(e);
                                e.preventDefault();
                                console.log("tab pressed");
                            }
                        }}
                    />
                </div>
                <div ref={chatEndRef} />
            </div>
        </div>
  );
}
