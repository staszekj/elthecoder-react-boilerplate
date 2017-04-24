import renderEmailContainer from 'elContainers/emailContainer';
import initRedux from './redux/init';

const store = initRedux();
renderEmailContainer(store);

