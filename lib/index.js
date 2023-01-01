import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import saveCommunity from "./save-community/index.js";
import { handleError } from "./utils/middleware.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    handleError(express.json({ limit: "50mb" }), req, res, next);
});
app.use("/", express.static("public"));
app.get("/api", (_, res) => {
    res.sendStatus(400);
});
app.post("/api/save-community", async (req, res) => {
    await saveCommunity(req, res);
});
app.listen(PORT, () => {
    console.log(`🔥 [server]: Server is running at https://localhost:${PORT}`);
});
//did:key:z6Mkk6o6NqAZjhLSDD64dEQQyocDpH9ojyx476suWiDbezJv
//did:key:z6Mkk6o6NqAZjhLSDD64dEQQyocDpH9ojyx476suWiDbezJv
//# sourceMappingURL=index.js.map