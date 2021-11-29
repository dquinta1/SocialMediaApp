import { useState, useContext } from 'react';
import { Space, Avatar, Button, Typography, Modal, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

function DisplayAvatar() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [input, setInput] = useState('');

	const [headline, setHeadline] = useState(store.get('headline'));

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (input !== '') {
			setHeadline(input);
			// editHeadline(headline);
			store.set('headline', input);
		}
		setInput('');
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setInput('');
		setIsModalVisible(false);
	};

	return (
		<Space direction='vertical' style={{ paddingTop: '8px' }}>
			<Space size={25}>
				<Avatar
					className='avatar'
					id='avatar-profile'
					size={55}
					icon={<UserOutlined />}
					src={isLoading ? '' : user.src}
				/>
				<Space
					align='center'
					size={0}
					direction='vertical'
					style={{ fontSize: '14px', color: '#fff' }}
				>
					<p style={{ lineHeight: '0px' }} id='avatar-username'>
						{isLoading ? 'username' : user.username}
					</p>
					<Button
						type='link'
						className='profile-btn'
						id='btn-profile'
						href='/profile'
						style={{ fontSize: '12px', top: '-5px' }}
					>
						Profile
					</Button>
				</Space>
			</Space>
			<Space
				size={5}
				style={{
					fontStyle: 'italic',
					fontSize: '13px',
					color: 'white',
					lineHeight: '-1px',
				}}
			>
				<Text
					style={{
						width: '180px',
						color: 'white',
						fontSize: '13px',
						fontStyle: 'italic',
					}}
					ellipsis={{ rows: 1 }}
				>
					{headline}
				</Text>
				<Button
					type='text'
					style={{
						position: 'absolute',
						right: 0,
						color: 'white',
						fontSize: '10px',
					}}
					onClick={showModal}
				>
					Change
				</Button>
				<Modal
					title='Change Headline Status'
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={[
						<Button
							key='submit'
							type='primary'
							/*{loading={loading}}*/ onClick={handleOk}
						>
							Change
						</Button>,
						<Button key='back' onClick={handleCancel}>
							Cancel
						</Button>,
					]}
				>
					<TextArea
						rows={1}
						placeholder='Headline Status'
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
				</Modal>
			</Space>
		</Space>
	);
}

export default DisplayAvatar;
