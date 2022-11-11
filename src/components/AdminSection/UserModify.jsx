import { Paper } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../Redux/apiRequest';
import UpdateUserInfor from '../UpdateUserInfor'


const UserModify = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.users.users?.allUsers);
    const handleDelete = id => {
        // console.log(id)
        deleteUser(id, user?.accessToken, dispatch)

    }
    return (

        <Paper>
            <div className="home-container">
                <div className="home-title">User List</div>
                <div className="home-userlist">
                    {userList.map((user) => {
                        return (
                            <div className="user-container">
                                <div className="home-user">{user.email}</div>
                                <div className="update-user" >
                                    <UpdateUserInfor user={user}> </UpdateUserInfor>
                                </div>
                                <div className="delete-user" onClick={() => handleDelete(user.id)}> Delete </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </Paper>

    )
}

export default UserModify