import { useEffect, useState } from "react";
import api from "./api/api";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [edit, setEdit] = useState(false)
  const [editIdx, setEditIdx] = useState('')

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    try{
      const res = await api.get(`/posts`, {
        params: {
          _limit: 10,
          _start: 0
        }
      });
      // console.log(res);
      setPosts(res.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const addPost = async (e) => {
    try{
      e.preventDefault();
      const req = await api.post(`/posts`, {
        title: title,
        body: body
      });
      // console.log(req) 
      // console.log(req.data) 
      alert(req.data.title + " " + req.data.body);
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (id) => {
    try{
      const req = await api.put(`/posts`, {
        id: id,
        title: title,
        body: body
      });
      console.log(req)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="posts">
      <ul>
        { posts.map((post) => {
          return (
            <div className='delete' key={post.id}>
              <li>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            </div>
          )
        })}
      </ul>

      <form onSubmit={addPost}>
        <p>Title</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <p>Body</p>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">Simpan</button>
      </form>
      
    </div>
  );
}
 
export default Posts;