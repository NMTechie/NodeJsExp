import { read } from "fs";
import rl from "readline/promises";

async function menuBuilder(menuOptions) {
  let selectedFile = "";
  if (!menuOptions || menuOptions.length === 0) {
    console.log("No files available to read.");
    return;
  }
  const { stdin: input, stdout: output } = process;
  const readline = rl.createInterface({ input, output });
  const fileOptions = menuOptions.map((option, index) => `${index + 1}. ${option}`).join("\n");
  const userChoice = await readline.question(`Please select a file to read:\n${fileOptions}\n`);
  const selectedIndex = parseInt(userChoice, 10) - 1;
  if (selectedIndex >= 0 && selectedIndex < menuOptions.length) {
    selectedFile = menuOptions[selectedIndex];
    console.log(`You selected: ${selectedFile}`);
  } else {
    throw new Error("Invalid selection");
  }
  readline.close();
  return selectedFile;
}


export default { menuBuilder };
