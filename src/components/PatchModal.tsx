import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllPosts } from '../redux/posts';
import PostCreator from './PostCreator';

export default function PatchModal({ id, onCancel }: { id: number, onCancel: () => void }) {
    const dispatch = useDispatch();

    async function edit(title: string, content: string) {
        await axios.patch(`https://dev.codeleap.co.uk/careers/${id}/`, {
            title: title,
            content: content,
        })
        
        let r = await axios.get('https://dev.codeleap.co.uk/careers/');
        dispatch(setAllPosts(r.data.results));

        onCancel();
    }

    return (
        <div className="modal-container">
            <PostCreator
                desc="Edit item"
                type="edit"
                onCancel={onCancel}
                onEdit={edit} />
        </div>
    )
}