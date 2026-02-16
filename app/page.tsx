"use client";
import { useState } from "react";
import Navbar from "@components/navbar";
import MusicPlayer from "@components/musicplayer";
import Footer from "@components/footer";

export default function Home() {
    const sequence = [
        { type: "color", value: "black", text: "black" },
        { type: "color", value: "white", text: "white" },
        { type: "color", value: "[#01ff92]", text: "black" },
    ];

    const [buttonIndex, setButtonIndex] = useState(0);
    const [bgIndex, setBgIndex] = useState(sequence.length - 1);

    const handleToggle = () => {
        setBgIndex(buttonIndex);
        setButtonIndex((prev) => (prev + 1) % sequence.length);
    };

    const currentBg = sequence[bgIndex];
    const bgStyle = currentBg.value.startsWith('[') ? currentBg.value.slice(1, -1) : currentBg.value;

    const Marquee = ({ className = "" }: { className?: string }) => (
        <div className={"fixed w-[300vw] py-4 -rotate-45 origin-center pointer-events-none " + className} style={{ left: '-100vw', top: '50%', backgroundColor: bgStyle === "#01ff92" ? "white" : "#01ff92" }}>
            <div className="animate-marquee md:text-[2rem] text-xl font-black flex gap-12 md:py-2 italic">
                {Array(20).fill(0).map((_, i) => (
                    <span key={i} className="flex items-center gap-12 z-10">
                        Listen on Spotify <span className="md:text-4xl not-italic">&</span> Youtube <span className="text-4xl not-italic">♦</span>
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <main className={"h-screen w-full relative transition-colors duration-500 ease-in-out " + (bgStyle === "black" ? "text-white" : "text-black")} style={{ backgroundColor: bgStyle }}>
            <Navbar buttonState={sequence[buttonIndex]} onToggle={handleToggle} />

            {/* Layer 1: Behind Everything */}
            <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
                <Marquee />
            </div>

            {/* Layer 2: The Text */}
            <div className="flex flex-col pt-64 items-center h-full pointer-events-none">
                <div className="flex md:gap-8 gap-10 xl:text-[11rem] md:text-8xl text-4xl xl:leading-40 font-black tracking-tighter">
                    <h1 className="md:z-0">PRESIDENTE</h1>
                    <p className="md:z-0 z-20">BY</p>
                </div>
                <h2 className="xl:text-[11rem] md:text-8xl text-4xl xl:leading-40 font-black tracking-tighter md:z-20 z-20">PETRA <span className="z-20">STTO</span></h2>
                <MusicPlayer theme={bgStyle === "black" ? "dark" : "light"} />
            </div>

			{/* Layer 3: The Mask */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none mask-[linear-gradient(45deg,transparent_40%,black_40%,black_60%,transparent_60%)]">
                <Marquee />
            </div>

            <Footer />
        </main>
    );
}