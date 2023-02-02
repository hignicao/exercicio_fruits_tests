import fruits from "data/fruits";
import app from "index";
import supertest from "supertest";

describe("POST /fruits", () => {
	it("should create a new fruit", async () => {
		const body = {
			name: "abacaxi",
			price: 5.5,
		};

		const postResult = await supertest(app).post("/fruits").send(body);
		const result = await supertest(app).get("/fruits");

		expect(postResult.status).toBe(201);
		expect(result.body).toHaveLength(1);
	});

	it("should return 409 when trying to create a fruit that already exists", async () => {
		const body = {
			name: "abacaxi",
			price: 6.0,
		};

		const postResult = await supertest(app).post("/fruits").send(body);

		expect(postResult.status).toBe(409);
	});

	it("should return 422 when trying to create a fruit with invalid body", async () => {
		const body = {
			invalid: "banana",
			invalid2: 7.0,
		};

		const postResult = await supertest(app).post("/fruits").send(body);
		expect(postResult.status).toBe(422);
	});
});

describe("GET /fruits", () => {
	it("should return all fruits", async () => {
		const result = await supertest(app).get("/fruits");

		expect(result.status).toBe(200);
		expect(result.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					price: expect.any(Number),
				}),
			])
		);
	});
});

describe("GET /fruits/:id", () => {
	it("should return a specific fruit", async () => {
		const result = await supertest(app).get("/fruits/1");

		expect(result.status).toBe(200);
		expect(result.body).toEqual(
			expect.objectContaining({
				id: 1,
				name: "abacaxi",
				price: 5.5,
			})
		);
	});

	it("should return 404 when fruit is not found", async () => {
		const result = await supertest(app).get("/fruits/3");

		expect(result.status).toBe(404);
	});
});
