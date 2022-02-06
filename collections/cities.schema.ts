export const citiesSchema = {
    bsonType: "object",
    properties: {
        city: {
            bsonType: "string",
        },
        growth_from_2000_to_2013: {
            bsonType: "string",
        },
        latitude: {
            bsonType: "number",
        },
        longitude: {
            bsonType: "number",
        },
        population: {
            bsonType: "string",
        },
        rank: {
            bsonType: "string",
        },
        state: {
            bsonType: "string",
        }
    }
}