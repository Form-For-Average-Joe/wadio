import { FakeFirestore } from 'firestore-jest-mock';
import { mockCollection, mockDoc } from 'firestore-jest-mock/mocks/firestore';
import PastExerciseTable from '../components/PastExerciseTable';
import {render, screen} from '@testing-library/react';

describe('Firestore options', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    const database = {
        userID: [
            {
                id: '2022-6-26 15:47:31',
                _collection: {
                    caloriesBurnt: 22,
                    date: '2022-6-26',
                    difficultyLevel: 1,
                    nameOfExercise: 'situps',
                    repCount: 38,
                    time: '15:47:31',
                    workoutTime: 46,
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
                .doc('2022-6-26 15:47:31')
                .get();
            expect(mockCollection).toHaveBeenCalledWith('userID');
            expect(mockDoc).toHaveBeenCalledWith('2022-6-26 15:47:31');
            expect(record.exists).toBe(true);
            expect(record.id).toBe('2022-6-26 15:47:31');
        });
        // test('renders react component', async () => {
        //     const record = db.collection('userID').get()
        //     const history = [{
        //         Date: record._collection.date,
        //         Time: record._collection.time,
        //         Exercise: record._collection.nameOfExercise,
        //         Reps: record._collection.repCount,
        //         Duration: record._collection.workoutTime,
        //         Calories: record._collection.caloriesBurnt,
        //     }];
        //     render(<PastExerciseTable stats={history} />);
        //     const divElement = screen.getByText("19.03");
        //     expect(divElement).toBeInTheDocument();
        //   });
    });
});