import React from "react";

type SpinnerProps = {
  color?: string;
  size?: "" | "sm";
  align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
};

export function Spinner({ color = "text-primary", size = "", align = "center" }: SpinnerProps) {
  const getSize = (size: string) => (size !== "" ? `spinner-border-${size}` : size);

  return (
    <div style={{ textAlign: align }}>
      <div className={`spinner-border ${getSize(size)} ${color}`} role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
}
