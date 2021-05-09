import {World, IWorldOptions} from '@cucumber/cucumber';
import {CustomParameters, defaults} from './CustomParameters';
import {merge} from 'lodash';

export class CustomWorld extends World {
    readonly parameters: CustomParameters;

    constructor(options: IWorldOptions) {
        super(options);
        this.parameters = CustomWorld.mixinParameters(options.parameters);
    }

    private static mixinParameters(userDefined: CustomParameters): CustomParameters {
        return merge({}, defaults, userDefined);
    }
}