import React from 'react';

const component = ({ onChange, options }) => {
    return (
        <div>
            <h2>Options</h2>
            <div className="options">
                <div>
                    <input type="checkbox" checked={options.smallerPortraits} />
                    <label>Smaller Portraits</label>
                </div>

                <div>
                    <input type="checkbox" checked={options.disabledPortraits} />
                    <label>Disable Portraits</label>
                </div>

                <div>
                    <input type="checkbox" checked={options.keepBlackBars} />
                    <label>Keep Black Bars</label>
                </div>
            </div>
        </div>
    );
};

export default component;
