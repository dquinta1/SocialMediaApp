import { Space, Avatar, Button, Typography, Modal, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../Hooks/Profile/useProfile';
import useDisAvatar from './useDisAvatar';

const { Text } = Typography;
const { TextArea } = Input;

function DisplayAvatar() {
	const navigate = useNavigate();
	const { data, status, error } = useProfile();
	const { isModalVisible, input, setInput, showModal, handleOk, handleCancel } =
		useDisAvatar();

	switch (status) {
		case 'loading':
			return <div>Loading...</div> // TODO: fix this
		case 'error':
			return <div>{error.message}</div> // TODO: fix this
		case 'success':
			return (
				<Space direction='vertical' style={{ paddingTop: '8px' }}>
					<Space size={25}>
						<Avatar
							className='avatar'
							id='avatar-profile'
							size={55}
							icon={<UserOutlined />}
							src={data.avatar}
						/>
						<Space
							align='center'
							size={0}
							direction='vertical'
							style={{ fontSize: '14px', color: '#fff' }}
						>
							<p style={{ lineHeight: '0px' }} id='avatar-username'>
								{data.username}
							</p>
							<Button
								type='link'
								className='profile-btn'
								id='btn-profile'
								onClick={() => navigate('/profile')}
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
							{data.headline}
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
		default: 
			break;
	}
}

export default DisplayAvatar;
