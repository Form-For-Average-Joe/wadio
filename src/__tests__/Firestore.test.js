import { FakeFirestore } from 'firestore-jest-mock';
import { mockCollection, mockDoc } from 'firestore-jest-mock/mocks/firestore';

//Was trying to test dashboard but still facing createRoot issue
//This test is not meaningful for now
describe('Firestore options', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    const database = {
        userID: [
            {
                id: 'userData',
                _collection: {
                    age: 22,
                    anonymnous: false,
                    gender: '0',
                    height: 180,
                    nickname: 'dog',
                    weight: 70,
                },
            },
        ],
    };

    const options = {
        includeIdsInData: true,
    };

    const db = new FakeFirestore(database, options);

    describe('Single records versus queries', () => {
        test('it can fetch a single record', async () => {
            expect.assertions(4);
            const record = await db
                .collection('userID')
                .doc('userData')
                .get();
            expect(mockCollection).toHaveBeenCalledWith('userID');
            expect(mockDoc).toHaveBeenCalledWith('userData');
            expect(record.exists).toBe(true);
            expect(record.id).toBe('userData');
            // const data = record.data();
            // expect(data).toHaveProperty('name', 'Krusty');
            // expect(data).toHaveProperty('occupation', 'clown');
            // expect(data).toHaveProperty('id', 'krusty');
        });
    });
});