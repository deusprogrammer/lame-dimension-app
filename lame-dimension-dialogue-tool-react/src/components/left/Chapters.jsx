import React from 'react';

const component = ({
    chapters,
    selectedChapter,
    onChapterSelect,
    onCreateChapter,
}) => {
    if (!chapters) {
        return <div className="chapters"></div>;
    }

    return (
        <div className="chapters">
            <h2>Chapters</h2>
            <div className="scrolling">
                {Object.keys(chapters).map((chapterName) => (
                    <div
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
