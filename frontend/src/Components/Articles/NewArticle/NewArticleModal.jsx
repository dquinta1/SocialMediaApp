import { Button, Modal, Input, Upload } from 'antd';
import { PlusOutlined, FileImageOutlined } from '@ant-design/icons';
import useLogic from './useLogic';

const { TextArea } = Input;

function NewArticleModal() {
	const {
		isModalVisible,
		title,
		description,
		config,
		setTitle,
		setDescription,
		showModal,
		handleOk,
		handleCancel,
	} = useLogic();

	return (
		<>
			<Button
				className='new-post'
				size='large'
				type='dashed'
				icon={<PlusOutlined />}
				onClick={showModal}
				style={{ color: 'gray', backgroundColor: 'transparent' }}
				block
			>
				New Post...
			</Button>
			<Modal
				title={title}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<div style={{ display: 'flex', justifyContent: 'end' }}>
						<Upload {...config}>
							<Button type='link' size='middle' icon={<FileImageOutlined />} />
						</Upload>
						<Button
							key='submit'
							type='primary'
							onClick={handleOk}
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
					id='new-post-modal-textArea-title'
					rows={1}
					placeholder='Title'
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<TextArea
					id='new-post-modal-textArea-description'
					rows={4}
					placeholder='Description...'
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</Modal>
		</>
	);
}

export default NewArticleModal;
