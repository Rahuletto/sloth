export interface Topics {
    pageNo: number;
    topic: string;
    subtopics: string[];
}

export interface TopicData {
    title: string;
    topics: Topics[];
}