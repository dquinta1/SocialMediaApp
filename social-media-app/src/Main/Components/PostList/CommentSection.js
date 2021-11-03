import React from 'react';
import { Collapse, Comment, Avatar, Form, Button, List, Input } from 'antd';

const { Panel } = Collapse;
const { TextArea } = Input;

const CommentSection = ({ comments, activeKey }) => {
	const AddCommentSection = ({ onChange, onSubmit, submitting, value }) => (
		<Comment
			avatar={<Avatar src='https://picsum.photos/600/600' alt='No Image' />}
			content={
				<>
					<Form.Item>
						<TextArea
							rows={4}
							onChange={() => {
								/*TODO: implement this*/
							}}
							value={() => {
								/*TODO: implement this*/
							}}
						/>
					</Form.Item>
					<Form.Item style={{textAlign:'end'}}>
						<Button
							htmlType='submit'
							// loading={submitting}
							// onClick={onSubmit}
							type='primary'
						>
							Add Comment
						</Button>
					</Form.Item>
				</>
			}
		/>
	);

	const CommentList = () => (
		<List>
			{comments.map((comment) => (
				<li>
					<Comment
						author={'Random Guy'}
						avatar={'https://picsum.photos/600/600'}
						content={comment}
					/>
				</li>
			))}
		</List>
	);

	return (
		<>
			<Collapse activeKey={[activeKey]} ghost style={{marginBottom:'-45px', marginTop:'-10px'}}>
				<Panel key='1' showArrow={false} >
                    <h4 style={{display: 'flex', justifyContent:'start', fontWeight:'bold'}}>Comments</h4>
					{comments.length > 0 && <CommentList />}
					<AddCommentSection />
				</Panel>
			</Collapse>
		</>
	);
};

export default CommentSection;
