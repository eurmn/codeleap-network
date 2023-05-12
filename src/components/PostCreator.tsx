import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Posts, setAllPosts } from '../redux/posts';

export default function PostCreator({ desc, type, onCancel, onEdit } : {
    desc: string,
    type: 'create' | 'edit',
    onCancel?: () => void,
    onEdit?: (title: string, content: string) => void }
) {
    const posts = useSelector((state: any) => state.posts as Posts);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function createPost() {
        setTitle('');
        setContent('');

        await axios.post('https://dev.codeleap.co.uk/careers/', {
            username: posts.username,
            title,
            content,
        });

        axios.get('https://dev.codeleap.co.uk/careers/')
        .then(r => {
          dispatch(setAllPosts(r.data.results));
        });
    }

    return (
        <div className={`post-container creator${type === 'edit' ? ' mw' : ''}`}>
            <h2>{desc}</h2>
            <div className="input-container">
            <p>Title</p>
            <input
                type="text"
                placeholder="Hello world"
                onInput={(e) => setTitle(e.currentTarget.value)}
                value={title}
            />
            </div>
            <div className="input-container">
                <p>Content</p>
                <textarea
                    placeholder="Content here"
                    className="fat-input"
                    onInput={(e) => setContent(e.currentTarget.value)}
                    value={content}
                />
            </div>
            {type === 'create' ? (
                <button
                    className="send-button"
                    onClick={() => createPost()}
                    disabled={content.length === 0 || title.length === 0}
                >Create</button>
            ) : (
                <div className="button-container">
                    <button className="btn cancel-button" onClick={() => onCancel?.()}>Cancel</button>
                    <button
                        className="btn save-button"
                        onClick={() => onEdit?.(title, content)}
                        disabled={content.length === 0 || title.length === 0}
                        >Save</button>
                </div>
            )}
      </div>
    )
}