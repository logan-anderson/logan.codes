import classNames from "classnames";

const ToggleButton = (props: {
  active: Boolean;
  children: any;
  clickAction(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}) => {
  return (
    <button
      {...props}
      style={{
        outline: 0,
      }}
      onClick={props.clickAction}
      className={classNames(
        "py-2 px-4 m-2 border border-blue-500 rounded-full",
        {
          "bg-transparent text-blue-700": !props.active,
          "bg-blue-500 text-white": props.active,
        }
      )}
    >
      {props.children}
    </button>
  );
};

export default ToggleButton;
