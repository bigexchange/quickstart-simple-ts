jest.mock("../utils/actions");
// jest.mock("log4js", () => {
//     return {
//         configure: jest.fn(),
//         getLogger: jest.fn().mockReturnValue({
//             error: jest.fn(),
//             info: jest.fn(),
//             debug: jest.fn(),
//             warn: jest.fn(),
//             fatal: jest.fn(),
//             trace: jest.fn(),
//         }),
//     };
// });

import { fakeExecutionContextTestAction, fakeExecutionContextBadAction } from "../static/example_responses";
import { executionController } from "../controllers/executeController";
import { mockResponse } from "../static/example_responses";
import { executeTestAction } from "../utils/actions";
import { ActionResponseDetails, StatusEnum } from "@bigid/apps-infrastructure-node-js";
// import log4js from "log4js";


// let mockedGenerateSyncSuccessMessage = executionController.generateSyncSuccessMessage as jest.Mock;
// let mockedGenerateFailedResponse = executionController.generateFailedResponse as jest.Mock;
let mockedExecuteTestAction = executeTestAction as jest.Mock;

describe("Testing Execute Controller...", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Testing \"Test Action\"", async () => {
        const executionContext = fakeExecutionContextTestAction;
        await executionController.executeAction(executionContext, mockResponse());
        expect(mockedExecuteTestAction).toHaveBeenCalledTimes(1);
    });
    test("Testing made up action", async () => {
        let res = mockResponse();
        const executionContext = fakeExecutionContextBadAction;
        await executionController.executeAction(executionContext, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new ActionResponseDetails("1111", StatusEnum.ERROR, 0, "Got unresolved action = foo"));
    });
    // test("Testing error", async () => {
    //     let res = mockResponse();
    //     mockedExecuteTestAction.mockImplementationOnce(executionContext => {throw new Error("erm what the Σ")});
    //     const executionContext = fakeExecutionContextBadAction;
    //     await executionController.executeAction(executionContext, res);
    //     const logger = log4js.getLogger();
    //     expect(logger.error).toHaveBeenCalledTimes(1);
    // });
});