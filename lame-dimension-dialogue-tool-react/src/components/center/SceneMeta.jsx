import React from 'react';

const component = ({ sceneKey }) => {
    if (!sceneKey) {
        return <></>;
    }

    return (
        <div className="dialogue-meta">
            <input type="text" value={sceneKey} />
        </div>
    );
};

export default component;
