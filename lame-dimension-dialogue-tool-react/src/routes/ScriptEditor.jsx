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

import deepDiff from 'deep-diff-pizza';
import { mergePulled } from '../util/util';

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
    const [sceneIndex, setSceneIndex] = useState(0);
    const [editable, setEditable] = useState(false);

    const [user] = useAtom(userAtom);

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

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
        let newDiff = deepDiff(rootScript, script).filter(
            ({ path, operation }) =>
                !path.startsWith('characters') &&
                !['editor', '_id'].includes(path) &&
                !path.includes('_id') &&
                operation !== 'UNCHANGED'
        );
        setDiff(newDiff);
    }, [script, rootScript]);

    const save = async () => {
        if (!chapters || chapters === {}) {
            return;
        }

        try {
            await axios.put(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}`,
                { ...script, chapters },
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
            await axios.put(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}?merge`,
                { ...script, chapters },
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
            // setChapters(res.data.chapters);
            // setScript(res.data);
            mergePulled(script, theirs, snapshot);
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
            setScript(res.data);

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

    const changeChapterName = async (oldChapterName, newChapterName) => {
        let chaptersCopy = {};
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

        for (let key in chapters[chapter].scenes) {
            let newKey = key;
            let updated;
            if (oldSceneKey === key) {
                newKey = newSceneKey;
                updated = Date.now();
            }
            scenesCopy[newKey] = {
                ...chapters[chapter].scenes[oldSceneKey],
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
        let chaptersCopy = { ...chapters };
        chaptersCopy[chapter].scenes[scene].options = options;
        setScript({ ...script, chapters: chaptersCopy });
        setChapters(chaptersCopy);
    };

    const updateDialogue = (index, entry) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue[index] = entry;
        setScript({ ...script, chapters: copy });
        setChapters(copy);
    };

    const addDialogue = (afterIndex) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue.splice(afterIndex + 1, 0, {
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
        });
        setSceneIndex(afterIndex + 1);
        setScript({ ...script, chapters: copy });
        setChapters(copy);
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
        setSceneIndex(0);
        setChapter(chapterName.toLowerCase());
        setScript({ ...script, chapters: copy });
    };

    const storeDialogues = (newDialogs) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue = newDialogs;
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const createScene = () => {
        let newSceneKey = `scene${dialogCounter++}`;
        let copy = { ...chapters };
        copy[chapter].scenes[newSceneKey] = {
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
        setSceneIndex(0);
        setScene(newSceneKey);
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const removeScene = (sceneKey) => {
        let copy = { ...chapters };
        delete copy[chapter].scenes[sceneKey];
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const removeChapter = (chapterKey) => {
        let copy = { ...chapters };
        delete copy[chapterKey];
        setChapters(copy);
        setScript({ ...script, chapters: copy });
    };

    const removeDialogue = (dialogueIndex) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue.splice(dialogueIndex, 1);
        setChapters(copy);
        setScript({ ...script, chapters: copy });
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
                        setChapter(chapter);
                        setScene(null);
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
                    onSelectScene={setScene}
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
                        scene={chapters[chapter]?.scenes[scene]}
                        index={sceneIndex}
                        characters={script.characters}
                        editable={editable}
                        diff={diff}
                        path={`chapters.${chapter}.scenes.${scene}.dialogue[${sceneIndex}].positions`}
                        onPositionChange={updateDialogue}
                    />
                    <div>
                        <CharacterSprites
                            scene={chapters[chapter]?.scenes[scene]}
                            index={sceneIndex}
                        />
                        <TextBox
                            language={language}
                            defaultLanguage={defaultLanguage}
                            scene={chapters[chapter]?.scenes[scene]}
                            index={sceneIndex}
                            characters={script.characters}
                        />
                    </div>
                    <Characters
                        side="right"
                        scene={chapters[chapter]?.scenes[scene]}
                        index={sceneIndex}
                        characters={script.characters}
                        editable={editable}
                        diff={diff}
                        path={`chapters.${chapter}.scenes.${scene}.dialogue[${sceneIndex}].positions`}
                        onPositionChange={updateDialogue}
                    />
                </div>
                {scene ? (
                    <Option
                        options={chapters[chapter]?.scenes[scene].options}
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
                    scene={chapters[chapter]?.scenes[scene]}
                    index={sceneIndex}
                    editable={editable}
                    diff={diff}
                    path={`chapters.${chapter}.scenes.${scene}.dialogue`}
                    onDialogueIndexChange={setSceneIndex}
                    onDialogueChange={updateDialogue}
                    onDialogueAdd={addDialogue}
                    onDialogueRearrange={storeDialogues}
                    onDialogueRemove={removeDialogue}
                />
            </div>
            <div className="right"></div>
        </div>
    );
}

export default App;
