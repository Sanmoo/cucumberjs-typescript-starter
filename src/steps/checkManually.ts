import { start, get } from 'prompt';
import { CustomWorld } from '../CustomWorld';
import { assert } from 'chai';

export const checkManually = async (world: CustomWorld): Promise<void> => {
    start();
    console.log('Please check manually. Did it pass? (y/n)');
    const { passed } = await get([{
        properties: {
            passed: {
                pattern: /^[yn]$/,
                message: 'Just y/n please',
                required: true
            }
        }
    }]);

    if (passed === 'n') {
        assert.fail('User confirmed the verification failed');
    }

    world.log('User confirmed the verification passed');
};