import React from 'react';

function HeroSection() {
    return (
        <div className="relative w-full h-[537px] overflow-hidden">
            <video
                className="w-full h-full object-cover"
                src="https://dms.licdn.com/playlist/vid/v2/C4E05AQF1kiprUvtWaw/mp4-640p-30fp-crf28/mp4-640p-30fp-crf28/0/1674931377535?e=2147483647&v=beta&t=HPLezf8lPIuCQ_hEHt5YGyLlQLE_tdavFyMr0atftQE"
                autoPlay
                loop
                muted
                playsInline
            />
        </div>
    );
}

export default HeroSection;
