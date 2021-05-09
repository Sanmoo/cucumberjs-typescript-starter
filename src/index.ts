import {setDefaultTimeout, setWorldConstructor} from '@cucumber/cucumber';
import {CustomWorld} from './CustomWorld';

setWorldConstructor(CustomWorld);
setDefaultTimeout(10000);