import React from 'react';

const component = ({ scenes, selectedScene, onSelectScene, onCreateScene }) => {
    if (!scenes) {
        return <div className="dialogues"></div>;
    }

    return (
        <div className="dialogues">
            <h2>Scenes</h2>
            <div className="scrolling">
                {Object.keys(scenes).map((name) => {
                    return (
                        <div
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
