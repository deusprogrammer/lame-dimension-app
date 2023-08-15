import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import userAtom from '../atoms/User.atom';

const Component = () => {
    const navigate = useNavigate();
    const [scripts, setScripts] = useState([]);
    const [user] = useAtom(userAtom);
    const jwtToken = localStorage.getItem('jwtToken');

    const loadScripts = async () => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_DOMAIN}/scripts`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setScripts(res.data || []);
        } catch (e) {
            console.error(e);
            navigate(`${process.env.PUBLIC_URL}/login`);
        }
    };

    useEffect(() => {
        loadScripts();
    }, []);

    return (
        <div style={{ width: '60%', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}>Scripts</h1>
            {scripts.map((script) => {
                return (
                    <div
                        key={script.name}
                        style={{
                            cursor: 'pointer',
                            backgroundColor:
                                user.username === script.editor
                                    ? 'green'
                                    : 'none',
                        }}
                        onClick={() => {
                            navigate(
                                `${process.env.PUBLIC_URL}/scripts/${script.id}`
                            );
                        }}
                    >
                        {user.username === script.editor ? '>' : null}
                        {script.name}({script.id})[{script.editor}]
                    </div>
                );
            })}
        </div>
    );
};

export default Component;
