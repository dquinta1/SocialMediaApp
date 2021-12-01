import { useState } from "react";

export default function useLogic() {
    const [criteria, setCriteria] = useState('');

	const onSearch = (value) => {
		// search only if criteria differs from previous
		// if (value !== criteria) {
		// 	// revert back filtering to show all posts
		// 	if (value === '') {
		// 		console.log('posts requested from search');
		// 		requestPosts().then((result) => {
		// 			console.log('result', result);
		// 			updatePosts(result);
		// 		});
		// 	}

		// 	// if actual criteria was inserted
		// 	else {
		// 		requestPosts().then((result) => {
		// 			console.log('result', result);
		// 			updatePosts(result);
		// 			filterPosts(value);
		// 			console.log('criteria', value);
		// 		});
		// 	}
		// }
		setCriteria(value);
	};

    return {
        onSearch
    }
}