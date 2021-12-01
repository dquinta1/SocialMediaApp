import { useState, useContext } from 'react';
import { Button, Modal, Input, Upload, message } from 'antd';
import { PlusOutlined, FileImageOutlined } from '@ant-design/icons';
import useLogic from './useLogic';

const { TextArea } = Input;

const NewFollowingModal = () => {
	
	const {
		name,
		isModalVisible,
		setName,
		showModal,
		handleOk,
		handleCancel,
	} = useLogic();

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
				Add Follower
			</Button>
			<Modal
				title='Add New Following'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<div style={{ display: 'flex', justifyContent: 'end' }}>
						<Button
							key='submit'
							type='primary'
							/*{loading={loading}}*/ onClick={handleOk}
						>
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
					placeholder='Name'
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
