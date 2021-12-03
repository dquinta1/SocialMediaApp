import { Comment, Avatar, Form, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { profileKeys } from '../../../Hooks/Profile/profile-keys-factory';
import useLogic from './useLogic';

const { TextArea } = Input;

export default function AddCommentSection({ pid }) {
	const queryClient = useQueryClient();
	const { text, submitting, setText, onSubmit } = useLogic(pid);

	return (
		<Comment
			avatar={
				<Avatar
					src={queryClient.getQueryData(profileKeys.profile).avatar}
					icon={<UserOutlined />}
				/>
			}
			content={
				<Form>
					<Form.Item>
						<TextArea
							rows={4}
							value={text}
							onChange={(e) => {
								setText(e.target.value);
							}}
						/>
					</Form.Item>
					<Form.Item key={pid + 1} style={{ textAlign: 'end' }}>
						<Button loading={submitting} onClick={onSubmit} type='primary'>
							Add Comment
						</Button>
					</Form.Item>
				</Form>
			}
		/>
	);
}
