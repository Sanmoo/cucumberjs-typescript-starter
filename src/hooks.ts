import { After, Before } from '@cucumber/cucumber';
import { CustomWorld } from './CustomWorld';

Before({tags: '@manual'}, function (this: CustomWorld) {
    const manualTesterUsername = process.env['MANUAL_TESTER_USERNAME'];
    if (manualTesterUsername == null) {
        throw new Error('You must provide MANUAL_TESTER_USERNAME environment variable in order to run manual tests.');
    }
    this.parameters.manualTesterUsername = manualTesterUsername;
    this.attach(`Tester Username: ${this.parameters.manualTesterUsername}`);
    this.attach(`Scenario Started: ${new Date().toLocaleString()}`);
});

After({tags: '@manual'}, function (this: CustomWorld) {
    this.attach(`Scenario Ended: ${new Date().toLocaleString()}`);
});