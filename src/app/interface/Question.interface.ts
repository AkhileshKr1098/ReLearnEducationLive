export interface Week {
    id: number,
    week_num: number
}

export interface WeekRes {
    success: number,
    data: Week
}

export interface WeekInsertRes {
    message: string,
    success: number
}

export interface Day {
    id: number,
    day: number,
    week_id: number,
    week_num: number

}

export interface DayRes {
    success: number,
    data: Day
}



export interface Grade {
    id: number;
    day: number,
    day_id: number;
    grade: number;
    week_id: number;
    week_num: number;
}
export interface GradeRes {
    success: number,
    data: Grade
}



export interface Class {
    class: string,
    id: number
}

export interface ClassRes {
    data: Class,
    success: number,

}



export interface Sections {
    id: number;
    sections_name: string
}
export interface SectionsRes {
    success: number,
    data: Sections
}

export interface Topics {
    id: number,
    sections: string,
    topics: string,
    topics_img: string
}
export interface TopicsRes {
    data: Topics,
    success: number

}


export interface SubTopic {
    id?: number;
    sub_topics: string;
    topics: string;
}

export interface SubTopicRes {
    data: SubTopic,
    success: number
}


export interface DayInfo {
    day: string;
    day_id: string;
    grade: string;
    grade_id: string;
    id: string;
    sections: string;
    week_id: string;
    week_num: string;
}


export interface QuestionData {
    Answer: string | null;
    OptionA: string | null;
    OptionB: string | null;
    OptionC: string | null;
    OptionD: string | null;
    Question: string;
    class: string;
    day: string;
    id: number;
    incomplete_word: string | null;
    listen_rec: string | null;
    listen_word: string | null;
    question_Img: string | null;
    question_type: string;
    sections: string;
    sub_topics: string;
    topics: string;
    unit: string;
    week: string;

}