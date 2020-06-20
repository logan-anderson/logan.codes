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
          "hover:bg-indigo-500 hover:text-white py-2 px-4 m-2 border border-indigo-500 hover:border-transparent rounded-full",
          {
            "bg-transparent text-indigo-700": !Boolean(this.props.selected),
            "bg-indigo-500 text-white": Boolean(this.props.selected),
          }
        )}
      >
        {this.props.children}
      </button>
    );
  }
}
