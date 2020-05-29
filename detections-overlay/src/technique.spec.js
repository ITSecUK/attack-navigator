/* eslint-env node, mocha */
const assert = require('assert');
const Technique = require('./technique');

describe('Test Techniques', () => {
    it('Should instantiate a technique and print nice JSON', () => {
        const x = new Technique().write();
        assert.equal(x.substr(0, 10), '{"score":0');
    });
    it('Should instantiate a technique with args', () => {
        const x = JSON.parse(new Technique({
            score: 100,
            techniqueID: 'T100',
            source: 'IDS',
            detectionTechniques: [
                { name: 'My Great Detection', value: '80' },
            ],
            alerts: 500,
            detections: 4,
            missedDetections: 2,
            openTickets: 1,
            closedTickets: 1,
        }).write());
        assert.equal(x.score, 100);
    });
    it('Should include the source when desired', () => {
        const x = JSON.parse(new Technique({
            source: 'IDS',
            detectionTechniques: [
                { name: 'My Great Detection', value: '80' },
            ],
        }).write(true));
        assert.equal(x.metadata[0].name, 'IDS: My Great Detection');
    });
    it('Should not include the source by default', () => {
        const x = JSON.parse(new Technique({
            source: 'IDS',
            detectionTechniques: [
                { name: 'My Great Detection', value: '80' },
            ],
        }).write());
        assert.equal(x.metadata[0].name, 'My Great Detection');
    });
});
