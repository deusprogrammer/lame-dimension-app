import React, { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashCan,
    faPenToSquare,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { getDiff } from '../../util/util';

const component = ({
    path,
    scenes,
    editable,
    diff,
    selectedScene,
    onSelectScene,
    onCreateScene,
    onSceneRemove,
    onSceneKeyChange,
}) => {
    const [editing, setEditing] = useState();
    const [editValue, setEditValue] = useState();
    const selectedHook = useRef(null);

    useEffect(() => {
        if (selectedHook.current) {
            selectedHook.current.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedScene]);

    const editSceneName = (sceneName) => {
        setEditing(sceneName);
        setEditValue(sceneName);
    };

    const updateSceneName = (oldSceneName, newSceneName) => {
        setEditing(null);
        setEditValue(null);
        onSceneKeyChange(oldSceneName, newSceneName);
    };

    if (!scenes) {
        return (
            <div className="scenes">
                <h2>Scenes</h2>
                <div className="scrolling"></div>
            </div>
        );
    }

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
                                    ref={
                                        name === selectedScene
                                            ? selectedHook
                                            : null
                                    }
                                    className={getDiff(`${path}.${name}`, diff) ? 'changed' : null}
                                >
                                    <td
                                        className={`selectable ${
                                            selectedScene === name
                                                ? 'selected'
                                                : null
                                        }`}
                                        onClick={() => {
                                            if (editing) {
                                                return;
                                            }

                                            onSelectScene(name);
                                        }}
                                    >
                                        {editing === name ? (
                                            <input
                                                type="text"
                                                onChange={({
                                                    target: { value },
                                                }) => {
                                                    setEditValue(value);
                                                }}
                                                value={editValue}
                                            />
                                        ) : (
                                            name
                                        )}
                                    </td>
                                    {editable ? (
                                        <>
                                            {editing === name ? (
                                                <td
                                                    className="check-button"
                                                    onClick={() => {
                                                        updateSceneName(
                                                            name,
                                                            editValue
                                                        );
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </td>
                                            ) : (
                                                <td
                                                    className="edit-button"
                                                    onClick={() => {
                                                        if (editing) {
                                                            return;
                                                        }
                                                        editSceneName(name);
                                                    }}
                                                    style={{
                                                        opacity: editing
                                                            ? 0.1
                                                            : 1.0,
                                                        cursor: editing
                                                            ? 'not-allowed'
                                                            : 'pointer',
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                    />
                                                </td>
                                            )}
                                            <td
                                                className="delete-button"
                                                onClick={() => {
                                                    if (editing) {
                                                        return;
                                                    }
                                                    onSceneRemove(name);
                                                }}
                                                style={{
                                                    opacity: editing
                                                        ? 0.1
                                                        : 1.0,
                                                    cursor: editing
                                                        ? 'not-allowed'
                                                        : 'pointer',
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                />
                                            </td>
                                        </>
                                    ) : null}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={onCreateScene} disabled={!editable}>
                    Add Scene
                </button>
            </div>
        </div>
    );
};

export default component;
