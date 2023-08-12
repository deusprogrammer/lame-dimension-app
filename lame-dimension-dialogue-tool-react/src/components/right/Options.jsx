import React from 'react';

const component = ({ onOptionsChange, options }) => {
    return (
        <div>
            <h2>Options</h2>
            <div className="options">
                <div>
                    <input
                        type="checkbox"
                        checked={options.smallerPortraits}
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
