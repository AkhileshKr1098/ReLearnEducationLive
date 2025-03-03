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

export interface Section {
    id: number;
    day: number,
    day_id: number;
    grade: number;
    week_id: number;
    week_num: number;
    sections: string
}
export interface SectionRes {
    success: number,
    data: Section
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