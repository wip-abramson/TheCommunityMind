import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

global.shallow = Enzyme.shallow;
global.mount = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });