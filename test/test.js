import { assert, expect } from "chai";
import {
	csvToJson,
	getFileList,
	getSecretFileList,
} from "../src/files/controller.js";

describe("test", () => {
	it("test done", () => {
		// should set the timeout of this test to 1000 ms; instead will fail
		assert.ok(true);
	});
});

describe("test connection with external api", () => {
	it("secret/files its not null", async () => {
		const result = await getSecretFileList();
		expect(result).not.equal(null);
		assert.ok(true);
	});
	it("secret/files respond objet with  array of filenames", async () => {
		const result = await getSecretFileList();
		expect(result).have.property("files");
		assert.ok(true);
	});
});

describe("transform csv to json", () => {
	it("csv is empty", async () => {
		const result = await csvToJson("file,text,number,hex");
		console.log(result);
		expect(result).to.have.lengthOf(0);
		assert.ok(true);
	});
	it("csv done", async () => {
		const result = await csvToJson(
			"file,text,number,hex\ntest2.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765"
		);
		expect(result).to.have.property("file");
		expect(result).to.have.property("lines");
		expect(JSON.stringify(result)).to.equal(
			JSON.stringify({
				file: "test2.csv",
				lines: [
					{
						text: "RgTya",
						number: "64075909",
						hex: "70ad29aacf0b690b0467fe2b2767f765",
					},
				],
			})
		);
		assert.ok(true);
	});
});
