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
        return this.getField(this.fieldsConfig.skip)
    }

    get orgId() {
        return this.getField(this.fieldsConfig.orgId)
    }

    get orgName() {
        return this.getField(this.fieldsConfig.orgName)
    }

    get uatTenantId() {
        return this.getField(this.fieldsConfig.uatTenantId)
    }

    get prodTenantId() {
        return this.getField(this.fieldsConfig.prodTenantId)
    }

    get users() {
        return this.split(this.getField(this.fieldsConfig.emails))
    }

    get products() {
        return this.split(this.getField(this.fieldsConfig.coreProducts))
    }
}
