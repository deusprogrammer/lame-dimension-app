export default ({ template, language, defaultLanguage, categoryItemData: entry }) => {
    const updateField = (index, fieldName, fieldValue) => {
        let copy = [...entries];
        let rowCopy = { ...entries[index] };
        rowCopy[fieldName] = fieldValue;
        copy[index] = rowCopy;
        setEntries(copy);
    };

    if (!entry) {
        return null;
    }

    return (
        <>
            <h2>{entry.name[language]}</h2>
            <table>
                <tbody>
                    {template.map(({ label, key, type, localized }) => {
                        return (
                            <tr>
                                <td>{label}</td>
                                <td>
                                    <input
                                        onChange={({ target: { value } }) => {
                                            updateField(index, key, value);
                                        }}
                                        type={type}
                                        value={localized ? entry[key][language] : entry[key]}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
};
