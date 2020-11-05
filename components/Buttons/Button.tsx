import React from "react";
import classNames from "classnames";
interface ButtonProps {
  selected?: Boolean;
}

export default class Button extends React.Component<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
  {}
> {
  render() {
    return (
      <button
        {...this.props}
        className={classNames(
          "hover:bg-blue-500 hover:text-white py-2 px-4 m-2 border border-blue-500 hover:border-transparent rounded-full",
          {
            "bg-transparent text-blue-700": !Boolean(this.props.selected),
            "bg-blue-500 text-white": Boolean(this.props.selected),
          }
        )}
      >
        {this.props.children}
      </button>
    );
  }
}
