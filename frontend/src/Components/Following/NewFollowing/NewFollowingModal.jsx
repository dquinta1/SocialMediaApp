import { Button, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useLogic from './useLogic';

const { TextArea } = Input;

const NewFollowingModal = () => {
	const { name, isModalVisible, setName, showModal, handleOk, handleCancel } =
		useLogic();

	return (
		<>
			<Button
				className='new-follower'
				size='large'
				type='text'
				icon={<PlusOutlined />}
				onClick={showModal}
				style={{ color: 'gray', backgroundColor: 'transparent' }}
			>
				Follow New User
			</Button>
			<Modal
				title="Enter a user's username to follow them"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<div style={{ display: 'flex', justifyContent: 'end' }}>
						<Button key='submit' type='primary' onClick={handleOk}>
							Submit
						</Button>
						<Button key='back' onClick={handleCancel}>
							Cancel
						</Button>
					</div>,
				]}
			>
				<TextArea
					rows={1}
					placeholder='Username'
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</Modal>
		</>
	);
};

export default NewFollowingModal;
