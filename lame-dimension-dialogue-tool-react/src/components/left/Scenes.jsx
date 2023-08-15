import React, { createRef, useEffect } from 'react';

const component = ({ scenes, selectedScene, onSelectScene, onCreateScene }) => {
    if (!scenes) {
        return (
            <div className="scenes">
                <h2>Scenes</h2>
                <div className="scrolling"></div>
            </div>
        );
    }

    let sceneRefs = [];
    Object.keys(scenes).forEach((scene) => {
        sceneRefs[scene] = createRef();
    });

    useEffect(() => {
        sceneRefs[selectedScene]?.current?.scrollIntoView();
    }, [selectedScene]);

    return (
        <div className="scenes">
            <h2>Scenes</h2>
            <div className="scrolling">
                {Object.keys(scenes).map((name) => {
                    return (
                        <div
                            key={name}
                            ref={sceneRefs[name]}
                            onClick={() => {
                                onSelectScene(name);
                            }}
                            className={`selectable ${
                                selectedScene === name ? 'selected' : null
                            }`}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>
            <div>
                <button onClick={onCreateScene}>Add Scene</button>
            </div>
        </div>
    );
};

export default component;
