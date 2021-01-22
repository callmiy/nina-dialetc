const { stdout } = require("stdout-stderr");
const GenComposeCommand = require("../../src/commands/gen-compose");
const { fileName } = require("../../src/commands/gen-compose");
const { writeFileSync: mockWriteFileSync } = require("../../src/modules/fs");

jest.mock("prettier");
jest.mock("../../src/modules/fs");

stdout.print = true;

describe("gen-compose", () => {
  beforeEach(() => {
    stdout.start();
  });

  afterEach(() => {
    stdout.stop();
    jest.clearAllMocks();
  });

  it("runs default args", async () => {
    await GenComposeCommand.run([]);
    expect(stdout.output).toContain("Success");
    expect(mockWriteFileSync.mock.calls[0][1]).toBe(fileName);
  });

  xit("", async () => {
    await GenComposeCommand.run("runs hello --name jeff");
    expect(stdout.output).toBe("hello jeff");
  });
});
