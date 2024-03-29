import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import Chapters from '../components/left/Chapters';
import Languages from '../components/left/Languages';
import Scenes from '../components/left/Scenes';

import CharacterSprites from '../components/center/CharacterSprites';
import TextBox from '../components/center/TextBox';
import Characters from '../components/center/Characters';
import DialogueEditor from '../components/center/DialogueEditor';

import Option from '../components/center/Options';
import userAtom from '../atoms/User.atom';

import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import update from 'immutability-helper';

import deepDiff from 'deep-diff-pizza';
import { mergePulled } from '../util/util';
import characters from '../data/characters';

let dialogCounter = 0;
let interval;

function App() {
    const [language, setLanguage] = useState('en');
    const [defaultLanguage, setDefaultLanguage] = useState('en');

    const [script, setScript] = useState({});
    const [rootScript, setRootScript] = useState({});

    const [diff, setDiff] = useState([]);

    const [chapters, setChapters] = useState({});
    const [chapter, setChapter] = useState('');

    const [scene, setScene] = useState(null);
    const [sceneCache, setSceneCache] = useState(null);

    const [dialogueIndex, setDialogueIndex] = useState(0);

    const [editable, setEditable] = useState(false);

    const [user] = useAtom(userAtom);

    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const jwtToken = localStorage.getItem('jwtToken');
    const as = searchParams.get('as');

    useEffect(() => {
        loadScript();

        setEditable(
            user.roles.includes('EDITOR') && (!as || as === user.username)
        );

        if (interval) {
            clearInterval(interval);
        }

        // interval = setInterval(save, 30000);
    }, [user, id]);

    useEffect(() => {
        // let newDiff = deepDiff(rootScript, script).filter(
        //     ({ path, operation }) =>
        //         !path.startsWith('characters') &&
        //         !['editor', '_id'].includes(path) &&
        //         !path.includes('_id') &&
        //         operation !== 'UNCHANGED'
        // );
        // setDiff(newDiff);
    }, [script, rootScript]);

    const deepCopyObject = (object) => {
        return JSON.parse(JSON.stringify(object));
    };

    const save = async () => {
        if (!chapters || chapters == {}) {
            return;
        }

        // Attempt to store scene cache once more before saving
        let updatedChapters = storeScene();

        for (let chapterIndex in updatedChapters) {
            for (let sceneIndex in updatedChapters[chapterIndex].scenes) {
                for (let dialogueIndex in updatedChapters[chapterIndex].scenes[
                    sceneIndex
                ].dialogue) {
                    let positions =
                        updatedChapters[chapterIndex].scenes[sceneIndex]
                            .dialogue[dialogueIndex].positions;
                    positions['leftFront'] =
                        positions['leftfront'] || positions['leftFront'];
                    positions['rightFront'] =
                        positions['rightfront'] || positions['rightFront'];

                    for (let positionIndex in positions) {
                        positions[positionIndex] = positions[positionIndex]
                            ?.name
                            ? positions[positionIndex]
                            : null;
                    }

                    updatedChapters[chapterIndex].scenes[sceneIndex].dialogue[
                        dialogueIndex
                    ].positions = positions;
                }
            }
        }

        let {characters, ...cleanScript} = script;

        try {
            await axios.put(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}`,
                { ...cleanScript, chapters: updatedChapters },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            toast.info('Script Saved');
        } catch (e) {
            console.error(e);
            toast.error('Save Failed');
        }
    };

    const merge = async () => {
        try {
            let {characters, ...cleanScript} = script;
            await axios.put(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}?merge`,
                { ...cleanScript, chapters},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            loadScript();
            toast.info('Script Saved on Root');
        } catch (e) {
            console.error(e);
            toast.error('Merge Failed');
        }
    };

    const pull = async () => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}?pull=root`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            let theirs = res.data;
            res = await axios.get(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}/snapshot`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            let snapshot = res.data;
            toast.info('Script Updated from Root');

            let merged = mergePulled(script, theirs, snapshot);
            setChapters(merged.chapters);
            setScript({ ...merged, characters });
        } catch (e) {
            console.error(e);
            toast.error('Pull Failed');
        }
    };

    const loadScript = async () => {
        try {
            let url = `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}`;
            if (as) {
                url += `?pull=${as}`;
            }
            let res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            setChapters(res.data.chapters);
            setScript({ ...res.data, characters });

            url = `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}?pull=root`;
            res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            setRootScript(res.data);
        } catch (e) {
            console.error(e);
            toast.error('Load Failed');
        }
    };

    const storeScene = () => {
        if (!sceneCache) {
            return chapters;
        }

        let copy = update(chapters, {
            [chapter]: {
                scenes: { [scene]: { $set: sceneCache } },
            },
        });
        setChapters(copy);
        setScript({ ...script, chapters: copy });
        return copy;
    };

    const changeChapterName = async (oldChapterName, newChapterName) => {
        let chaptersCopy = {};

        newChapterName = newChapterName
            .replace(' ', '_')
            .replace(/[^a-zA-Z0-9_]/, '');

        for (let key in chapters) {
            let newKey = key;
            let updated;
            if (oldChapterName === key) {
                newKey = newChapterName;
                updated = Date.now();
            }
            chaptersCopy[newKey] = { ...chapters[key], updated };
        }
        if (chapter === oldChapterName) {
            setChapter(newChapterName);
        }
        setScript({ ...script, chapters: chaptersCopy });
        setChapters(chaptersCopy);
    };

    const changeSceneKey = (oldSceneKey, newSceneKey) => {
        let chaptersCopy = { ...chapters };
        let scenesCopy = {};

        newSceneKey = newSceneKey
            .replace(' ', '_')
            .replace(/[^a-zA-Z0-9_]/g, '');

        for (let key in chapters[chapter].scenes) {
            let newKey = key;
            let updated;
            if (oldSceneKey === key) {
                newKey = newSceneKey;
                updated = Date.now();
            }
            scenesCopy[newKey] = {
                ...chapters[chapter].scenes[key],
                updated,
            };
        }

        chaptersCopy[chapter].scenes = scenesCopy;
        if (scene === oldSceneKey) {
            setScene(newSceneKey);
        }
        setScript({ ...script, chapters: chaptersCopy });
        setChapters(chaptersCopy);
    };

    const updateOptions = (options) => {
        let copy = update(sceneCache, {
            options: { $set: options },
        });
        setSceneCache(copy);
    };

    const updateDialogue = (index, entry) => {
        let copy = update(sceneCache, {
            dialogue: { [index]: { $set: entry } },
        });
        setSceneCache(copy);
    };

    const addDialogue = (afterIndex) => {
        let copy = deepCopyObject(sceneCache);
        let positions = {
            left: {},
            leftFront: {},
            rightFront: {},
            right: {},
        };
        let active = 'left';

        if (afterIndex >= 0) {
            ({ positions, active } = copy.dialogue[afterIndex]);
        }

        copy.dialogue.splice(afterIndex + 1, 0, {
            positions: {
                left: { ...positions?.left },
                right: { ...positions?.right },
                leftFront: { ...positions?.leftFront },
                rightFront: { ...positions?.rightFront },
            },
            text: {
                en: '',
                es: '',
                jp: '',
                fr: '',
                br: '',
                ch: '',
            },
            choices: {
                en: [],
                es: [],
                jp: [],
                fr: [],
                br: [],
                ch: [],
            },
            active,
            emote: null,
        });
        setDialogueIndex(afterIndex + 1);
        setSceneCache(copy);
    };

    const addChapter = () => {
        let chapterName = `Chapter${Object.keys(chapters).length}`;
        if (chapters.length === 0) {
            chapterName = 'Prologue';
        }
        let copy = { ...chapters };
        copy[chapterName.toLocaleLowerCase()] = {
            name: chapterName,
            scenes: [],
            updated: Date.now(),
        };
        setChapters(copy);
        setScene(null);
        setDialogueIndex(0);
        setChapter(chapterName.toLowerCase());
        setScript({ ...script, chapters: copy });
    };

    const storeDialogues = (newDialogs) => {
        let copy = update(sceneCache, {
            dialogue: { $set: newDialogs },
        });
        setSceneCache(copy);
    };

    const createScene = () => {
        let newSceneKey = `scene${dialogCounter++}`;
        let newScene = {
            dialogue: [
                {
                    options: {
                        smallerPortraits: false,
                        disablePortraits: false,
                        keepBlackBars: false,
                    },
                    positions: {
                        left: {},
                        leftFront: {},
                        rightFront: {},
                        right: {},
                    },
                    text: {
                        en: '',
                        es: '',
                        jp: '',
                        fr: '',
                        br: '',
                        ch: '',
                    },
                    choices: {
                        en: [],
                        es: [],
                        jp: [],
                        fr: [],
                        br: [],
                        ch: [],
                    },
                    active: 'left',
                    emote: null,
                },
            ],
        };
        let copy = update(chapters, {
            [chapter]: { scenes: { [newSceneKey]: { $set: newScene } } },
        });
        setDialogueIndex(0);
        setScene(newSceneKey);
        setSceneCache(newScene);
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const removeScene = (sceneKey) => {
        let copy = update(chapters, {
            [chapter]: { scenes: { $unset: [sceneKey] } },
        });
        setScene(null);
        setSceneCache(null);
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const removeChapter = (chapterKey) => {
        let copy = update(chapters, { $unset: [chapterKey] });
        setScene(null);
        setChapter(null);
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const removeDialogue = (dialogueIndex) => {
        let copy = update(sceneCache, {
            dialogue: { $splice: [[dialogueIndex, 1]] },
        });
        setSceneCache(copy);
    };

    return (
        <div className="container">
            <div className="left">
                <h2>Script Metadata</h2>
                <div>
                    <table className="key-value-table">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{script.name}</td>
                            </tr>
                            <tr>
                                <td>Editor</td>
                                <td>{script.editor}</td>
                            </tr>
                            <tr>
                                <td>Mode</td>
                                <td>
                                    {editable ? (
                                        <span style={{ color: 'green' }}>
                                            Editing
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                            Read Only
                                        </span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Chapters
                    selectedChapter={chapter}
                    chapters={chapters}
                    editable={editable}
                    diff={diff}
                    path={'chapters'}
                    onChapterSelect={(chapter) => {
                        if (sceneCache) {
                            storeScene();
                        }
                        setChapter(chapter);
                        setScene(null);
                        setSceneCache(null);
                    }}
                    onChapterCreate={addChapter}
                    onChapterRemove={removeChapter}
                    onChapterNameChange={changeChapterName}
                />
                <Scenes
                    scenes={chapters[chapter]?.scenes}
                    selectedScene={scene}
                    editable={editable}
                    diff={diff}
                    path={`chapters.${chapter}.scenes`}
                    onSelectScene={(key) => {
                        if (sceneCache) {
                            storeScene();
                        }
                        setScene(key);
                        setDialogueIndex(0);
                        setSceneCache({ ...chapters[chapter].scenes[key] });
                    }}
                    onCreateScene={createScene}
                    onSceneRemove={removeScene}
                    onSceneKeyChange={changeSceneKey}
                />
                <Languages
                    selectedLanguage={language}
                    defaultLanguage={defaultLanguage}
                    onSelectLanguage={setLanguage}
                    onSelectDefaultLanguage={setDefaultLanguage}
                />
                <h2>Actions</h2>
                <button onClick={save} disabled={!editable}>
                    Save
                </button>
                {user?.roles?.includes('ADMIN') ? (
                    <button onClick={merge}>Merge to Root</button>
                ) : null}
                <button onClick={pull}>Pull from Root</button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            JSON.stringify(
                                {
                                    ...script,
                                    chapters,
                                },
                                null,
                                5
                            )
                        );
                        toast.info('JSON Payload Copied to Clipboard');
                    }}
                >
                    Dump JSON to Clipboard
                </button>
            </div>
            <div className="center" style={{ textAlign: 'center' }}>
                <h2>{scene}</h2>
                <div className="preview">
                    <Characters
                        side="left"
                        scene={sceneCache}
                        index={dialogueIndex}
                        characters={script.characters}
                        editable={editable}
                        diff={diff}
                        path={`chapters.${chapter}.scenes.${scene}.dialogue[${dialogueIndex}].positions`}
                        onPositionChange={updateDialogue}
                    />
                    <div>
                        <CharacterSprites
                            scene={sceneCache}
                            index={dialogueIndex}
                        />
                        <TextBox
                            language={language}
                            defaultLanguage={defaultLanguage}
                            scene={sceneCache}
                            index={dialogueIndex}
                            characters={script.characters}
                        />
                    </div>
                    <Characters
                        side="right"
                        scene={sceneCache}
                        index={dialogueIndex}
                        characters={script.characters}
                        editable={editable}
                        diff={diff}
                        path={`chapters.${chapter}.scenes.${scene}.dialogue[${dialogueIndex}].positions`}
                        onPositionChange={updateDialogue}
                    />
                </div>
                {scene ? (
                    <Option
                        options={sceneCache.options}
                        editable={editable}
                        diff={diff}
                        path={`chapters.${chapter}.scenes.${scene}.options`}
                        onOptionsChange={(options) => {
                            updateOptions(options);
                        }}
                    />
                ) : null}
                <DialogueEditor
                    language={language}
                    defaultLanguage={defaultLanguage}
                    scene={sceneCache}
                    index={dialogueIndex}
                    sceneKey={scene}
                    editable={editable}
                    diff={diff}
                    path={`chapters.${chapter}.scenes.${scene}.dialogue`}
                    onDialogueIndexChange={setDialogueIndex}
                    onDialogueChange={updateDialogue}
                    onDialogueAdd={addDialogue}
                    onDialogueRearrange={storeDialogues}
                    onDialogueRemove={removeDialogue}
                />
            </div>
        </div>
    );
}

export default App;
