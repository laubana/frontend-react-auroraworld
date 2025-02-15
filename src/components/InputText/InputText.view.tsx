import { TextField } from "@mui/material";
import React, { ChangeEvent, JSX } from "react";

import { InputTextProps } from "./InputText.props";

const InputTextComponent = ({
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
      label={label}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      error={error ? true : false}
      helperText={error}
    />
  );
};

export default React.memo(InputTextComponent);
