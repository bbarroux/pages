const ORG_ADMIN_API = "org-admin/v1"
const TENANT_MGT_API = "tenant-management/v1"
const ROUTING_MGT_API = "routing-management/v1"

const ALL_CORES = {
    preprod: {
        LOS: {uat: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce", prod: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce"},
        POS: {uat: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce", prod: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce"},
        MLZ: {uat: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce", prod: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce"},
    }
    ,
    prod: {
        LOS: {uat: "d18271b6-a698-4603-91b6-133aaca0550c", prod: "09bd0356-a047-4b89-9366-a36274d62d0a"},
        POS: {uat: "c4cf3c66-3ae1-47be-b70a-7c901f41f17e", prod: "edf3cf08-9cc0-4ed2-9cad-d128a996610a"},
        MLZ: {uat: "97366e9a-f270-4736-ac3c-98befe73c893", prod: "4bf5147a-e88a-4cc5-8465-0c2762c8b2f5"},
    }
}

const FFICAAS = {prod: "https://be.fficaas.net", preprod: "https://go.fficaas.net"}
const ENV = window.location.host.replace(/\..*/g, "")
const CORES = ALL_CORES[ENV];
FFAL.server = FFICAAS[ENV];


