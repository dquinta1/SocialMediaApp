import { message } from 'antd';
import { useEffect } from 'react';

export default function useStatusMessages(
	status,
	loadingMsg,
	errorMsg,
	successMsg
) {
	return useEffect(() => {
		switch (status) {
			case 'loading':
				message.loading(loadingMsg);
				break;
			case 'error':
				message.error(errorMsg);
				break;
			case 'success':
				message.success(successMsg);
				break;
			default:
				break;
		}
	}, [status]);
}
