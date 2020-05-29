class Technique {
    constructor(vars) {
        this.score = (vars && vars.score) || 0;
        this.techniqueID = (vars && vars.techniqueID) || '';
        this.alerts = (vars && vars.alerts) || '0';
        this.detections = (vars && vars.detections) || '0';
        this.missedDetections = (vars && vars.missedDetections) || '0';
        this.openTickets = (vars && vars.openTickets) || '0';
        this.closedTickets = (vars && vars.closedTickets) || '0';
        this.detectionTechniques = (vars && vars.detectionTechniques) || [];
        this.source = (vars && vars.source) || undefined;
    }

    write(includeSource = false) {
        const ret = {
            score: this.score,
            techniqueID: this.techniqueID,
            metadata: [
            ],
        };

        this.detectionTechniques.forEach((dt) => {
            if (this.source && includeSource) {
                // if a source is defined and request inclusion
                // eslint-disable-next-line no-param-reassign
                dt.name = `${this.source}: ${dt.name}`;
            }
            ret.metadata.push(dt);
        });

        [
            { field: 'alerts', displayName: 'Alerts' },
            { field: 'detections', displayName: 'Detections' },
            { field: 'missedDetections', displayName: 'Missed Detections' },
            { field: 'openTickets', displayName: 'Open Tickets' },
            { field: 'closedTickets', displayName: 'Closed Tickets' },
        ].forEach((element) => ret.metadata.push(
            { name: element.displayName, value: this[element.field] },
        ));

        return JSON.stringify(ret);
    }
}

module.exports = Technique;
