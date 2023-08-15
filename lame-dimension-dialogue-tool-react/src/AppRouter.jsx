import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from 'react-router-dom';

import ScriptList from './routes/ScriptList';
import ScriptEditor from './routes/ScriptEditor';
import Login from './routes/Login';
import Admin from './components/Admin';

import userAtom from './atoms/User.atom';

import './App.css';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
    const [user, setUser] = useAtom(userAtom);
    const jwtToken = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API_DOMAIN}/profiles/self`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setUser(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <div>
                <div>Welcome {user.username} <span style={{cursor: 'pointer'}} onClick={() => {localStorage.removeItem('jwtToken'); navigate(`${process.env.PUBLIC_URL}/login`);}}>(Logout)</span></div>
                <div>
                    <button onClick={() => {navigate(`${process.env.PUBLIC_URL}/`)}}>Home</button>
                    {user.roles.includes('ADMIN') ? (
                        <button
                            onClick={() => {
                                navigate(`${process.env.PUBLIC_URL}/admin`);
                            }}
                        >
                            Admin Tools
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Routes>
                <Route
                    path={`${process.env.PUBLIC_URL}/scripts`}
                    exact
                    element={<ScriptList />}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/scripts/:id`}
                    exact
                    element={<ScriptEditor />}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/login`}
                    exact
                    element={<Login />}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/admin`}
                    exact
                    element={<Admin />}
                />
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={`${process.env.PUBLIC_URL}/scripts`}
                            replace={true}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
