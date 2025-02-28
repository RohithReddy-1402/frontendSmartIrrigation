import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const PumpControl = ({ isActive, onToggle }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isActive}
                    onChange={onToggle}
                    name="Pump"
                    color="primary"
                />
            }
            label={isActive ? "Pump On" : "Pump Off"}
        />
    );
};

export default PumpControl; 