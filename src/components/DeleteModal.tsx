import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllPosts } from '../redux/posts';

export default function DeleteModal({ id, onCancel }: { id: number, onCancel: () => void }) {
    const dispatch = useDispatch();

    async function del() {
        await axios.delete(`https://dev.codeleap.co.uk/careers/${id}/`)
        
        let r = await axios.get('https://dev.codeleap.co.uk/careers/');
        dispatch(setAllPosts(r.data.results));
        
        onCancel();
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <h2>Are you sure you want to delete this item?</h2>
                <div className="button-container">
                    <button className="btn cancel-button" onClick={() => onCancel()}>Cancel</button>
                    <button className="btn delete-button" onClick={() => del()}>Delete</button>
                </div>
            </div>
        </div>
    )
}