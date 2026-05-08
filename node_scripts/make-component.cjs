/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const readline = require("readline");

function ask(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer);
		});
	});
}

// function toKebabCase(str) {
//   return str
//     .replace(/([a-z])([A-Z])/g, '$1-$2')
//     .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
//     .toLowerCase();
// }

(async () => {
	const name = await ask("Введите название компонента (CamelCase): ");

	if (!name) {
		console.error("Название не может быть пустым");
		process.exit(1);
	}

	// const transformedName = toKebabCase(name);

	const dirPath = path.join(process.env.INIT_CWD, name);

	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
		console.log("Создана папка:", dirPath);
	} else {
		console.log("Папка уже существует, продолжаю...");
	}

	const tsxFile = `${name}.tsx`;
	const scssFile = `${name}.module.scss`;
	const tsxPath = path.join(dirPath, tsxFile);
	const scssPath = path.join(dirPath, scssFile);
	const indexPath = path.join(dirPath, `index.ts`);

	const contentIndex = `export * from "./${name}";\n`;
	const contentComponent = `import * as React from "react";

import classes from "./${scssFile}";

export const ${name} = () => {
  return (
    <div>
      {/* Шаблон компонента */}
    </div>
  );
};
`;

	fs.writeFileSync(tsxPath, contentComponent, "utf-8");
	fs.writeFileSync(scssPath, "", "utf-8");
	fs.writeFileSync(indexPath, contentIndex, "utf-8");

	console.log("Созданы файлы:");
	console.log(" -", tsxPath);
	console.log(" -", scssPath);
	console.log(" -", indexPath);
	console.log("Компонент создан");
})();
