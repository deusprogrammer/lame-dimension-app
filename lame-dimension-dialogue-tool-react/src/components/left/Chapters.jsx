import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashCan,
    faPenToSquare,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { getDiff } from '../../util/util';

const component = ({
    chapters,
    selectedChapter,
    editable,
    diff,
    path,
    onChapterSelect,
    onChapterRemove,
    onChapterCreate,
    onChapterNameChange,
}) => {
    const [editing, setEditing] = useState();
    const [editValue, setEditValue] = useState('');
    const selectedHook = useRef(null);
    if (!chapters) {
        return <div className="chapters"></div>;
    }

    useEffect(() => {
        if (selectedHook.current) {
            selectedHook.current.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedChapter]);

    const editChapterName = (chapterName) => {
        setEditing(chapterName);
        setEditValue(chapterName);
    };

    const updateChapterName = (oldChapterName, newChapterName) => {
        setEditing(null);
        setEditValue(null);
        onChapterNameChange(oldChapterName, newChapterName);
    };

    return (
        <div className="chapters">
            <h2>Chapters</h2>
            <div className="scrolling">
                <table>
                    <tbody>
                        {Object.keys(chapters).map((chapterName) => (
                            <tr
                                key={chapterName}
                                className={getDiff(`${path}.${chapterName}`, diff) ? 'changed' : null}
                                ref={
                                    chapterName === selectedChapter
                                        ? selectedHook
                                        : null
                                }
                            >
                                <td
                                    className={`selectable ${
                                        selectedChapter === chapterName
                                            ? 'selected'
                                            : null
                                    }`}
                                    onClick={() => {
                                        if (editing) {
                                            return;
                                        }

                                        onChapterSelect(chapterName);
                                    }}
                                >
                                    {editing === chapterName ? (
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
                                        chapterName
                                    )}
                                </td>
                                {editable ? (
                                    <>
                                        {editing === chapterName ? (
                                            <td
                                                className="check-button"
                                                onClick={() => {
                                                    updateChapterName(
                                                        chapterName,
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
                                                    editChapterName(
                                                        chapterName
                                                    );
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

                                                onChapterRemove(chapterName);
                                            }}
                                            style={{
                                                opacity: editing ? 0.1 : 1.0,
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
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={onChapterCreate} disabled={!editable}>
                    Add Chapter
                </button>
            </div>
        </div>
    );
};

export default component;
