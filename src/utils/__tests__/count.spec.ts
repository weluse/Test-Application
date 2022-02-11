import { getItemCount } from "../count";

describe("getItemCount", () => {
  it("should count items correctly", () => {
    expect(getItemCount(["item 1"])).toBe(1);
    expect(getItemCount(["item 1", "second item"])).toBe(2);
    expect(getItemCount([])).toBe(0);
    expect(getItemCount([1], [2])).toBe(2);
  });

  it("should not count boolean values", () => {
    expect(getItemCount(true)).toBe(0);
    expect(getItemCount(true, false, ["some item"])).toBe(1);
  });
});
