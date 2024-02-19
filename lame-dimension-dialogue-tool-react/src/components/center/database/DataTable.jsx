import { useState } from "react"

export default ({title, template, initialData}) => {
    const [entries, setEntries] = useState(initialData);

    const addNewRow = () => {
        let newRow = {};
        template.forEach(({key, defaultValue}) => {
            newRow[key] = defaultValue;
        });
        newRow.id = newRow.name.toLowerCase().replace(/\s/g, "_");

        setEntries((oldRows) => {
           return [
                ...oldRows, newRow
            ];
        });
    }

    const updateField = (index, fieldName, fieldValue) => {
        let copy = [...entries];
        let rowCopy = {...entries[index]};
        rowCopy[fieldName] = fieldValue;
        if (fieldName === 'name') {
            rowCopy['id'] = fieldValue.toLowerCase().replace(/\s/g, "_");
        }
        copy[index] = rowCopy;
        setEntries(copy);
    }

    return (
        <>
            <h2>{title}</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th style={{width: "25%"}}>ID</th>
                        { template.map(({header}) => 
                            <th>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => 
                        <tr>
                            <td>{entry.id}</td>
                            {template.map(({key, type}) => 
                                <td>
                                    <input onChange={({target: {value}}) => {updateField(index, key, value)}} type={type} value={entry[key]}/>
                                </td>
                            )}
                        </tr>
                    )}
                    <tr>
                        <td colSpan={9}><button type='button' onClick={addNewRow}>Add New</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}