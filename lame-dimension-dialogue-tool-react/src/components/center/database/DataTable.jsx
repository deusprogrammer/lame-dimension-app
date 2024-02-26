export default ({
    language,
    defaultLanguage,
    category,
    categoryItemData: entry,
}) => {
    const { template, nameField } = category;

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
            <h2>{entry[nameField][language]}</h2>
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
                                        value={
                                            localized
                                                ? entry[key][language]
                                                : entry[key]
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type={type}
                                        value={
                                            localized
                                                ? entry[key][defaultLanguage]
                                                : null
                                        }
                                        disabled
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
