import React, { useCallback } from 'react';

import { Stage, Container, Text, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';

import characters from '../../data/characters';

const Component = ({ scene, language, index }) => {
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

    let speakerStyle = new PIXI.TextStyle({
        align: 'left',
        fontSize: '15pt',
        fontWeight: 'bolder',
        fill: '#F1AA1C',
    });

    let textStyle = new PIXI.TextStyle({
        align: 'left',
        fontSize: '14pt',
        fontWeight: 'lighter',
        fill: '#FFFFFF',
        letterSpacing: 2,
    });

    let speaker =
        scene.dialogue[index].positions[active]?.override ||
        characters[scene.dialogue[index].positions[active]?.name]?.name ||
        'none';

    return (
        <div>
            <Stage
                width={640}
                height={70}
                options={{ backgroundColor: 'teal' }}
            >
                <Container x={0} y={0} width={640} height={70}>
                    <Graphics x={0} y={0} width={640} height={70} draw={draw} />
                    <Text
                        style={speakerStyle}
                        x={10}
                        y={5}
                        text={speaker}
                        anchor={{ x: 0, y: 0 }}
                    />
                    <Text
                        style={textStyle}
                        x={10}
                        y={25}
                        text={text[language]}
                        anchor={{ x: 0, y: 0 }}
                    />
                </Container>
            </Stage>
            <br />
        </div>
    );
};

export default Component;
