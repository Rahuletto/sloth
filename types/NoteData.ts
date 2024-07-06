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
    src: SourceData[];
    transcript?: string;
    summary?:string;
    category: string;
}

export interface SourceData {
    type: 'audio' | 'pdf' | 'youtube'
    url: string
}