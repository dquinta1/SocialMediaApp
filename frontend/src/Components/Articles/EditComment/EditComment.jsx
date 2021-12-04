import React from 'react';
import { Form, Space, Avatar, Button, Comment, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useLogic from './useLogic';

const { TextArea } = Input;

export default function EditComment(props) {
	const { text, submitting, setText, onSubmit, onCancel } = useLogic(props);

	return (
		<Comment
			style={{ textAlign: 'start' }}
			key={props.comment._id}
			author={props.comment.author}
			datetime={props.comment.date}
			avatar={<Avatar src={props.comment.avatar} icon={<UserOutlined />} />}
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
					<Form.Item style={{ textAlign: 'end' }}>
						<Space>
							<Button loading={submitting} onClick={onSubmit} type='primary'>
								Update
							</Button>
							<Button onClick={onCancel} type='danger'>
								Cancel
							</Button>
						</Space>
					</Form.Item>
				</Form>
			}
		/>
	);
}
