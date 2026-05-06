"use client";

import * as React from "react";
import clsx from "clsx";

import { FaRegStar, FaStar } from "react-icons/fa6";

import classes from "./FavoriteButton.module.scss";

export interface FavoriteButtonProps extends React.HTMLAttributes<HTMLElement> {
	type?: "active" | "empty";
}

export const FavoriteButton = ({ type, ...rest }: FavoriteButtonProps) => {
	return (
		<button {...rest} className={clsx(rest.className, classes.button)}>
			{type === "active" ? <FaStar /> : <FaRegStar />}
		</button>
	);
};
