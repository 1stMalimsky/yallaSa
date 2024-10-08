import { Fragment } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const EditCardInput = ({ input, label, required, value, onChange }) => {
    return (
        <Fragment>
            <TextField
                autoComplete={input}
                required={required}
                fullWidth
                id={input}
                label={label}
                autoFocus
                value={value}
                onChange={onChange}
            />
        </Fragment>
    );
};

EditCardInput.propTypes = {
    input: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

export default EditCardInput;