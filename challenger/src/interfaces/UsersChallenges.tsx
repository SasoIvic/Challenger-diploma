export interface UsersChallenges {
    arrayOfDates: any[],
    mychallenge: {
        _id: string,
        name: string,
        description: string,
        bet: number,
        daily: boolean,
        numOfDays?: number,
        end: Date,
        start: Date,

    }

}