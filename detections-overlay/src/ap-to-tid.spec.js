/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-env node, mocha */
const assert = require('assert');
const ap = require('./ap-to-tid');

describe('apToID', () => {
    it('Should return an array of attackid to TID', () => {
        const mitre = {
            "type": "bundle",
            "id": "bundle--16b0b40c-d9c3-46d4-97cc-11e94143ab9c",
            "spec_version": "2.0",
            "objects": [
                {
                    "id": "attack-pattern--01df3350-ce05-4bdf-bdf8-0a919a66d4a8",
                    "type": "attack-pattern",
                    "name": ".bash_profile and .bashrc",
                    "external_references": [
                        {
                            "source_name": "mitre-attack",
                            "external_id": "T1156",
                            "url": "https://attack.mitre.org/techniques/T1156",
                        },
                        {
                            "url": "https://researchcenter.paloaltonetworks.com/2017/04/unit42-new-iotlinux-malware-targets-dvrs-forms-botnet/",
                            "description": "Claud Xiao, Cong Zheng, Yanhui Jia. (2017, April 6). New IoT/Linux Malware Targets DVRs, Forms Botnet. Retrieved February 19, 2018.",
                            "source_name": "amnesia malware"
                        },
                    ],
                },
            ],
        };
        const x = ap.extractIDMappings(mitre);
        assert.equal(x['attack-pattern--01df3350-ce05-4bdf-bdf8-0a919a66d4a8'], 'T1156');
    });
});
