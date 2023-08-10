import React from 'react';

import characters from '../../data/characters';

const component = ({ side, scene, index, onPositionChange }) => {
    if (!scene) {
        return <div className="characters"></div>;
    }

    let { positions, active } = scene.dialogue[index];

    const updatePositionName = (position, characterKey) => {
        let dialogueCopy = { ...scene.dialogue[index] };
        let copy = { ...dialogueCopy.positions };
        copy[position].name = characterKey;
        copy[position].emote = 'neutral';
        dialogueCopy.positions = copy;
        onPositionChange(index, dialogueCopy);
    };

    const updatePositionEmote = (position, emote) => {
        let dialogueCopy = { ...scene.dialogue[index] };
        let copy = { ...dialogueCopy.positions };
        copy[position].emote = emote;
        dialogueCopy.positions = copy;
        onPositionChange(index, dialogueCopy);
    };

    const updatePositionOverride = (position, override) => {
        let dialogueCopy = { ...scene.dialogue[index] };
        let copy = { ...dialogueCopy.positions };
        copy[position].override = override;
        dialogueCopy.positions = copy;
        onPositionChange(index, dialogueCopy);
    };

    const updateActivePosition = (position) => {
        let dialogueCopy = { ...scene.dialogue[index] };
        dialogueCopy.active = position;
        onPositionChange(index, dialogueCopy);
    };

    return (
        <div>
            <div className="characters">
                {['left', 'leftfront', 'right', 'rightfront']
                    .filter((position) => position.toLowerCase().includes(side))
                    .map((position) => {
                        return (
                            <div>
                                <div>{position.toUpperCase()}</div>
                                <div>
                                    <select
                                        onChange={({ target: { value } }) =>
                                            updatePositionName(position, value)
                                        }
                                        value={
                                            positions[position]?.name || 'none'
                                        }
                                    >
                                        <option value="none">none</option>
                                        {Object.keys(characters).map((key) => {
                                            return (
                                                <option value={key}>
                                                    {characters[key].name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>Override</div>
                                <div>
                                    <input
                                        type="text"
                                        onChange={({ target: { value } }) => {
                                            updatePositionOverride(
                                                position,
                                                value
                                            );
                                        }}
                                        value={
                                            positions[position]?.override ||
                                            'none'
                                        }
                                    />
                                </div>
                                <div>Emote</div>
                                <div>
                                    <select
                                        onChange={({ target: { value } }) => {
                                            updatePositionEmote(
                                                position,
                                                value
                                            );
                                        }}
                                        value={positions[position]?.emote}
                                    >
                                        {characters[
                                            positions[position]?.name
                                        ]?.emotes.map((emote) => {
                                            return (
                                                <option value={emote}>
                                                    {emote}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={active === position}
                                        onChange={({ target: { checked } }) => {
                                            if (
                                                checked &&
                                                positions[position]?.name
                                            )
                                                updateActivePosition(position);
                                        }}
                                        disabled={!positions[position]?.name}
                                    />
                                    Speaking
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default component;
