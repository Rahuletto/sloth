import { TopicData } from "./Topic";

export interface Note {
    id: string;
    data: NoteData
}

export interface NoteData {
    id: string;
    topics: TopicData[] | any[];
    title: string;
    createdAt: number;
    audio: string;
    transcript: string;
    summary?:string;
    category: string;
}