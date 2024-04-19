import React from 'react';

const BtnLoader = () => {
    return (
        <div>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default BtnLoader;