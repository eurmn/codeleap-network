import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import PostComponent from './components/PostComponent';
import { Posts, setAllPosts, setUsername } from './redux/posts';
import PostCreator from './components/PostCreator';
import DeleteModal from './components/DeleteModal';
import axios from 'axios';
import PatchModal from './components/PatchModal';

function App() {
  const posts = useSelector((state: any) => state.posts as Posts);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://dev.codeleap.co.uk/careers/')
      .then(r => {
        dispatch(setAllPosts(r.data.results));
      });
  }, [dispatch]);
  

  const [name, setName] = useState('');
  const [deleting, setDeleting] = useState<number | undefined>(undefined);
  const [editing, setEditing] = useState<number | undefined>(undefined);

  if (!posts.username) {
    return (
      <>
        <div className="container">
          <div className="login">
            <h2>Welcome to CodeLeap network!</h2>
            <div className="input-container">
              <p>Please enter your username</p>
              <input
                placeholder="John Doe"
                type="text"
                onInput={(e) => setName(e.currentTarget.value)}
                />
            </div>
            <button
              className="send-button"
              onClick={(e) => dispatch(setUsername(name))}
              disabled={name.length === 0}
              >ENTER</button>
          </div>
        </div>
        <style></style>
      </>
    );
  }

  return (
    <>
      {deleting && 
        <DeleteModal onCancel={() => setDeleting(undefined)} id={deleting} />
      }
      {editing && 
        <PatchModal onCancel={() => setEditing(undefined)} id={editing} />
      }
      <div>
        <div className="header">
          <h1>CodeLeap Network</h1>
        </div>
        <div className="posts-container">
          <PostCreator type="create" desc="What's on your mind?" />
          {posts.posts.map((post, i) => (
            <PostComponent post={post} key={i} onEdit={(id) => setEditing(id)} onDelete={(id) => setDeleting(id)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
