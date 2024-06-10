jest.mock("../controllers/executeController");
jest.mock("../static/example_responses");
jest.mock("../controllers/executeController");

import { executionController } from "../controllers/executeController";
import { fakeExecutionContextTestAction, mockResponse } from "../static/example_responses";

let mockedExecuteAction = executionController.executeAction as jest.Mock;
let mockedGenerateSyncSuccessMessage = executionController.generateSyncSuccessMessage as jest.Mock;

describe("Testing executeController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Testing Execute Action", async () => {
        const executionContext = fakeExecutionContextTestAction;
        await mockedExecuteAction(executionContext, mockResponse);
        expect(mockedGenerateSyncSuccessMessage).toHaveBeenCalledTimes(1);
    })
});