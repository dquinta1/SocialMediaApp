import { useState } from 'react';
import { useState as useHookState } from '@hookstate/core';
import store from '../../DB/store';
import { Button, Modal, Input, Upload } from 'antd';
import { 
    PlusOutlined,
    FileImageOutlined
} from '@ant-design/icons';
import { addNewFollower } from '../../DB/utils/store-utils';

const { TextArea } = Input;

const NewUserModal = () => {

    const { followers } = useHookState(store);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('New Follower');
    const [prevName, setPrevName] = useState(name);
    const [headline, setHeadline] = useState('Headline');
    const [prevHeadline, setPrevHeadline] = useState(headline);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        addNewFollower(name, name, headline, 'https://picsum.photos/200/200', followers);
        setPrevName(name);
        setPrevHeadline(headline);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setName(prevName);
        setHeadline(prevHeadline);
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
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
                <div style={{display: 'flex', justifyContent:'end'}}>
                    <Button key="submit" type="primary" /*{loading={loading}}*/ onClick={handleOk}>
                        Submit
                    </Button>
                    <Button key="back" onClick={ handleCancel }>
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <TextArea rows={1} placeholder='Name' onChange={ (e) => { setName(e.target.value) } }/> 
            <TextArea rows={1} placeholder='Headline' onChange={ (e) => { setHeadline(e.target.value) } }/>
        </Modal>
        </>
    );
}

export default NewUserModal
