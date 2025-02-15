import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, JSX } from "react";

import { InputTextProps } from "./InputPassword.props";

const InputPasswordComponent = ({
  label,
  placeholder,
  text,
  setText = () => null,
  error,
}: InputTextProps): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <TextField
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="start"></InputAdornment>,
        },
      }}
      label={label}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      error={error ? true : false}
      helperText={error}
    />
  );
};

export default React.memo(InputPasswordComponent);
