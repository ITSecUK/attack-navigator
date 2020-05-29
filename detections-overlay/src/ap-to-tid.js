/* eslint-disable prefer-destructuring */
// update list of attack patterns to get the corresponding Technique ID
const fetch = require('node-fetch');
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'att', type: String, multiple: false },
    { name: 'src', type: String, multiple: false },
];
let options;


// download attack patterns if not available on input
async function getAttack() {
    const x = await fetch('https://raw.githubusercontent.com/mitre/cti/subtechniques/enterprise-attack/enterprise-attack.json');
    return x.json();
}

function extractIDMappings(mitre) {
    const dict = {};
    mitre.objects.filter((ob) => {
        if (ob.type === 'attack-pattern') {
            return true;
        }
        return false;
    }).forEach((ob) => {
        dict[ob.id] = ob.external_references.filter((ref) => {
            if (!('external_id' in ref)) {
                return false;
            }
            return true;
        }).map((ref) => ref.external_id)[0];
    });
    return dict;
}

async function main() {
    let source;

    if (!options.src) {
        // eslint-disable-next-line no-console
        console.log('No input provided, please use --src to specify an input file');
        process.exit(1);
    } else {
        source = JSON.parse(fs.readFileSync(options.src, 'utf-8'));
    }

    let enterpriseAttack;

    if (!options.att) {
        console.log('No attack file provided, going to download from github...');
        try {
            enterpriseAttack = await getAttack();
        } catch (error) {
            console.log(error);
            // eslint-disable-next-line no-console
            console.log('unable to get enterprise attack locally with --att or via http');
            process.exit(1);
        }
    }

    // here we have the file with the attack-references
    // and the current attack STIX
    // console.log(enterpriseAttack);
    const eADict = extractIDMappings(enterpriseAttack);
    let sourceArray;
    // console.log(source);
    if (Array.isArray(source)) {
        // source is just an array of elements
        sourceArray = source;
    } else if (Array.isArray(source.mappings)) {
        sourceArray = source.mappings;
    }

    const output = sourceArray.map((ob) => {
        // eslint-disable-next-line no-param-reassign
        ob.techniqueID = eADict[ob['attack-id']];
        return ob;
    });
    console.log(output);
}

module.exports = {
    extractIDMappings,
};

if (typeof require !== 'undefined' && require.main === module) {
    options = commandLineArgs(optionDefinitions);
    main();
}



