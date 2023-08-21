import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTrashCan, faPlus} from '@fortawesome/free-solid-svg-icons';

const Component = ({
    scene,
    language,
    defaultLanguage,
    index,
    editable,
    onDialogueIndexChange,
    onDialogueChange,
    onDialogueAdd,
    onDialogueRemove,
    onDialogueRearrange,
}) => {
    if (!scene) {
        return <></>;
    }

    const updateDialogueText = (index, language, value) => {
        let entry = { ...scene.dialogue[index] };
        entry.text[language] = value;
        onDialogueChange(index, entry);
    };

    const updateDialogue = (field, index, value) => {
        let entry = { ...scene.dialogue[index] };
        entry[field] = value;
        onDialogueChange(index, entry);
    };

    const swapDialogues = (index, otherIndex) => {
        let copy = [...scene.dialogue];
        let temp = { ...copy[index] };
        copy[index] = copy[otherIndex];
        copy[otherIndex] = temp;
        onDialogueRearrange(copy);
    };

    const dialogCount = scene.dialogue.length;

    return (
        <>
            <h2>Dialogue</h2>
            <div className="dialogue-text">
                <table className="dialogue-table">
                    <tbody>
                        {scene.dialogue.map((entry, dialogueIndex) => {
                            return (
                                <tr
                                    key={`dialogue${dialogueIndex}`}
                                    className={`${
                                        index === dialogueIndex
                                            ? 'selected'
                                            : null
                                    }`}
                                >
                                    <td>
                                        {dialogueIndex > 0 ? (
                                            <>
                                                <button
                                                    tabIndex={
                                                        dialogueIndex +
                                                        dialogCount
                                                    }
                                                    onClick={() => {
                                                        swapDialogues(
                                                            dialogueIndex,
                                                            dialogueIndex - 1
                                                        );
                                                    }}
                                                    disabled={!editable}
                                                >
                                                    <FontAwesomeIcon icon={faArrowUp} />
                                                </button>
                                                <br />
                                            </>
                                        ) : null}
                                        {dialogueIndex <
                                        scene.dialogue.length - 1 ? (
                                            <button
                                                tabIndex={
                                                    dialogueIndex +
                                                    1 +
                                                    dialogCount
                                                }
                                                onClick={() => {
                                                    swapDialogues(
                                                        dialogueIndex,
                                                        dialogueIndex + 1
                                                    );
                                                }}
                                                disabled={!editable}
                                            >
                                                <FontAwesomeIcon icon={faArrowDown} />
                                            </button>
                                        ) : null}
                                    </td>
                                    <td className="dialogue-text-col">
                                        <textarea
                                            tabIndex={
                                                dialogueIndex +
                                                1 +
                                                dialogCount * 2
                                            }
                                            className="editor-text"
                                            onFocus={() => {
                                                onDialogueIndexChange(
                                                    dialogueIndex
                                                );
                                            }}
                                            onChange={({
                                                target: { value },
                                            }) => {
                                                updateDialogueText(
                                                    dialogueIndex,
                                                    language,
                                                    value
                                                );
                                            }}
                                            value={entry.text[language]}
                                            disabled={!editable}
                                        ></textarea>
                                        <pre
                                            style={{
                                                textAlign: 'left',
                                                padding: '0px',
                                                margin: '0px',
                                                color: 'white',
                                            }}
                                        >
                                            <b>
                                                {defaultLanguage.toUpperCase()}
                                            </b>
                                            : {entry.text[defaultLanguage]}
                                        </pre>
                                    </td>
                                    <td>
                                        <textarea
                                            tabIndex={
                                                dialogueIndex +
                                                1 +
                                                dialogCount * 3
                                            }
                                            className="editor-choice"
                                            onFocus={() => {
                                                onDialogueIndexChange(
                                                    dialogueIndex
                                                );
                                            }}
                                            onChange={({
                                                target: { value },
                                            }) => {
                                                updateDialogue(
                                                    'choices',
                                                    dialogueIndex,
                                                    value.split('\n')
                                                );
                                            }}
                                            value={entry.choices?.join('\n')}
                                            disabled={!editable}
                                        ></textarea>
                                    </td>
                                    <td>
                                        <button
                                            tabIndex={
                                                dialogueIndex +
                                                1 +
                                                dialogCount * 4
                                            }
                                            onClick={() => {
                                                onDialogueAdd(dialogueIndex);
                                            }}
                                            disabled={!editable}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <button
                                            tabIndex={
                                                dialogueIndex +
                                                1 +
                                                dialogCount * 5
                                            }
                                            onClick={() => {
                                                onDialogueRemove(dialogueIndex);
                                            }}
                                            disabled={!editable}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Component;
