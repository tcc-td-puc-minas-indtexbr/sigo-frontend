import React from "react";

type SpinnerProps = {
  color?: string;
  size?: "" | "sm";
};

export function Spinner({ color = "text-primary", size = "" }: SpinnerProps) {
  const getSize = (size: string) => (size !== "" ? `spinner-border-${size}` : size);

  return (
    <div className={`spinner-border ${getSize(size)} ${color}`} role="status">
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
