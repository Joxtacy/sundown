import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import path from "path";
// import fs from "fs";

// function getEnv() {
//     const envFilePath = path.resolve(__dirname, "./.env");
//     try {
//         let res = {};
//         const data = fs.readFileSync(envFilePath, "utf8");

//         data.split("\n").forEach((kv) => {
//             const [key, value] = kv.replace(/\s*/g, "").split("=");
//             if (key && value) {
//                 res[key] = value;
//             }
//         });

//         return res;
//     } catch (err) {
//         console.error(err);
//     }
// }

// const envs = getEnv();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
});
