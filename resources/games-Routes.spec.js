const request = require('supertest');

const db = require('../data/dbConfig');
const {add} = require('./games-Models');

// use server instead of router because supertest requires a server, supertest can't use the Route method of express
const server = require('../api/server');
describe('**Post and Get GAMES**', () => {
    describe('POST @ endpoint /games', () => {
        const gameObj = {
            title: 'Pacman', // required
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
            }

        beforeEach(async () => {
            await db('games').truncate();
        })
    
        // that process.env.DB_ENV is pointing to 'testing';
        it('should set environment to testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })

        it('should add games', async () => {
            await add({ title: 'Contra', genre: 'Arcade', releaseYear: 1990 });
            await add({ title: 'fortnite', genre: 'Shooter', releaseYear: 2015 });
            await add({ title: 'Metroid', genre: 'Arcade', releaseYear: 1995 });
    
            const games = await db('games');
    
            expect(games).toHaveLength(3)
        });
        it('should insert the provided game title', async () => {
            let game = { title: 'Contra', genre: 'Arcade', releaseYear: 1990};
            let added = await add(game);
            expect(added.title).toBe(game.title)
    
            game = { title: 'fortnite', genre: 'Shooter', releaseYear: 2015 };
            added = await add(game);
            expect(added.title).toBe(game.title)
        });  
        
        it('should insert the provided game genre', async () => {
            let game = { title: 'Contra', genre: 'Arcade', releaseYear: 1990};
            let added = await add(game);
            expect(added.genre).toBe(game.genre)
    
            game = { title: 'fortnite', genre: 'Shooter', releaseYear: 2015 };
            added = await add(game);
            expect(added.genre).toBe(game.genre)
        });        
        
        it('should insert the provided game releaseYear', async () => {
            let game = { title: 'Contra', genre: 'Arcade', releaseYear: 1990};
            let added = await add(game);
            expect(added.releaseYear).toBe(game.releaseYear)
    
            game = { title: 'fortnite', genre: 'Shooter', releaseYear: 2015 };
            added = await add(game);
            expect(added.releaseYear).toBe(game.releaseYear)
        });        
    });


    describe('GET @ endpoint /games', () => {
        const endpoint = '/games';

        const gameObj = {
            title: 'string', // required
            genre: 'string', // required
            releaseYear: 1234 // not required
            }

        beforeEach(async () => {
            await db('games').truncate();
        })

        it('responds with 404, a message and success false status if database is empty.', () => {
            return request(server)
            .get(endpoint)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body).toEqual({"message": "Sorry, no GAMES atm!", "success": false})
            })
        });

        it('responds with 200 status', async () => {
            request(server)
            .post(endpoint)
            await add({ title: 'Contra', genre: 'Arcade', releaseYear: 1990})

            await request(server)
            .get(endpoint)
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('response content-type is json', () => {
            return request(server)
            .get(endpoint)
            .expect('Content-Type', /json/i)
        });

        //  ****STILL NEED TO TEST THIS.  NEED POST ROUTE FIRST****
        it('should respond with an object like gameObj', () => {
            return request(server)
            .get(endpoint)
            .then(res => {
                const { title = 'string', genre = 'string', releaseYear = 1234 } = res.body
                expect({title, genre, releaseYear}).toMatchObject(gameObj)
            })
        });
    });
})
    