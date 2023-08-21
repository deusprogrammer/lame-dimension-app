import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import Chapters from '../components/left/Chapters';
import Languages from '../components/left/Languages';
import Scenes from '../components/left/Scenes';

import CharacterSprites from '../components/center/CharacterSprites';
import TextBox from '../components/center/TextBox';
import Characters from '../components/center/Characters';
import SceneMeta from '../components/center/SceneMeta';
import DialogueEditor from '../components/center/DialogueEditor';

import Option from '../components/center/Options';
import userAtom from '../atoms/User.atom';

import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

let dialogCounter = 0;
let interval;

function App() {
    const [language, setLanguage] = useState('en');
    const [defaultLanguage, setDefaultLanguage] = useState('en');
    const [script, setScript] = useState({});
    const [chapters, setChapters] = useState({});
    const [chapter, setChapter] = useState('');
    const [scene, setScene] = useState(null);
    const [sceneIndex, setSceneIndex] = useState(0);
    const [editable, setEditable] = useState(false);
    
    const [user] = useAtom(userAtom);
    
    const { id } = useParams();
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    
    const jwtToken = localStorage.getItem('jwtToken');
    const as = searchParams.get('as');

    useEffect(() => {
        loadScript();

        console.log("ROLES: " + JSON.stringify(user));
        console.log("AS:    " + as);
        setEditable(user.roles.includes('EDITOR') && (!as || as === user.username));

        if (interval) {
            clearInterval(interval);
        }

        // interval = setInterval(save, 30000);
    }, [user, id]);

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
            navigate(`${process.env.PUBLIC_URL}/login`);
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
            toast.info('Script Saved on Root');
        } catch (e) {
            console.error(e);
            navigate(`/login`);
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
            toast.info('Script Updated from Root');
            setChapters(res.data.chapters);
            setScript(res.data);
        } catch (e) {
            console.error(e);
            navigate(`/login`);
        }
    };

    const loadScript = async () => {
        try {
            let url = `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}`;
            if (as) {
                url += `?pull=${as}`;
            }
            let res = await axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setChapters(res.data.chapters);
            setScript(res.data);
        } catch (e) {
            console.error(e);
            navigate(`/login`);
        }
    };

    const changeChapterName = async (oldChapterName, newChapterName) => {
        let chaptersCopy = {};
        for (let key in chapters) {
            let newKey = key;
            if (oldChapterName === key) {
                newKey = newChapterName;
            }
            chaptersCopy[newKey] = {...chapters[key]};
        }
        if (chapter === oldChapterName) {
            setChapter(newChapterName);
        }
        setChapters(chaptersCopy);
    }

    const changeSceneKey = (oldSceneKey, newSceneKey) => {
        let chaptersCopy = { ...chapters };
        let scenesCopy = {};

        for (let key in chapters[chapter].scenes) {
            let newKey = key;
            if (oldSceneKey === key) {
                newKey = newSceneKey;
            }
            scenesCopy[newKey] = {...chapters[chapter].scenes[oldSceneKey]};
        }

        chaptersCopy[chapter].scenes = scenesCopy;
        if (scene === oldSceneKey) {
            setScene(newSceneKey);
        }
        setChapters(chaptersCopy);
    };

    const updateOptions = (options) => {
        let chaptersCopy = { ...chapters };
        chaptersCopy[chapter].scenes[scene].options = options;
        setChapters(chaptersCopy);
    };

    const updateDialogue = (index, entry) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue[index] = entry;
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
            active: 'left',
            emote: null,
        });
        setSceneIndex(afterIndex + 1);
        setChapters(copy);
    };

    const addChapter = () => {
        let chapterName = `Chapter ${Object.keys(chapters).length}`;
        if (chapters.length === 0) {
            chapterName = 'Prologue';
        }
        let copy = { ...chapters };
        copy[chapterName.toLocaleLowerCase()] = {
            name: chapterName,
            scenes: [],
        };
        setChapters(copy);
        setScene(null);
        setSceneIndex(0);
        setChapter(chapterName.toLowerCase());
    };

    const storeDialogues = (newDialogs) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue = newDialogs;
        setChapters(copy);
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
                    active: 'left',
                    emote: null,
                },
            ],
        };
        setSceneIndex(0);
        setScene(newSceneKey);
        setChapters(copy);
    };

    const removeScene = (sceneKey) => {
        let copy = { ...chapters };
        delete copy[chapter].scenes[sceneKey];
        setChapters(copy);
    };

    const removeChapter = (chapterKey) => {
        let copy = { ...chapters };
        delete copy[chapterKey];
        setChapters(copy);
    };

    const removeDialogue = (dialogueIndex) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue.splice(dialogueIndex, 1);
        setChapters(copy);
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
                                <td>{editable ? <span style={{color: 'green'}}>Editing</span> : <span style={{color: 'red'}}>Read Only</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Chapters
                    selectedChapter={chapter}
                    chapters={chapters}
                    editable={editable}
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
                <button onClick={save} disabled={!editable}>Save</button>
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
                        onPositionChange={updateDialogue}
                    />
                </div>
                {scene ? (
                    <Option
                        options={chapters[chapter]?.scenes[scene].options}
                        editable={editable}
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
