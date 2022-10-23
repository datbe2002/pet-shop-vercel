import * as React from 'react';
import { useEffect } from 'react';
import { deleteUser, getAllUsers } from '../../Redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './homepage.css'



export default function HomePage() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector((state) => state.users.users?.allUsers);
    const msg = useSelector((state) => state.users?.msg);

    // console.log(user)
    console.log(userList)
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch)
        }
    }, []);

    const handleDelete = id => {
        // console.log(id)
        deleteUser(id, user?.accessToken, dispatch)

    }
    return (

        <main className="home-container">
            <div className="home-title">User List</div>
            <div className="home-userlist">
                {userList.map((user) => {
                    return (
                        <div className="user-container">
                            <div className="home-user">{user.email}</div>
                            <div className="delete-user" onClick={() => handleDelete(user.id)}> Delete </div>
                        </div>
                    );
                })}
            </div>
            {msg.msg}

        </main>

    );
}