import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { 
    PlusOutlined,
    FileImageOutlined
} from '@ant-design/icons';

const { TextArea } = Input;

function NewPostModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('New Post');
    const [prevTitle, setPrevTitle] = useState(title);
    const [description, setDescription] = useState('');
    const [prevDescription, setPrevDescription] = useState(description);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // TODO: remove next two lines and implement proper functionality
        setTitle(prevTitle);
        setDescription(prevDescription);

        // TODO: uncomment next two lines when previous TODO is resolved
        // setPrevTitle(title);
        // setPrevDescription(description);

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setTitle(prevTitle);
        setDescription(prevDescription);
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
                <Button type='link' icon={<FileImageOutlined />} style={{position: 'absolute', left: '2%'}}/>,
                <Button key="submit" type="primary" /*{loading={loading}}*/ onClick={handleOk}>
                    Submit
                </Button>,
                <Button key="back" onClick={ handleCancel }>
                    Cancel
                </Button>
            ]}
        >
            <TextArea rows={1} placeholder='Title' onChange={ (e) => { 
                                                                        setTitle(e.target.value);
                                                                        e.target.value = '';
                                                                         } }/> 
            <TextArea rows={4} placeholder='Description...' onChange={ (e) => { setDescription(e.target.value) } }/>
        </Modal>
        </>
    );
}

export default NewPostModal;