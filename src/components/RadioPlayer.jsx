import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

const RadioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [metadata, setMetadata] = useState({
        title: 'Radio Player',
        artist: 'Loading...',
        cover: ''
    });
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch('https://scraper2.onlineradiobox.com/id.prambors');
                const data = await response.json();

                let title = data.title;
                let artist = '';
                let cover = data.iImg || '';

                if (data.iName) {
                    title = data.iName;
                    artist = data.iArtist || '';
                }

                setMetadata({ title, artist, cover });
            } catch (error) {
                console.error('Error fetching radio metadata:', error);
            }
        };

        fetchMetadata();
        const interval = setInterval(fetchMetadata, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Playback failed:", error);
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) setIsMuted(false);
    };

    return (
        <div className="fixed bottom-8 left-8 z-20 flex items-center gap-3 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-fade-in transition-all duration-500 ease-in-out group max-w-[200px] hover:max-w-[500px] overflow-hidden">
            <audio
                ref={audioRef}
                src="https://s2.cloudmu.id/listen/prambors/stream"
                onError={(e) => console.error("Audio error:", e.nativeEvent)}
                crossOrigin="anonymous"
            />

            {/* Visualizer - Only visible when playing AND hovered */}
            <div className={`flex items-end gap-[2px] h-8 transition-all duration-500 ease-in-out overflow-hidden ${isPlaying ? 'w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:mr-3' : 'w-0 opacity-0'}`}>
                {[0.8, 1.2, 0.9, 1.1].map((duration, i) => (
                    <div
                        key={i}
                        className="w-1 bg-white/80 rounded-full animate-music-bar"
                        style={{
                            animationDuration: `${duration}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative shrink-0">
                {metadata.cover ? (
                    <img
                        src={metadata.cover}
                        alt="Album Art"
                        className={`w-12 h-12 rounded-lg object-cover shadow-md ${isPlaying ? 'animate-spin-slow' : ''}`}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                        <Radio size={24} className="text-white/70" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 overflow-hidden">
                <div className="w-full overflow-hidden relative flex mask-linear-fade">
                    <div className={`flex gap-4 whitespace-nowrap ${isPlaying ? 'animate-marquee group-hover:animate-none' : ''}`}>
                        <h3 className="text-sm font-semibold text-white">{metadata.title}</h3>
                        <h3 className="text-sm font-semibold text-white">{metadata.title}</h3>
                        <h3 className="text-sm font-semibold text-white">{metadata.title}</h3>
                        <h3 className="text-sm font-semibold text-white">{metadata.title}</h3>
                    </div>
                </div>
                <p className="text-xs text-white/60 truncate">{metadata.artist || 'Prambors'}</p>
            </div>

            {/* Controls - Hidden by default, show on hover */}
            <div className="flex items-center gap-3 w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex-shrink-0"
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <div className="flex items-center gap-2 group/vol">
                    <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                        {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default RadioPlayer;
