export interface Note {
    id: number,
    title: string,
    content: string,
    dateEdited: Date,
    archived: boolean,
    categories: string[]
}
