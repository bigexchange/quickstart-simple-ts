jest.mock("../utils/actions");
jest.mock("log4js");

import { fakeExecutionContextTestAction, fakeExecutionContextBadAction } from "../static/example_responses";
import { executionController } from "../controllers/executeController";
import { mockResponse } from "../static/example_responses";
import { executeTestAction } from "../utils/actions";
import { ActionResponseDetails, StatusEnum } from "@bigid/apps-infrastructure-node-js";
import { getLogger } from "log4js";

let mockedExecuteTestAction = executeTestAction as jest.Mock;
let mockedGetLogger = getLogger as jest.Mock;
mockedGetLogger.mockReturnValue({
    error: jest.fn()
});

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
    test("Testing error", async () => {
        let res = mockResponse();
        let failSpy = jest.spyOn(executionController, "generateFailedResponse");
        mockedExecuteTestAction.mockImplementationOnce(executionContext => {throw new Error("erm what the Σ")});
        const executionContext = fakeExecutionContextTestAction;
        await executionController.executeAction(executionContext, res);
        expect(failSpy).toHaveBeenCalledTimes(1);
        expect(mockedGetLogger).toHaveBeenCalledTimes(1)
    });
});