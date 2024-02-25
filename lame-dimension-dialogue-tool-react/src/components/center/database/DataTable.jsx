export default ({ template, categoryItemData: entry }) => {
    const updateField = (index, fieldName, fieldValue) => {
        let copy = [...entries];
        let rowCopy = { ...entries[index] };
        rowCopy[fieldName] = fieldValue;
        if (fieldName === 'name') {
            rowCopy['id'] = fieldValue.toLowerCase().replace(/\s/g, '_');
        }
        copy[index] = rowCopy;
        setEntries(copy);
    };

    if (!entry) {
        return null;
    }

    return (
        <>
            <h2>{entry.name}</h2>
            <table>
                <tbody>
                    {template.map(({ header, key, type }) => (
                        <tr>
                            <td>
                                {header}
                            </td>
                            <td>
                                <input
                                    onChange={({ target: { value } }) => {
                                        updateField(index, key, value);
                                    }}
                                    type={type}
                                    value={entry[key]}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
