class Check {
    constructor(name,) {
    }
}

class Customer {
    constructor(ffid, fileEntry, fieldsConfig) {
        this.ffid = ffid;
        this.fileEntry = fileEntry;
        this.fieldsConfig = fieldsConfig;
        this.selected = false;
        this.checking = false;
        this.processing = false;
        this.checkReport = undefined;
        this.processReport = undefined;
    }

    get(field) {
        if (!field) return undefined;
        const val = this.fileEntry[field];
        return val && val.trim() ? val.trim() : undefined;
    }

    split(val) {
        return val ? val.split(",") : [];
    }

    get tableRow() {
        const row = {}
        row._id = this.ffid;
        Object.entries(this.fileEntry).forEach((key, val) => row['f_' + key] = val)
        Object.entries(this.fieldsConfig).forEach((key, val) => row['f_' + key] = this.get(key))
        return row;
    }
}
