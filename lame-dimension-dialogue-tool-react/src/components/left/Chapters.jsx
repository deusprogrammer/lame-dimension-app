import React, { useEffect, useRef } from 'react';

const component = ({
    chapters,
    selectedChapter,
    onChapterSelect,
    onChapterRemove,
    onChapterCreate,
}) => {
    const selectedHook = useRef(null);
    if (!chapters) {
        return <div className="chapters"></div>;
    }

    useEffect(() => {
        if (selectedHook.current) {
            selectedHook.current.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedChapter]);

    return (
        <div className="chapters">
            <h2>Chapters</h2>
            <div className="scrolling">
                <table>
                    <tbody>
                        {Object.keys(chapters).map((chapterName) => (
                            <tr
                                key={chapterName}
                                ref={
                                    chapterName === selectedChapter
                                        ? selectedHook
                                        : null
                                }
                            >
                                <td className={`selectable ${
                                    selectedChapter === chapterName ? 'selected' : null
                                }`} onClick={() => {
                                    onChapterSelect(chapterName);
                                }}>{chapterName}</td>
                                <td className='delete-button' onClick={() => {
                                    onChapterRemove(chapterName);
                                }}>X</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={onChapterCreate}>Add Chapter</button>
            </div>
        </div>
    );
};

export default component;
