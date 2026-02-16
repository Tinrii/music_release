"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface MusicPlayerProps {
    theme?: 'light' | 'dark';
}

const MusicPlayer = ({ theme = 'dark' }: MusicPlayerProps) => {
    const isDark = theme === 'dark';
    const [isPlaying, setIsPlaying] = useState(false);
    // ... rest of states
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error("Playback failed. Ensure /music/song.mp3 exists.", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const dur = audioRef.current.duration;
            if (!isNaN(dur) && dur > 0) {
                setProgress((current / dur) * 100);
                setDuration(dur);
            }
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            const newTime = (value / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(value);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (val > 0) setIsMuted(false);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className={`flex items-center gap-6 p-4 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300 min-w-11/12 md:min-w-[440px] z-50 pointer-events-auto mt-12 ${
            isDark 
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                : 'bg-black/5 border-black/10 text-black hover:bg-black/10'
        }`}>
            {/* Album Art */}
            <div className={`relative group overflow-hidden rounded-xl h-16 w-16 shrink-0 shadow-lg border ${
                isDark ? 'border-white/5' : 'border-black/5'
            }`}>
                <Image 
                    src="/images/petric_favicon.jpg" 
                    alt="Album Art" 
                    className={`rounded-xl transition-transform duration-700 object-cover ${isPlaying ? 'scale-110 rotate-3' : 'scale-100'}`} 
                    fill
                />
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <button onClick={togglePlay} className={`text-xl cursor-pointer transform transition-transform active:scale-90 ${
                        isDark ? 'text-white' : 'text-white' // Icon remains white for contrast on art overlay
                    }`}>
                        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                </div>
            </div>

            {/* Info & Controls */}
            <div className='flex-1 flex flex-col gap-3'>
                <div className='flex justify-between items-start'>
                    <div className='overflow-hidden'>
                        <h3 className='font-black leading-none uppercase tracking-widest text-sm truncate'>Presidente</h3>
                        <p className={`text-[10px] font-bold tracking-widest mt-1 uppercase ${
                            isDark ? 'text-white/50' : 'text-black/50'
                        }`}>Petra Stto</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button onClick={togglePlay} className={`transition-colors cursor-pointer text-base w-5 active:scale-90 transform ${
                            isDark ? 'hover:text-[#01ff92]' : 'hover:text-[#01ff92]'
                        }`}>
                            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                        </button>
                        <div className='flex items-center gap-1.5 group relative'>
                            <button onClick={toggleMute} className='transition-colors cursor-pointer w-4 text-xs active:scale-90 transform'>
                                <i className={`fa-solid ${isMuted || volume === 0 ? 'fa-volume-mute' : 'fa-volume-low'}`}></i>
                            </button>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.01" 
                                value={isMuted ? 0 : volume} 
                                onChange={handleVolumeChange}
                                className={`w-12 md:w-16 h-1 rounded-full appearance-none cursor-pointer transition-all ${
                                    isDark 
                                        ? 'bg-white/10 accent-white hover:accent-[#01ff92]' 
                                        : 'bg-black/10 accent-black hover:accent-[#01ff92]'
                                }`}
                                style={{ background: `linear-gradient(to right, ${isDark ? 'white' : 'black'} ${volume * 100}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} ${volume * 100}%)` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className='flex flex-col gap-1.5'>
                    <div className='relative w-full h-1 group'>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={progress} 
                            onChange={handleProgressChange}
                            className={`absolute inset-0 w-full h-1 rounded-full appearance-none cursor-pointer z-10 accent-transparent group-hover:accent-[#01ff92] ${
                                isDark ? 'bg-white/10' : 'bg-black/10'
                            }`}
                        />
                        <div 
                            className='absolute inset-0 h-1 bg-[#01ff92] rounded-full transition-all duration-100'
                            style={{ width: `${progress}%` }}
                        />
                        <div className={`absolute inset-0 w-full h-1 rounded-full ${
                            isDark ? 'bg-white/5' : 'bg-black/5'
                        }`} />
                    </div>
                    <div className={`flex justify-between text-[9px] font-mono tracking-tighter uppercase font-bold ${
                        isDark ? 'text-white/40' : 'text-black/40'
                    }`}>
                        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <audio 
                ref={audioRef}
                src="/music/song.mp3"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
};

export default MusicPlayer;

