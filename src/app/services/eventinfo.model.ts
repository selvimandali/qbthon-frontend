export class Event{
    id: string;
    date: Date;
    slot: string;
    skills: string;
}

export class User{
    id: string;
    name: string;
    bu: string;
    account: string;
    skill_id: string;
    admin_flag: boolean;
}

export class Questionnaire{
    id: string;
    blooms: string;
    difficulty: string;
    category: string;
    stack: string;
    source: string;
    multiple: string;
    topic: string;
    description: string;
    optionOne: string;
    scoreOne: string;
    optionTwo: string;
    scoreTwo: string;
    optionThree: string;
    scoreThree: string;
    optionFour: string;
    scoreFour: string;
    assignedSme: string;
    type: string;
    status: string;
    comment: string;
    userId: string;
    eventId: string;
}