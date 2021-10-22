import axios from 'axios';
import { useEffect, useState } from 'react';

const apiURL = 'https://jsonplaceholder.typicode.com/';

function MockDB() {
    const [users, setUsers] = useState({});
    const [iDs, setIDs] = useState({});
    const [posts, setPosts] = useState({});

    useEffect(() => {
        axios.all([
            axios.get(apiURL + 'users'),
            axios.get(apiURL + 'posts')
        ])
        .then( response => {
            let info = response[0].data;
            let data = {};
            let id_data = {};

            for (let index = 0; index < info.length; index++) {
                const element = info[index];
                data[element.username] = element;
                id_data[element.id] = element;

            }
            setUsers({ data });

            data = id_data;
            setIDs({ data });

            info = response[1].data;
            data = {};

            for (let index = 0; index < info.length; index++) {
                const element = info[index];
                
                if (!(element.userId in data)) {
                    data[element.userId] = [element];
                }

                else {
                    data[element.userId].push(element);
                }
            }
            setPosts({ data });

        });

      }, []);

    return {
        users,
        iDs,
        posts
    };
}

export default MockDB;