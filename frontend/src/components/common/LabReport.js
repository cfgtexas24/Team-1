import React from 'react';

const LabReport = (props) => {
    const lab = props.lab;
    console.log(lab);

    return (
        <div className='bg-white p-4 rounded-lg flex flex-col'>
            {Object.entries(lab).map(([key, value]) => (
                <span key={key}>
                    <b>{key}: </b> {typeof value === 'boolean' ? value.toString() : value}
                </span>
            ))}
        </div>
    );
};

export default LabReport;
