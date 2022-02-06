import {MongoClient} from 'mongodb';
import {statesSchema} from "./collections/states.schema";
import {states as statesData} from "./data/states.data";
import {citiesSchema} from "./collections/cities.schema";
import {citiesData} from "./data/cities.data";

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

async function connectToDb() {
    try {
        await client.connect();

        const db = client.db("node-lab");

        db.listCollections({name: "states"})
            .next(async function(error, collInfo) {
                if (!collInfo) {
                    await db.createCollection( "states", {
                        validator: { $jsonSchema: statesSchema }
                    } );
                }
            });

        db.listCollections({name: "cities"})
            .next(async function(error, collInfo) {
                if (!collInfo) {
                    await db.createCollection( "cities" );
                }
            });

        const statesCollection = db.collection("states");
        const citiesCollection = db.collection("cities");

        let statesCount = await statesCollection.estimatedDocumentCount();
        let citiesCount = await citiesCollection.estimatedDocumentCount();

        if(statesCount === 0){
            await statesCollection.insertMany(statesData);
        }

        if(citiesCount === 0){
            await citiesCollection.insertMany(citiesData);
        }

        //Task1
        const statesTask1Result = await statesCollection.find({ }, {projection: {state: 1, capital_city: 1, _id: 0}});
        const statesTask1 = await statesTask1Result.toArray();

        const citiesQueryConditionsTask1 = statesTask1.map(state => state.capital_city);
        const citiesResultTask1 = await citiesCollection.find(
            {city: {$in: citiesQueryConditionsTask1 }},
            {projection: {population: 1, _id: 0, city: 1, state: 1}}
        );
        const citiesTask1 = await citiesResultTask1.toArray();

        const resultTask1 = statesTask1.map(state => {
            let currentCity = citiesTask1.find(city => {
                return (state.state === city.state &&
                        state.capital_city === city.city)
            })

            return {
                state: state.state,
                capital: state.capital_city,
                populationOfTheCapital: currentCity?.population
            }
        });
        // console.log(resultTask1);

        //Task2
        const citiesQueryConditionsTask2: string[] = ['20','21','22','23','24','25','26','27','28','29','30']

        const citiesResultTask2 = await citiesCollection.find(
            {rank: {$in: citiesQueryConditionsTask2 }},
            {projection: {_id: 0, city: 1, state: 1}}
        );
        const citiesTask2 = await citiesResultTask2.toArray();
        const statesQueryConditionsTask2: string[] = citiesTask2.map(city => city.state);

        const statesTask2Result = await statesCollection.find(
            {state: {$in: statesQueryConditionsTask2 }},
            {projection: {state: 1, state_flag_url: 1, _id: 0}});
        const statesTask2 = await statesTask2Result.toArray();

        const resultTask2 = citiesTask2.map(city => {
            const currentState = statesTask2.find(state => state.state === city.state)

            return {
                city: city.city,
                state: city.state,
                state_flag_url: currentState?.state_flag_url
            }
        });
        // console.log(resultTask2)

        //Task3
        const statesTask3Result = await statesCollection.find(
            { },
            {projection: {
                    state: 1,
                    website: 1,
                    twitter_url: 1,
                    facebook_url: 1,
                    _id: 0
                }
            }
        );
        const statesTask3 = await statesTask3Result.toArray();

        const citiesResultTask3 = await citiesCollection.find(
            {},
            {projection: {city: 1, population: 1, state: 1, _id: 0}});
        const citiesTask3 = await citiesResultTask3.toArray();

        const resultTask3 = statesTask3.map(state => {
            const cities = citiesTask3.filter(city => (city.state === state.state));

            return {
                state: state.state,
                links: [
                    state.website,
                    state.facebook_url,
                    state.twitter_url
                ],
                cities
            }
        });
        // console.log(resultTask3)

        //Task 4
        const citiesQueryConditionsTask4 = ['California', 'Texas', 'Florida'];
        const citiesResultTask4 = await citiesCollection.find(
            {state: {$in: citiesQueryConditionsTask4 }},
        ).sort( { population: 1 } ).limit(10);
        const resultTask4 = await citiesResultTask4.toArray()
        // console.log(resultTask4)

        //Task5
        const citiesPolygon = [
            [37.751703, -122.971027],
            [38.194340, -121.513280],
            [36.650067, -119.053988],
            [34.605100, -116.720952],
            [33.475337, -117.549011],
            [33.352874, -118.420805]
        ];

        const resultTask5 = await citiesCollection.aggregate([
            { "$project": {
                    "location": [ "$latitude", "$longitude" ],
                    city: 1,
                    _id: 0
                },
            },
            { $match: {
                    location: {
                        $geoWithin: { $polygon: citiesPolygon }
                    }
                }
            }
        ]);

        // console.log(await resultTask5.toArray());

        //Task6
        await citiesCollection.find(
            {
                population:{
                    $exists: true,
                    $type: 2
                }
            }
        )
            .forEach(function(doc){
            const data = doc.population;

            citiesCollection.updateOne(
                { _id: doc._id },
                {
                    $set:{
                        population: Number(data)
                    }
                }
            )
        });

        //task7
        const citiesResultTask7 = await citiesCollection.deleteMany({population: {$gt: 999999}});
        // console.log(citiesResultTask7);
    } finally {
        await client.close();
    }
}

connectToDb()