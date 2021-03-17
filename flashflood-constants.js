const ORG_ADMIN_API = "org-admin/v1"
const TENANT_MGT_API = "tenant-management/v1"
const ROUTING_MGT_API = "routing-management/v1"
const CORES =  {
    "preprod": [
        {
            name: "LOS",
            backendInstanceIds: {
                uat: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce",
                prod: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce"
            }
        },
        {
            name: "POS",
            backendInstanceIds: {
                uat: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce",
                prod: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce"
            }
        },
        {
            name: "MLZ",
            backendInstanceIds: {
                uat: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce",
                prod: "acc5e3c6-223f-49c1-9f0b-2635dc3fddce"
            }
        },
    ],
        "prod": [
        {
            name: "LOS",
            backendInstanceIds: {
                uat: "d18271b6-a698-4603-91b6-133aaca0550c",
                prod: "09bd0356-a047-4b89-9366-a36274d62d0a"
            }
        },
        {
            name: "POS",
            backendInstanceIds: {
                uat: "c4cf3c66-3ae1-47be-b70a-7c901f41f17e",
                prod: "edf3cf08-9cc0-4ed2-9cad-d128a996610a"
            }
        },
        {
            name: "MLZ",
            backendInstanceIds: {
                uat: "97366e9a-f270-4736-ac3c-98befe73c893",
                prod: "4bf5147a-e88a-4cc5-8465-0c2762c8b2f5"
            }
        },
    ]
}
