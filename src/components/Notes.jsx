import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { PenLine } from 'lucide-react';

const Notes = () => {
    const [note, setNote] = useLocalStorage('sora-notes', '');

    return (
        <div className="fixed bottom-8 right-8 w-80 flex flex-col items-end z-20 group">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-full shadow-2xl transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:!translate-y-0 hover:!opacity-100 peer-focus:translate-y-0 peer-focus:opacity-100">
                <div className="flex items-center gap-2 mb-2 text-white/80">
                    <PenLine size={16} />
                    <span className="text-sm font-medium">Quick Notes</span>
                </div>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Type something..."
                    className="w-full h-48 bg-transparent text-white/90 resize-none focus:outline-none text-sm leading-relaxed scrollbar-hide"
                />
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg cursor-pointer group-hover:opacity-0 transition-opacity duration-300 absolute bottom-0 right-0">
                <PenLine size={24} />
            </div>
        </div>
    );
};

export default Notes;
