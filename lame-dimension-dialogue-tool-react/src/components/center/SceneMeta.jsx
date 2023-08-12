import React, {useEffect, useState} from 'react';

const component = ({ sceneKey, onSceneKeyChange }) => {
    const [newSceneKey, setNewSceneKey] = useState(sceneKey);

    useEffect(() => {
        setNewSceneKey(sceneKey);
    }, [sceneKey]);

    console.log("SCENE: " + sceneKey);

    return (
        <div className="dialogue-meta">
            <input type="text" value={newSceneKey} onChange={({target: {value}}) => {setNewSceneKey(value)}} onBlur={() => {onSceneKeyChange(newSceneKey, sceneKey)}}/>
        </div>
    );
};

export default component;
