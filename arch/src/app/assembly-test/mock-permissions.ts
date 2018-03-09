export const MockPermissions = [{
    userID: "2201500",
    departmentName: "ML00001",
    hostname: "HMRCDEV",
    locationAddress: "Cardiff",
    userRoles: ["ITMP TFC Processing officer"],
    organisationUnitID: "2201500",
    userDisplayName: "ITMP TFC Processing officer",
    modules: [
        {
            name: "Individual Summary",
            path: "individual-summary",
            code: "summary",
            component: "FeatureComponent",
            data: {
                title: "Individual Summary"
            },
		    children: [
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: ":NINO/summary"
                },
                {
                    path: ":NINO/summary",
                    component: "SummaryComponent",
                    data: {
                        title: "Summary",
                        hidden: "",
                        actions: ["edit", "save", "cancel"]
                    }
                },
                {
                    path: ":NINO/address",
                    component: "AddressComponent",
                    data: {
                        title: "Address",
                        hidden: "",
                        actions: ["edit", "save", "cancel"]
                    }
                },
                {
                    path: ":NINO/editAddress",
                    component: "EditAddressComponent",
                    data: {
                        title: "Edit Address",
                        hidden: "true",
                        actions: ["edit"]
                    }
                },
                {
                    path: "relationships-summary",
                    component: "RelationshipsSummaryComponent",
                    data: {
                        title: "Relationships Summary",
                        hidden: "true",
                        actions: ["edit"]
                    }
                }
            ]
        }
    ]
}
]