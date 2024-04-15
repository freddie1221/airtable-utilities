let ic = input.config()

// pass in to the automation a list of the relevant child records
let childRecords = ic.childRecords

// pass in to the automation the parent record 
let parentRecord = ic.parentRecord

let parentTable = "table name"
let childTable = "table name"

// the name of the relevant link record field on the parent
let parentFieldName = "field name"

// create a sorted array of the child records
let children = await base.getTable(childTable).selectRecordsAsync(
    {
        recordIds: childRecords,
        sorts: [
            {field: "Created", direction: "asc"}
        ]
    }
)

// insert sorted array into relevant field on parent
base.getTable(parentTable).updateRecordAsync(ic.parentRecord,
    {
        parentFieldName : children.recordIds.map(value => ({ id: value }))
    }
)
