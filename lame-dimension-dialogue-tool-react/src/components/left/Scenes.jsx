import React, { createRef, useEffect } from 'react';

const component = ({ scenes, selectedScene, onSelectScene, onCreateScene, onSceneRemove }) => {
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
                <table>
                    <tbody>
                        {Object.keys(scenes).map((name) => {
                            return (
                                <tr
                                    key={name}
                                    ref={sceneRefs[name]}
                                >
                                    <td onClick={() => {
                                        onSelectScene(name);
                                    }}
                                    className={`selectable ${
                                        selectedScene === name ? 'selected' : null
                                    }`}>{name}</td>
                                    <td className='delete-button' onClick={() => {
                                        onSceneRemove(name);
                                    }}>X</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={onCreateScene}>Add Scene</button>
            </div>
        </div>
    );
};

export default component;
