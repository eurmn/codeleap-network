import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Post, Posts } from "../redux/posts";

export default function PostComponent({ post, onDelete, onEdit }:
{ post: Post, onDelete: (id: number) => void, onEdit: (id: number) => void }) {
    const posts = useSelector((state: any) => state.posts as Posts);

    return (
        <div className="post-container written">
            <div className="post-title">
                <h2>{post.title}</h2>
                {post.username === posts.username && (
                    <div className="buttons-container">
                        <FaTrash size={25} onClick={() => onDelete(post.id)} />
                        <FaEdit size={30} onClick={() => onEdit(post.id)} />
                    </div>
                )}
            </div>
            <div className="post-content">
                <div className="post-user">@{post.username}</div>
                <div>{post.content}</div>
            </div>
        </div>
    )
}