import React, { useState } from 'react';
import { Settings as SettingsIcon, X, Download, Upload } from 'lucide-react';

const Settings = ({ lang, setLang, bg, setBg, showSeconds, setShowSeconds, searchEngine, setSearchEngine }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general'); // general, background, data

    const handleExport = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('sora-')) {
                data[key] = JSON.parse(localStorage.getItem(key));
            }
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sora-settings-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                Object.keys(data).forEach(key => {
                    if (key.startsWith('sora-')) {
                        localStorage.setItem(key, JSON.stringify(data[key]));
                    }
                });
                window.location.reload();
            } catch (error) {
                console.error('Error importing settings:', error);
                alert('Failed to import settings. Invalid JSON file.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 left-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
            >
                <SettingsIcon size={24} />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h2 className="text-lg font-semibold text-white">Settings</h2>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex h-96">
                            {/* Sidebar */}
                            <div className="w-1/3 border-r border-white/10 bg-white/5">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    General
                                </button>
                                <button
                                    onClick={() => setActiveTab('background')}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'background' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    Background
                                </button>
                                <button
                                    onClick={() => setActiveTab('data')}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'data' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    Data
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                {activeTab === 'general' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Language</label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setLang('en')}
                                                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${lang === 'en' ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'
                                                        }`}
                                                >
                                                    English
                                                </button>
                                                <button
                                                    onClick={() => setLang('id')}
                                                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${lang === 'id' ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'
                                                        }`}
                                                >
                                                    Indonesia
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="flex items-center justify-between cursor-pointer group">
                                                <span className="text-xs font-medium text-white/60 uppercase tracking-wider group-hover:text-white/90 transition-colors">Show Seconds</span>
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={showSeconds}
                                                        onChange={(e) => setShowSeconds(e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
                                                </div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Search Engine</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    { id: 'google', name: 'Google', domain: 'google.com' },
                                                    { id: 'duckduckgo', name: 'DuckDuckGo', domain: 'duckduckgo.com' },
                                                    { id: 'bing', name: 'Bing', domain: 'bing.com' },
                                                    { id: 'yandex', name: 'Yandex', domain: 'yandex.com' }
                                                ].map((engine) => (
                                                    <button
                                                        key={engine.id}
                                                        onClick={() => setSearchEngine(engine.id)}
                                                        className={`flex items-center justify-center gap-2 py-2 rounded-lg border text-xs font-medium transition-all ${searchEngine === engine.id ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'
                                                            }`}
                                                    >
                                                        <img
                                                            src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${engine.domain}&size=32`}
                                                            alt={engine.name}
                                                            className="w-4 h-4 rounded-full"
                                                        />
                                                        {engine.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'background' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Type</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['color', 'image', 'video'].map((t) => (
                                                    <button
                                                        key={t}
                                                        onClick={() => setBg({ ...bg, type: t })}
                                                        className={`py-2 rounded-lg border text-xs font-medium capitalize transition-all ${bg.type === t ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'
                                                            }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                                                {bg.type === 'color' ? 'Hex Color' : 'URL'}
                                            </label>
                                            <input
                                                type="text"
                                                value={bg.value}
                                                onChange={(e) => setBg({ ...bg, value: e.target.value })}
                                                placeholder={bg.type === 'color' ? '#000000' : 'https://...'}
                                                className="w-full px-3 py-2 bg-black/20 rounded-lg border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
                                            />
                                            {bg.type === 'color' && (
                                                <input
                                                    type="color"
                                                    value={bg.value}
                                                    onChange={(e) => setBg({ ...bg, value: e.target.value })}
                                                    className="w-full h-8 mt-2 cursor-pointer"
                                                />
                                            )}
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-white/10">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Blur</label>
                                                    <span className="text-xs text-white/60">{bg.blur || 0}px</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="20"
                                                    value={bg.blur || 0}
                                                    onChange={(e) => setBg({ ...bg, blur: parseInt(e.target.value) })}
                                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                                />
                                            </div>

                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Darken</label>
                                                    <span className="text-xs text-white/60">{bg.brightness || 0}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="90"
                                                    value={bg.brightness || 0}
                                                    onChange={(e) => setBg({ ...bg, brightness: parseInt(e.target.value) })}
                                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'data' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Export Settings</label>
                                            <p className="text-xs text-white/50 mb-3">Download a backup of your settings, bookmarks, and notes.</p>
                                            <button
                                                onClick={handleExport}
                                                className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
                                            >
                                                <Download size={16} />
                                                Export to JSON
                                            </button>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <label className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">Import Settings</label>
                                            <p className="text-xs text-white/50 mb-3">Restore your settings from a backup file. This will refresh the page.</p>
                                            <label className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 cursor-pointer">
                                                <Upload size={16} />
                                                Import from JSON
                                                <input
                                                    type="file"
                                                    accept=".json"
                                                    onChange={handleImport}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
