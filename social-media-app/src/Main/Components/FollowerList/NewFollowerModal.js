import { useState, useContext } from 'react';
import FeedContext from '../../Context/feed-context';
import { Button, Modal, Input, Upload, message } from 'antd';
import { 
    PlusOutlined,
    FileImageOutlined
} from '@ant-design/icons';

const { TextArea } = Input;

const NewFollowerModal = () => {

    const { addFollower } = useContext(FeedContext);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [headline, setHeadline] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if ( name !== '' &&  headline !== ''){
            // format new follower
            const newFollower = {
                name: name,
                id: Math.random(),
                headline: headline,
                src: 'https://picsum.photos/200/200',
            }

            try {
                await addFollower(newFollower.name);
                message.success('New user is being followed!', 5);
            } catch (error) {
                message.error(error.message, 5);
            }

        } else {
            message.warning('Input is empty', 5);
        }

        setName('');
        setHeadline('');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setName('');
        setHeadline('');
        setIsModalVisible(false);
    };

    return(
        <>
        <Button className='new-follower' size='large' type='text' icon={<PlusOutlined />} onClick={ showModal }
                style={{color: 'gray', backgroundColor: 'transparent'}} >
            Add Follower
        </Button>
        <Modal title= 'Add New Follower'
            visible={isModalVisible} 
            onOk={ handleOk } 
            onCancel={ handleCancel }
            footer={[
                <div style={{display: 'flex', justifyContent:'end'}}>
                    <Button key="submit" type="primary" /*{loading={loading}}*/ onClick={ handleOk }>
                        Submit
                    </Button>
                    <Button key="back" onClick={ handleCancel }>
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <TextArea id='add-new-follower-title' rows={1} placeholder='Name' value={name} onChange={ (e) => { setName(e.target.value) } }/> 
            <TextArea id='add-new-follower-headline' rows={1} placeholder='Headline' value={headline} onChange={ (e) => { setHeadline(e.target.value) } }/>
        </Modal>
        </>
    );
}

export default NewFollowerModal;
