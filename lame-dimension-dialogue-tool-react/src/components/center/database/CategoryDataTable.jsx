export default ({
    language,
    defaultLanguage,
    category,
}) => {
    return (
        <>
            <input style={{fontSize: '1.5rem'}} type="text" value={category.title[language]} /><br />
            <input style={{fontSize: '1.5rem', marginBottom: '10px'}} type="text" value={category.title[defaultLanguage]} disabled />
            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Label</th>
                        <th>Collection Type</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Localized</th>
                    </tr>
                </thead>
                <tbody>
                    { category.template.map(({key, label, dataType, localized, collectionType, defaultValue}) => (
                        <tr>
                            <td><input type='text' value={key}/></td>
                            <td><input type='text' value={label}/></td>
                            <td>
                                <select value={collectionType}>
                                    <option>none</option>
                                    <option>array</option>
                                </select>
                            </td>
                            <td>
                                <select value={dataType}>
                                    <option>text</option>
                                    <option>number</option>
                                    <option>boolean</option>
                                </select>
                            </td>
                            <td><input type='checkbox' checked={localized} /></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={6}><button>Add Field</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
