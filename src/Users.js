// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "./api/api";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getAllUsers();
  },[]);

  //BASIC

  const getAllUsers = () => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
      responseType: 'json'
    }).then(res => {
      console.log(res.data)
      setUsers(res.data)
    })
  }

  //WITH SHORTHAND

  // const getAllUsers = () => {
  //   axios.get(`https://jsonplaceholder.typicode.com/users`)
  //     .then(res => {
  //       console.log(res.data);
  //       setUsers(res.data);
  //     })
  // }

  //WITH INSTANCE

  // const getAllUsers = () => {
  //   api.get('/users')
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //       setUsers(res.data);
  //     })
  // }

  // const addUsers = (e) => {
  //   e.preventDefault();
  //   axios.post(`https://jsonplaceholder.typicode.com/users`, {name})
  //    .then(res => {
  //      console.log(res);
  //      console.log(res.data);
  //      alert(res.data.name + ' Berhasil Ditambahkan!')
  //    })
  // }

  const addUsers = (e) => {
    e.preventDefault();
    api.post(`/users`, {name})
     .then(res => {
       console.log(res);
       console.log(res.data);
       alert(res.data.name + ' Berhasil Ditambahkan!')
     })
     .catch(err => {
       console.log(err)
     })
  }

  const deleteUsers = (id) => {
    api.delete(`/users/${id}`)
     .then(res => {
       console.log(res);
       console.log(res.data);
     })
  }
  
  return (
    <div className="users">
        <ul>
          { users.map((user) => {
            return (
              <div className='delete' key={user.name}>
                <li>{user.name}</li>
                <button onClick={() => deleteUsers(user.id)}>Hapus</button>
              </div>
            )
          })}
        </ul>
      
      <form onSubmit={addUsers}>
          Nama
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit">Tambah</button>
      </form>
    </div>
  );
}
 
export default Users;