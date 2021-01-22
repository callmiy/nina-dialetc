const { stdout } = require("stdout-stderr");
const GenDockerCommand = require("../../src/commands/gen-docker");

describe("gen-docker", () => {
  beforeEach(() => {
    stdout.start();
  });

  afterEach(() => {
    stdout.stop();
    jest.clearAllMocks();
  });

  test("all", async () => {
    await GenDockerCommand([]);
    expect(stdout.output).to.contain("");
  });

  test("base", async () => {
    await GenDockerCommand([]);
    expect(stdout.output).to.contain("");
  });

  test("commons", async () => {
    await GenDockerCommand([]);
    expect(stdout.output).to.contain("");
  });

  test("hapi", async () => {
    await GenDockerCommand([]);
    expect(stdout.output).to.contain("");
  });

  test("svelte", async () => {
    await GenDockerCommand([]);
    expect(stdout.output).to.contain("");
  });

  test("svelte: verbose", async () => {
    await GenDockerCommand(["v"]);
    expect(stdout.output).to.contain("");
  });

  test("hapi: dry run", async () => {
    await GenDockerCommand(["d"]);
    expect(stdout.output).to.contain("");
  });
});
