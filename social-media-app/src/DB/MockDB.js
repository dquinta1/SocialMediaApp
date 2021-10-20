import axios from 'axios';
import { useEffect, useState } from 'react';

const apiURL = 'https://jsonplaceholder.typicode.com/';

function MockDB() {
    const [users, setUsers] = useState({});
    const [posts, setPosts] = useState({});

    useEffect(() => {
        axios.get(apiURL+'users').then( (res) => {
            const info = res.data;
            let data = {};

            for (let index = 0; index < info.length; index++) {
                const element = info[index];
                data[element.username] = element;
            }
            setUsers({ data });
        });

        axios.get(apiURL+'posts').then( (res) =>{
            const info = res.data;
            let data = {};

            for (let index = 0; index < info.length; index++) {
                const element = info[index];
                data[element.userId] = element;
            }
            setPosts({ data });
        });

      }, [setUsers, setPosts]);

    return {
        users,
        posts
    };
}

export default MockDB;