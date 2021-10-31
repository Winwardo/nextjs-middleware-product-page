import React from "react";

export function Box({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={"shadow-lg rounded-lg p-6 border border-gray-100 " + className}
    >
      {children}
    </section>
  );
}
