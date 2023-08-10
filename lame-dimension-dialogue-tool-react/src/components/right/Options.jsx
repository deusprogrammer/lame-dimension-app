import React from 'react';

const component = ({ onChange }) => {
    return (
        <div>
            <h2>Options</h2>
            <div className="options">
                <div>
                    <input type="checkbox" />
                    <label>Smaller Portraits</label>
                </div>

                <div>
                    <input type="checkbox" />
                    <label>Disable Portraits</label>
                </div>

                <div>
                    <input type="checkbox" />
                    <label>Keep Black Bars</label>
                </div>
            </div>
        </div>
    );
};

export default component;
