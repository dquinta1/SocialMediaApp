import Axios from 'axios';

export default Axios.create({
	baseURL: 'https://daq2-social-media-app-server.herokuapp.com/',
	withCredentials: true,
});
