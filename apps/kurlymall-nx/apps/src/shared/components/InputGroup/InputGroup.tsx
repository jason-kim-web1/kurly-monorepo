import { isPC } from '../../../../util/window/getDevice';
import MobileInputGroup from './m/InputGroup';
import PcInputGroup from './pc/InputGroup';

export default isPC ? PcInputGroup : MobileInputGroup;
