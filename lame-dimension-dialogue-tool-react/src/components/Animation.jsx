import React, { useEffect, useState } from 'react';

const intervals = {};

const Animation = ({
    label,
    speed,
    images,
    width,
    height,
    isPlaying,
    flip,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (intervals[label]) {
            clearInterval(intervals[label]);
        }

        console.log(`${label}: ${JSON.stringify(images, null, 5)}`);

        setCurrentIndex(0);
        intervals[label] = setInterval(() => {
            setCurrentIndex((oldIndex) => {
                return (oldIndex + 1) % (images.length - 1);
            });
        }, speed);

        return () => {
            clearInterval(intervals[label]);
        };
    }, [images]);

    if (!images || images.length === 0) {
        return <></>;
    }

    if (Number.isNaN(currentIndex)) {
        return (
            <img
                alt="seele"
                style={{ transform: `scaleX(${flip ? -1 : 1})` }}
                src={`${process.env.REACT_APP_API_DOMAIN}/assets/seele.jpeg`}
                width={516 / 4}
                height={1162 / 4}
            />
        );
    }

    if (!isPlaying) {
        return (
            <img
                alt="animation frame"
                style={{ transform: `scaleX(${flip ? -1 : 1})` }}
                src={`${images[0]}`}
                width={width}
                height={height}
            />
        );
    }

    return (
        <img
            alt="animation frame"
            style={{ transform: `scaleX(${flip ? -1 : 1})` }}
            src={`${images[currentIndex]}`}
            width={width}
            height={height}
        />
    );
};

export default Animation;
