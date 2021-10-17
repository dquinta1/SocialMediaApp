import axios from 'axios';
import { useEffect, useState } from 'react';

const apiURL = 'https://jsonplaceholder.typicode.com/users';

function MockDB() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(apiURL).then( (res) => {
            const data = res.data;
            // const users = data.map(player.username => player);
            setUsers({ data });
        }  )
      }, [setUsers]);

    return users;
}

export default MockDB;