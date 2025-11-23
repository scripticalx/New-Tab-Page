import React from 'react';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import Bookmarks from './components/Bookmarks';
import Notes from './components/Notes';
import Settings from './components/Settings';
import RadioPlayer from './components/RadioPlayer';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [lang, setLang] = useLocalStorage('sora-lang', 'en');
  const [bg, setBg] = useLocalStorage('sora-bg', {
    type: 'image',
    value: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F31.media.tumblr.com%2F841a18b0d90b858e130e5cef7f47e500%2Ftumblr_mosatwioPI1rw1exqo1_500.gif&f=1&nofb=1&ipt=bd70c8c5b8a71bbb4849b2948f2b8228dcd1972d7292b01c6c50c703228aa5e1',
    blur: 4,
    brightness: 44
  });

  const [showSeconds, setShowSeconds] = useLocalStorage('sora-show-seconds', false);
  const [searchEngine, setSearchEngine] = useLocalStorage('sora-search-engine', 'google');

  const getBackgroundStyle = () => {
    if (bg.type === 'color') {
      return { backgroundColor: bg.value };
    } else if (bg.type === 'image') {
      return {
        backgroundImage: `url(${bg.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return {};
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Video Background Layer */}
      {bg.type === 'video' && (
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={bg.value}
        />
      )}

      {/* Overlay for brightness and blur */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${bg.brightness / 100})`,
          backdropFilter: `blur(${bg.blur}px)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <Clock lang={lang} showSeconds={showSeconds} />
        <SearchBar searchEngine={searchEngine} />
        <Bookmarks />
      </div>

      <RadioPlayer />
      <Notes />
      <Settings
        lang={lang}
        setLang={setLang}
        bg={bg}
        setBg={setBg}
        showSeconds={showSeconds}
        setShowSeconds={setShowSeconds}
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
      />
    </div>
  );
}

export default App;
