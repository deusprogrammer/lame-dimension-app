import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScriptList from './routes/ScriptList';
import ScriptEditor from './routes/ScriptEditor';
import Login from './routes/Login';

import userAtom from './atoms/User.atom';

import './App.css';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
    const [user, setUser] = useAtom(userAtom);
    const jwtToken = localStorage.getItem('jwtToken');

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
            <ToastContainer />
            <div>Welcome {user.username}</div>
            <Router>
                <Routes>
                    <Route path={`/scripts`} exact element={<ScriptList />} />
                    <Route
                        path={`/scripts/:id`}
                        exact
                        element={<ScriptEditor />}
                    />
                    <Route path={`/login`} exact element={<Login />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace={true} />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
