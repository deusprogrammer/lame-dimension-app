export default ({
    language,
    defaultLanguage,
    category,
    categoryItemData: entry,
    onUpdate
}) => {
    const { template, nameField } = category;

    const updateField = (fieldName, fieldValue, index) => {
        let copy = {...entry};
        let field = category.template.find(({key}) => key === fieldName);
        if (!index) {
            if (field.localized) {
                copy[fieldName][language] = fieldValue;
            } else {
                copy[fieldName] = fieldValue;
            }
        } else {
            if (field.localized) {
                copy[fieldName][language][index] = fieldValue;
            } else {
                copy[fieldName][index] = fieldValue;
            }
        }
        onUpdate(copy);
    };

    // TODO Populate for all languages
    const addElementToField = (fieldName) => {
        let copy = {...entry};
        let valueToPush;
        let field = category.template.find(({key}) => key === fieldName);
        switch(field?.dataType) {
            case 'text':
                valueToPush = '';
                break;
            case 'number':
                valueToPush = 0;
                break;
            case 'checkbox':
                valueToPush = false;
                break;
        }
        if (field?.localized) {
            copy[fieldName][language].push(valueToPush);
        } else {
            copy[fieldName].push(valueToPush);
        }
        onUpdate(copy);
    }

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
                                ? (entry?.[key]?.[language] ?? [])
                                : entry?.[key] ?? [];
                            return (
                                <tbody className="grouped">
                                    {collection.map((collectionEntry, index) => {
                                        let translation = entry?.[key]?.[defaultLanguage]?.[index] ?? '';
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
                                                                key,
                                                                value,
                                                                index
                                                            );
                                                        }}
                                                        type={dataType}
                                                        value={collectionEntry}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type={dataType}
                                                        value={localized ? translation : null}
                                                        disabled
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td colSpan={3}>
                                            <button type="button" onClick={() => {addElementToField(key)}}>
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
                                                updateField(key, value);
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
                                                    ? entry[key][defaultLanguage]
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
