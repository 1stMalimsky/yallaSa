import { Fragment } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const RegisterFieldComponent = ({ input, required, value, id, onChange }) => {
  return (
    <Fragment>
      <TextField
        required={required}
        fullWidth
        id={id}
        label={input}
        value={value}
        onChange={onChange}
      />
    </Fragment>
  );
};

RegisterFieldComponent.propTypes = {
  input: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string,
  onChange: PropTypes.func,
};

export default RegisterFieldComponent;
