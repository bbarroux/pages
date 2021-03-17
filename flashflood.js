class Check {
    constructor(name,) {
    }
}

class Customer {
    constructor(ffid, fileEntry) {
        this.index = ffid;
        this.fileEntry = fileEntry;
        this.selected = false;
        this.checking = false;
        this.processing = false;
        this.checkReport = undefined;
        this.processReport = undefined;
    }

    getField(field) {
        if (!field) return undefined;
        const val = this.fileEntry[field];
        return val && val.trim() ? val.trim() : undefined;
    }

    split(val) {
        return val ? val.split(",") : [];
    }
}
