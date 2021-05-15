import { start, get } from 'prompt';
import { CustomWorld } from '../CustomWorld';
import { assert } from 'chai';
import { dir } from 'tmp-promise';
import fs from 'fs';
import util from 'util';
import path from 'path';

const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const collectYesOrNo = async (): Promise<'y' | 'n'> => {
    const { response } = await get([
        {
            properties: {
                response: {
                    pattern: /^[yn]$/,
                    message: 'Just y/n please',
                    required: true,
                },
            },
        },
    ]);

    return response as 'y' | 'n';
};

export const checkManually = async (world: CustomWorld): Promise<void> => {
    start();

    console.log('Please check manually. Did it pass? (y/n)');

    const passed = await collectYesOrNo();

    console.log(
        // eslint-disable-next-line quotes
        "Do you want to provide test evidence? If filling 'y' a temporary directory " +
            'will be created for you to copy images or gifs into.',
    );

    const collect = await collectYesOrNo();

    if (collect === 'y') {
        const tmpDir = await dir({ unsafeCleanup: true });

        console.log(
            `Please open and copy the evidence files into this directory: ${tmpDir.path}. Please confirm here once your are done.`,
        );

        await collectYesOrNo();

        const files = await readdir(tmpDir.path);
        world.log(`${files.length} file(s) is(are) going to be attached to the scenario.`);
        for (const file of files) {
            const fileBuffer = await readfile(path.join(tmpDir.path, file));
            world.attach(fileBuffer, `image/${path.extname(file).substr(1)}`);
        }
        await tmpDir.cleanup();
    }

    if (passed === 'n') {
        assert.fail('User confirmed the verification failed');
    }

    world.log('User confirmed the verification passed');
};
