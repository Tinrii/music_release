"use client";
import Image from 'next/image'

interface NavbarProps {
    buttonState: {
        type: string;
        value: string;
        text: string;
    };
    onToggle: () => void;
}

const Navbar = ({ buttonState, onToggle }: NavbarProps) => {
    return (
        <nav className='flex justify-between items-center h-16 absolute top-0 left-0 right-0 px-10 z-90 bg-transparent'>
            <ul className={'flex justify-center items-center h-full md:gap-10 gap-4 text-' + buttonState.text }>
                <li><a href="https://www.instagram.com/petra.stto/" className='hover:text-red-400 transition-colors duration-300'>Instagram <i className="fa-regular fa-arrow-up-right"></i></a></li>
                <li><a href="https://www.tiktok.com/@petra.stto" className='hover:text-red-400 transition-colors duration-300'>TikTok <i className="fa-regular fa-arrow-up-right"></i></a></li>
            </ul>
            <div className="logo absolute left-1/2 -translate-x-1/2">
                <Image src="/images/petric_favicon.jpg" alt="Petric logo" className='rounded-xl' width={50} height={50} />
            </div>
            <button className='cursor-pointer text-2xl' onClick={onToggle}>
                <i className={`fa-solid fa-circle`} style={{ color: buttonState.value.startsWith('[') ? buttonState.value.slice(1, -1) : buttonState.value }}></i>
            </button>
        </nav>
    )
}

export default Navbar

