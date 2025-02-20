import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, JSX, useState } from "react";

import { InputTextProps } from "./InputPassword.props";

const InputPasswordComponent = ({
  label,
  placeholder,
  text,
  setText = () => null,
  error,
}: InputTextProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleToogle = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <TextField
      type={isVisible ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" onClick={handleToogle}>
              {isVisible ? <Visibility /> : <VisibilityOff />}
            </InputAdornment>
          ),
        },
      }}
      error={error ? true : false}
      helperText={error}
    />
  );
};

export default React.memo(InputPasswordComponent);
