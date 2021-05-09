import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../CustomWorld';
import { checkManually } from './checkManually';

Given('parameters {int} and {int} are provided', function (this: CustomWorld, int: number, int2: number) {
    this.parameters.number1 = int;
    this.parameters.number2 = int2;
});
       
When('I sum them', function (this: CustomWorld) {
    this.parameters.result = (this.parameters.number1 as number) + (this.parameters.number2 as number);
});
       
Then('the result I see is {int}', async function (this: CustomWorld, int: number) {
    expect(this.parameters.result).to.eq(int);
});

Then('the result I get is {int}', {timeout: -1}, async function (this: CustomWorld) {
    await checkManually(this);
});
