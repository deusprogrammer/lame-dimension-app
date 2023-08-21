import React from 'react';

const component = ({ onOptionsChange, options, editable }) => {
    if (!options) {
        onOptionsChange({
            smallerPortraits: false,
            disabledPortraits: false,
            keepBlackBars: false,
        });

        return <></>;
    }

    return (
        <div>
            <h2>Options</h2>
            <div className="options">
                <div>
                    <input
                        type="checkbox"
                        checked={options.smallerPortraits}
                        disabled={!editable}
                        onChange={({ target: { checked } }) => {
                            onOptionsChange({
                                ...options,
                                smallerPortraits: checked,
                            });
                        }}
                    />
                    <label>Smaller Portraits</label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        checked={options.disabledPortraits}
                        disabled={!editable}
                        onChange={({ target: { checked } }) => {
                            onOptionsChange({
                                ...options,
                                disabledPortraits: checked,
                            });
                        }}
                    />
                    <label>Disable Portraits</label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        checked={options.keepBlackBars}
                        disabled={!editable}
                        onChange={({ target: { checked } }) => {
                            onOptionsChange({
                                ...options,
                                keepBlackBars: checked,
                            });
                        }}
                    />
                    <label>Keep Black Bars</label>
                </div>
            </div>
        </div>
    );
};

export default component;
