export const MockResponse = {
    
        "userID": "2201500",
        "userDisplayName": "ITMP TFC Processing officer",
        "hostname": "HMRCDEV",
        "departmentName": "ML00001",
        "locationAddress": "Cardiff",
        "organisationUnitID": "2201500",
        "optimisedRole": "ITMP TFC Processing officer",
        "userRoles": ["ITMP TFC Processing officer"],
        "userSBARoles": [],
        "userModules": ["Individual Summary", "Childcare Services", "Consolidated Customer View"],
        "userWindows": [],
        "userResources": [{
            "moduleName": "Individual Summary",
            "path": ":NINO/summary",
            "component": "SummaryComponent",
            "data": {
                "title": "Summary",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Individual Summary",
            "path": ":NINO/address",
            "component": "AddressComponent",
            "data": {
                "title": "Address",
                "hidden": "",
                "actions": ["edit"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "current-child-application-details",
            "component": "CurrentChildClaimDetailsComponent",
            "data": {
                "title": "Current Child Application Details",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Individual Summary",
            "path": ":NINO/editAddress",
            "component": "EditAddressComponent",
            "data": {
                "title": "Edit Address",
                "hidden": "true",
                "actions": ["edit"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "child-verification",
            "component": "ChildVerificationComponent",
            "data": {
                "title": "Child Verification",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Consolidated Customer View",
            "path": "ccv-home",
            "component": "ConsolidatedCustomerViewComponent",
            "data": {
                "title": "Consolidated Customer View",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Individual Summary",
            "path": "relationships-summary",
            "component": "RelationshipsSummaryComponent",
            "data": {
                "title": "Relationships Summary",
                "hidden": "",
                "actions": ["edit"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "child-verification/insert-child-verification",
            "component": "InsertChildVerificationComponent",
            "data": {
                "title": "Insert Child Verification",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Individual Summary",
            "path": "relationships-summary/insert",
            "component": "InsertRelationshipComponent",
            "data": {
                "title": "Insert Relationship",
                "hidden": "true",
                "actions": ["edit"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "historic-child-application-details",
            "component": "HistoricChildApplicationDetailsComponent",
            "data": {
                "title": "Historic Child Application Details",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "historic-application-overview",
            "component": "HistoricApplicationOverviewComponent",
            "data": {
                "title": "Historic Application Overview",
                "hidden": "true",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "applicant-messaging",
            "component": "ApplicantMessagingComponent",
            "data": {
                "title": "Applicant Messaging",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }, {
            "moduleName": "Childcare Services",
            "path": "eligibility-results",
            "component": "EligibilityResultsComponent",
            "data": {
                "title": "Eligibility Results",
                "hidden": "",
                "actions": ["edit", "save", "cancel"]
            }
        }],
        "userDDASetting": []
 
}