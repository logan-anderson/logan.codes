import classNames from "classnames";

export default (props: {
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
        "py-2 px-4 m-2 border border-indigo-500 rounded-full",
        {
          "bg-transparent text-indigo-700": !props.active,
          "bg-indigo-500 text-white": props.active,
        }
      )}
    >
      {props.children}
    </button>
  );
};
