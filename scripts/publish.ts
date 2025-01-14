import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const UPDATE_TYPE = ["major", "minor", "patch"] as const;
type UpdateType = (typeof UPDATE_TYPE)[number];

function updatePackageVersion(type: UpdateType) {
 const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));
 const currentVersion = packageJson.version;
 const [major, minor, patch] = currentVersion.split(".").map(Number);

 let newVersion: string;
 switch (type) {
  case "major":
   newVersion = `${major + 1}.0.0`;
   break;
  case "minor":
   newVersion = `${major}.${minor + 1}.0`;
   break;
  case "patch":
   newVersion = `${major}.${minor}.${patch + 1}`;
   break;
 }

 packageJson.version = newVersion;
 writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

 try {
  execSync("git add package.json");
  execSync(`git commit -m "chore: bump version to ${newVersion}"`);
  execSync(`git tag v${newVersion}`);
  execSync("git push");
  execSync("git push --tags");

  execSync("npm publish --access public");

  console.log(`Successfully published version ${newVersion}`);
 } catch (error) {
  console.error("Error during publish:", error);
  packageJson.version = currentVersion;
  writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
  throw error;
 }
}

const versionType = process.argv[2] as "major" | "minor" | "patch";
if (!["major", "minor", "patch"].includes(versionType)) {
 console.error("Please specify version type: major, minor, or patch");
 process.exit(1);
}

updatePackageVersion(versionType);
