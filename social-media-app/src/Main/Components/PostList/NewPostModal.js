import { useContext, useState } from 'react';
import FeedContext from '../../Context/feed-context';
import { Button, Modal, Input, Upload } from 'antd';
import { 
    PlusOutlined,
    FileImageOutlined
} from '@ant-design/icons';

const { TextArea } = Input;

function NewPostModal() {

    const { user, addPosts } = useContext(FeedContext);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('New Post');
    const [description, setDescription] = useState('');
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if ( (title !== '' && title !== 'New Post') &&  description !== ''){
            // format new post
            const newPost = {
                title: title,
                description: description,
                author: user.name,
                timestamp: Date.now(),
                id: Math.random(),
                src: 'https://picsum.photos/1000/1000',
                comments: [],
            }
            addPosts(newPost);
            setTitle('New Post');
            setDescription('');
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setTitle('New Post');
        setDescription('');
        setIsModalVisible(false);
    };

    return(
        <>
        <Button className='new-post' size='large' type='dashed' icon={<PlusOutlined />} onClick={ showModal }
                style={{color: 'gray', backgroundColor: 'transparent'}} block>
            New Post...
        </Button>
        <Modal title={ title } 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
                <div style={{display: 'flex', justifyContent:'end'}}>
                    <Upload accept={'.png,.jpg,.jpeg'} maxCount={1} onChange={() => {/*TODO: Implement this*/}}>
                        <Button type='link' size='middle' icon={<FileImageOutlined />}/>
                    </Upload>
                    <Button key="submit" type="primary" /*{loading={loading}}*/ onClick={handleOk}>
                        Submit
                    </Button>
                    <Button key="back" onClick={ handleCancel }>
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <TextArea id='new-post-modal-textArea-title' rows={1} placeholder='Title' value={ title } onChange={ (e) => { setTitle(e.target.value) } }/> 
            <TextArea id='new-post-modal-textArea-description' rows={4} placeholder='Description...' value={ description } onChange={ (e) => { setDescription(e.target.value) } }/>
        </Modal>
        </>
    );
}

export default NewPostModal;