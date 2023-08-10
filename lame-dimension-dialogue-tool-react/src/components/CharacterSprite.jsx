import Animation from './Animation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const positionAdjustments = {
    left: {
        x: 0,
        y: 0,
        from: 'left',
    },
    leftfront: {
        x: 20,
        y: 0,
        from: 'left',
    },
    rightfront: {
        x: 20,
        y: 0,
        from: 'right',
    },
    right: {
        x: 0,
        y: 0,
        from: 'right',
    },
};

const Component = ({ position, dialogue, active }) => {
    const [fileList, setFileList] = useState([]);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const loadTextures = async (character, emote) => {
        let directory = `${process.env.PUBLIC_URL}/sprites/${emote}/spr_${character}${emote}`;
        let spriteFile = `${directory}/spr_${character}${emote}.yy`;

        console.log('SPRITE FILE: ' + spriteFile);

        try {
            let response = await axios.get(spriteFile, {
                headers: {
                    Accept: 'application/json',
                },
            });

            let height = response.data.height;
            let width = response.data.width;
            let files = response.data.frames.map(
                ({ name }) => `${directory}/${name}.png`
            );
            setHeight(height);
            setWidth(width);

            console.log('SET FILES: ' + files.length);

            setFileList(files);
        } catch (e) {
            console.error(e);
            setFileList([`${process.env.PUBLIC_URL}/seele.jpeg`]);
            setWidth(516 / 4);
            setHeight(1162 / 4);
        }
    };

    useEffect(() => {
        if (position && dialogue) {
            if (!dialogue.positions[position]) {
                return;
            }

            let character = dialogue.positions[position].name;
            let emote = dialogue.positions[position].emote;
            loadTextures(character, emote);
        }
        setIsSpeaking(active === position);
    }, [position, dialogue, active]);

    let x = 0;
    let y = 360 - 70 - (height || 0);
    let flip = false;

    let adjustments = positionAdjustments[position];
    if (adjustments.from === 'right') {
        x = 640 - width - adjustments.x;
        flip = true;
    } else if (adjustments.from === 'left') {
        x = adjustments.x;
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width,
                height,
            }}
        >
            <Animation
                flip={flip}
                isPlaying={isSpeaking}
                speed={100}
                label={position}
                images={fileList}
                width={width}
                height={height}
            />
        </div>
    );
};

export default Component;
