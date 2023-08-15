import React, { useEffect, useRef } from 'react';

const component = ({
    chapters,
    selectedChapter,
    onChapterSelect,
    onCreateChapter,
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
                {Object.keys(chapters).map((chapterName) => (
                    <div
                        key={chapterName}
                        ref={
                            chapterName === selectedChapter
                                ? selectedHook
                                : null
                        }
                        className={`selectable ${
                            selectedChapter === chapterName ? 'selected' : null
                        }`}
                        onClick={() => {
                            onChapterSelect(chapterName);
                        }}
                    >
                        {chapterName}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={onCreateChapter}>Add Chapter</button>
            </div>
        </div>
    );
};

export default component;
