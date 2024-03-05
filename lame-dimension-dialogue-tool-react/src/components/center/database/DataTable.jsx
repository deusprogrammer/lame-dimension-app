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
            <table className="data-table">
                {template.map(
                    ({ label, key, dataType, collectionType, localized }) => {
                        if (collectionType === 'array') {
                            let collection = localized
                                ? entry[key][defaultLanguage]
                                : entry[key];
                            return (
                                <tbody className="grouped">
                                    {collection.map((entry, index) => {
                                        return (
                                            <tr>
                                                <td>{`${label} ${
                                                    index + 1
                                                }`}</td>
                                                <td>
                                                    <input
                                                        onChange={({
                                                            target: { value },
                                                        }) => {
                                                            updateField(
                                                                index,
                                                                key,
                                                                value
                                                            );
                                                        }}
                                                        type={dataType}
                                                        value={entry}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type={dataType}
                                                        value={entry}
                                                        disabled
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td colSpan={3}>
                                            <button type="button">
                                                Add Element
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        }

                        return (
                            <tbody>
                                <tr>
                                    <td>{label}</td>
                                    <td>
                                        <input
                                            onChange={({
                                                target: { value },
                                            }) => {
                                                updateField(index, key, value);
                                            }}
                                            type={dataType}
                                            value={
                                                localized
                                                    ? entry[key][language]
                                                    : entry[key]
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type={dataType}
                                            value={
                                                localized
                                                    ? entry[key][
                                                          defaultLanguage
                                                      ]
                                                    : null
                                            }
                                            disabled
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    }
                )}
            </table>
        </>
    );
};
