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

    getField(field) {
        if (!field) return undefined;
        const val = this.fileEntry[field];
        return val && val.trim() ? val.trim() : undefined;
    }

    split(val) {
        return val ? val.split(",") : [];
    }

    get skip() {
        this.getField(this.fieldsConfig.skip)
    }

    get orgId() {
        this.getField(this.fieldsConfig.orgId)
    }

    get orgName() {
        console.log("getting orgName from "+this.fieldsConfig.orgName)
        this.getField(this.fieldsConfig.orgName)
    }

    get uatTenantId() {
        this.getField(this.fieldsConfig.uatTenantId)
    }

    get prodTenantId() {
        this.getField(this.fieldsConfig.prodTenantId)
    }

    get users() {
        this.split(this.getField(this.fieldsConfig.emails))
    }

    get products() {
        this.split(this.getField(this.fieldsConfig.coreProducts))
    }
}
