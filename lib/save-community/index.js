import { errors, results } from "../utils/enums.js";
import responseHandler from "../utils/response-handler.js";
import bookmarkImage from "./application/index.js";
export default async (req, res) => {
    const { communityDid, pfp, name, location, createdAt } = req.body;
    const result = await bookmarkImage({
        communityDid,
        pfp,
        name,
        location,
        createdAt,
    });
    switch (result.state) {
        case results.success:
            responseHandler({ res, status: 200, data: result.data });
            break;
        case results.failed:
            responseHandler({ res, status: 400, data: errors.generic });
            break;
        default:
            responseHandler({ res, status: 400, data: errors.generic });
            break;
    }
};
//# sourceMappingURL=index.js.map