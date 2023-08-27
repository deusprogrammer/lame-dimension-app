import React, { useCallback } from 'react';

import { Stage, Container, Text, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';

let styleMap = {
    en: {
        speaker: {
            align: 'left',
            fontSize: '16pt',
            fontFamily: 'gameFont',
            fontWeight: 'bolder',
            fill: '#F1AA1C',
        },
        text: {
            align: 'left',
            fontSize: '15pt',
            fontFamily: 'gameFont',
            fill: '#C6C7C6',
        },
    },
    es: {
        speaker: {
            align: 'left',
            fontSize: '16pt',
            fontFamily: 'gameFont',
            fontWeight: 'bolder',
            fill: '#F1AA1C',
        },
        text: {
            align: 'left',
            fontSize: '15pt',
            fontFamily: 'gameFont',
            fill: '#C6C7C6',
        },
    },
    jp: {
        speaker: {
            align: 'left',
            fontSize: '16pt',
            fontFamily: 'gameFont',
            fontWeight: 'bolder',
            fill: '#F1AA1C',
        },
        text: {
            align: 'left',
            fontSize: '13pt',
            fontFamily: 'gameFont',
            fill: '#C6C7C6',
        },
    },
    fr: {
        speaker: {
            align: 'left',
            fontSize: '16pt',
            fontFamily: 'gameFont',
            fontWeight: 'bolder',
            fill: '#F1AA1C',
        },
        text: {
            align: 'left',
            fontSize: '15pt',
            fontFamily: 'gameFont',
            fill: '#C6C7C6',
        },
    },
    br: {
        speaker: {
            align: 'left',
            fontSize: '16pt',
            fontFamily: 'gameFont',
            fontWeight: 'bolder',
            fill: '#F1AA1C',
        },
        text: {
            align: 'left',
            fontSize: '15pt',
            fontFamily: 'gameFont',
            fill: '#C6C7C6',
        },
    },
    ch: {
        speaker: {
            align: 'left',
            fontSize: '16pt',
            fontFamily: 'gameFont',
            fontWeight: 'bolder',
            fill: '#F1AA1C',
        },
        text: {
            align: 'left',
            fontSize: '15pt',
            fontFamily: 'gameFont',
            fill: '#C6C7C6',
        },
    },
};

const Component = ({ scene, language, index, characters }) => {
    const draw = useCallback((g) => {
        g.clear();
        g.beginFill(0x0c0d0d);
        g.drawRect(0, 0, 640, 70);
        g.endFill();
    }, []);

    if (!scene) {
        return <></>;
    }

    let { active, text } = scene.dialogue[index];

    let speakerStyle = new PIXI.TextStyle(styleMap[language].speaker);
    let textStyle = new PIXI.TextStyle(styleMap[language].text);

    let speaker =
        scene.dialogue[index].positions[active]?.override ||
        characters[scene.dialogue[index].positions[active]?.name]?.name ||
        'none';

    return (
        <div>
            <Stage width={640} height={70}>
                <Container x={0} y={0} width={640} height={70}>
                    <Graphics x={0} y={0} width={640} height={70} draw={draw} />
                    <Text
                        style={speakerStyle}
                        x={11}
                        y={7}
                        text={speaker}
                        anchor={{ x: 0, y: 0 }}
                    />
                    <Text
                        style={textStyle}
                        x={11}
                        y={29}
                        text={text[language]}
                        anchor={{ x: 0, y: 0 }}
                    />
                </Container>
            </Stage>
            <br />
            {/* <img style={{width: "640px"}} src={`${process.env.PUBLIC_URL}/example.png`} /> */}
        </div>
    );
};

export default Component;
