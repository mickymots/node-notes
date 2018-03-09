export const MockModules = [
    {
        code: "ind",
        icon: "./assets/images/icons/dashboard-icon.png",
        moduleType: 1,
        name: "Individual Summary",
        path: "individual-summary",
        routes: [
            {
                component: "FeatureComponent",
                path: "individual-summary",
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
                            title: "Summary"
                        }
                    },
                    {
                        path: ":NINO/address",
                        component: "AddressComponent",
                        data: {
                            title: "Address"
                        }
                    },
                    {
                        path: "relationships-summary",
                        component: "RelationshipsSummaryComponent",
                        data: {
                            title: "Relationships Summary"
                        }
                    }
                ]
            }
        ]
    },
    {
        code: "cs",
        icon: "./assets/images/icons/dashboard-icon.png",
        moduleType: 0,
        name: "Childcare Services",
        path: "childcare-services",
        routes: [
            {
                component: "FeatureComponent",
                path: "childcare-services",
                data: {
                    title: "Childcare Services"
                },
                children: [
                    {
                        path: "",
                        pathMatch: "full",
                        redirectTo: "demo"
                    },
		            {
                        path: "current-child-application-details",
                        component: "CurrentChildClaimDetailsComponent",
                        data: {
                            title: "Current Child Application Details"
                        }
                    },
		            {
                        path: "child-verification",
                        component: "ChildVerificationComponent",
                        data: {
                            title: "Child Verification"
                        }
                    },
		            {
                        path: "historic-child-application-details",
                        component: "HistoricChildApplicationDetailsComponent",
                        data: {
                            title: "Historic Child Application Details"
                        }
                    }
                ]
            }
        ]
    }
]