import { forwardRef, type FC, type HTMLAttributes } from "react";
import clsx from "clsx";
import classes from "./Container.module.scss";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	as?: "div" | "section" | "header" | "footer" | FC;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(props, ref) {
	const { as: As = "div", className, ...rest } = props;

	return <As ref={ref} className={clsx(className, classes.container)} {...rest} />;
});
