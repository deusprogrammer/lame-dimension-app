import { useEffect, useState } from "react";
import { useAtom } from 'jotai';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import Languages from '../components/left/Languages';
import categories from '../components/center/database/Categories';

import characters from '../data/characters';
import userAtom from '../atoms/User.atom';

let interval;
export default () => {
    const [selectedCategory, setSelectedCategory] = useState();

    const [language, setLanguage] = useState('en');
    const [defaultLanguage, setDefaultLanguage] = useState('en');
    const [script, setScript] = useState({});
    const [rootScript, setRootScript] = useState({});
    const [editable, setEditable] = useState(false);
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const jwtToken = localStorage.getItem('jwtToken');
    const as = searchParams.get('as');
    const [user] = useAtom(userAtom);

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

    return (
        <div className="container">
            <div className="left">
                <h2>Database</h2>
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
                <h2>Categories</h2>
                    <div class="scrolling">
                        <table>
                            <tbody>
                                {Object.keys(categories).map((category) => {
                                    let {title} = categories[category];
                                    return (
                                        <tr>
                                            <td onClick={() => setSelectedCategory(category)} class={`selectable ${selectedCategory === category ? 'selected' : null}`}>{title}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                
                <Languages
                    selectedLanguage={language}
                    defaultLanguage={defaultLanguage}
                    onSelectLanguage={setLanguage}
                    onSelectDefaultLanguage={setDefaultLanguage}
                />
            </div>
            <div className="center" style={{ textAlign: 'center' }}>
                {selectedCategory && categories[selectedCategory] ? categories[selectedCategory].component : null}
            </div>
        </div>
    );
};