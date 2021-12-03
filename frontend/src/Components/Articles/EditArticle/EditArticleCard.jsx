import { Card, Button, Input, Upload, Image } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import useLogic from './useLogic';

const { TextArea } = Input;

export default function EditArticleCard(props) {
	const {
		title,
		description,
		config,
		setTitle,
		setDescription,
		handleOk,
		handleCancel,
	} = useLogic(props);

	return (
		<Card
			hoverable
			style={{ width: '500px' }}
			cover={
				<Upload {...config}>
					<Button type='link' size={80}>
						<Image
							icon={<FileImageOutlined />}
							src={props.src}
							preview={false}
						/>
					</Button>
				</Upload>
			}
			actions={[
				<Button type='primary' onClick={handleOk}>
					Confirm Changes
				</Button>,
				<Button type='danger' color='red' onClick={handleCancel}>
					Cancel
				</Button>,
			]}
		>
			<TextArea
				rows={1}
				placeholder='Title'
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<TextArea
				rows={4}
				placeholder='Description...'
				value={description}
				onChange={(e) => {
					setDescription(e.target.value);
				}}
			/>
		</Card>
	);
}
