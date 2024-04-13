import React, { useState, useEffect } from 'react';
import "./Round.css";
import { VolumeIcon, PlayIcon, PauseIcon, HeartIcon } from './Icons';

export function Random() {
    const [cards, setCards] = useState([]);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // New state for play/pause

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                audio.src = "";
                audio.load();
            }
        };
    }, []);

    const fetchRandomAyah = async () => {
        const id = Math.floor(Math.random() * 6236) + 1;
        const response = await fetch(`https://api.alquran.cloud/v1/ayah/${id}/ar.alafasy`);
        const data = await response.json();
        setCards([data.data]);
        setAudio(new Audio(data.data.audio));
    };

    const playAudio = () => {
        if (audio) {
            audio.play();
            setIsPlaying(true);
        }
    };

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };

    const toggleHeartColor = () => {
        const heart = document.querySelector(".heart");
        if (heart) {
            heart.style.color = "#00a87ead";
        }
    };

    const getRandom = () => {
        if (audio && !audio.paused) {
            playAudio();
        } else {
            pauseAudio();
            fetchRandomAyah();
        }
    };

    return (
        <div className="container">
            {cards.map((value, index) => (
                <div key={index} className="card">
                    <div className="title">
                        <p className="titlep">قرآن كريم</p>
                    </div>
                    <div className="top">
                        <div className="pfp">
                            <div className="playing">
                                <div className="greenline line-1"></div>
                                <div className="greenline line-2"></div>
                                <div className="greenline line-3"></div>
                                <div className="greenline line-4"></div>
                                <div className="greenline line-5"></div>
                            </div>
                        </div>
                        <div className="texts">
                            <p className="title-1">{value.surah.name}</p>
                            <p className="title-2">ايه رقم <span className="title-span">{value.surah.numberOfAyahs}</span></p>
                        </div>
                    </div>
                    <div className="text">
                        <p>{value.text}</p>
                    </div>
                    <div className="controls">
                        <VolumeIcon onClick={playAudio} />
                        <div className="volume">
                            <div className="slider">
                                <div className="green"></div>
                            </div>
                            <div className="circle"></div>
                        </div>
                        {isPlaying ? (
                            <PauseIcon onClick={togglePlayPause} />
                        ) : (
                            <PlayIcon onClick={togglePlayPause} />
                        )}
                        <div className="air"></div>
                        <HeartIcon onClick={toggleHeartColor} />
                    </div>
                </div>
            ))}
            <button className="button" onClick={getRandom}>اضهار ايه عشويه</button>
        </div>
    );
}

export default Random;
