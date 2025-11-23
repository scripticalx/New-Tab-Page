import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Clock = ({ lang = 'en', showSeconds = false }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: showSeconds ? '2-digit' : undefined,
            hour12: lang !== 'id',
        };

        return date.toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', options);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-col items-center justify-center text-white drop-shadow-md select-none">
            <h1 className={`font-bold tracking-tight animate-fade-in ${showSeconds ? 'text-6xl' : 'text-8xl'}`}>
                {formatTime(time)}
            </h1>
            <p className="text-2xl mt-2 font-light opacity-90 animate-slide-up">
                {formatDate(time)}
            </p>
        </div>
    );
};

Clock.propTypes = {
    lang: PropTypes.oneOf(['en', 'id']),
    showSeconds: PropTypes.bool,
};

export default Clock;
