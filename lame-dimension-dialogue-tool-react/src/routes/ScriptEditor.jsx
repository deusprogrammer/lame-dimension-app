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
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();
    const { id } = useParams();
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        loadScript();

        if (interval) {
            clearInterval(interval);
        }

        // interval = setInterval(save, 30000);
    }, []);

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
            await axios.get(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}?pull`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            toast.info('Script Updated from Root');
        } catch (e) {
            console.error(e);
            navigate(`/login`);
        }
    };

    const loadScript = async () => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_DOMAIN}/scripts/${id}`,
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

    const changeSceneKey = (sceneKey, oldSceneKey) => {
        let chaptersCopy = { ...chapters };
        let scenesCopy = { ...chapters[chapter].scenes };

        if (sceneKey in scenesCopy) {
            return;
        }

        scenesCopy[sceneKey] = scenesCopy[oldSceneKey];
        delete scenesCopy[oldSceneKey];
        chaptersCopy[chapter].scenes = scenesCopy;
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
                        </tbody>
                    </table>
                </div>
                <Chapters
                    onChapterSelect={(chapter) => {
                        setChapter(chapter);
                        setScene(null);
                    }}
                    onCreateChapter={addChapter}
                    selectedChapter={chapter}
                    chapters={chapters}
                />
                <Scenes
                    scenes={chapters[chapter]?.scenes}
                    selectedScene={scene}
                    onSelectScene={setScene}
                    onCreateScene={createScene}
                />
                <Languages
                    selectedLanguage={language}
                    onSelectLanguage={setLanguage}
                    defaultLanguage={defaultLanguage}
                    onSelectDefaultLanguage={setDefaultLanguage}
                />
                <h2>Actions</h2>
                <button onClick={save}>Save</button>
                {user?.roles?.includes('ADMIN') ? (
                    <button onClick={merge}>Merge to Root</button>
                ) : null}
                <button onClick={pull}>Pull from Root</button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            JSON.stringify(
                                {
                                    characters,
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
                <SceneMeta
                    sceneKey={scene}
                    onSceneKeyChange={(sceneKey, oldSceneKey) => {
                        changeSceneKey(sceneKey, oldSceneKey);
                        setScene(sceneKey);
                    }}
                />
                <div className="preview">
                    <Characters
                        side="left"
                        scene={chapters[chapter]?.scenes[scene]}
                        index={sceneIndex}
                        characters={script.characters}
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
                        onPositionChange={updateDialogue}
                    />
                </div>
                {scene ? (
                    <Option
                        onOptionsChange={(options) => {
                            updateOptions(options);
                        }}
                        options={chapters[chapter]?.scenes[scene].options}
                    />
                ) : null}
                <DialogueEditor
                    language={language}
                    defaultLanguage={defaultLanguage}
                    scene={chapters[chapter]?.scenes[scene]}
                    index={sceneIndex}
                    onDialogueIndexChange={setSceneIndex}
                    onDialogueChange={updateDialogue}
                    onDialogueAdd={addDialogue}
                    onDialogueRearrange={storeDialogues}
                />
            </div>
            <div className="right"></div>
        </div>
    );
}

export default App;
