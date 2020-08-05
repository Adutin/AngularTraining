export class Task {
    public id: number = -1;
    public isCompleted: boolean = false;
    static nextId: number = 0;

    constructor(
        public name: string,
        public description: string,
        public importance: ImportanceClass,
        public dueDate: Date = new Date(),
        public isDummy: boolean = false) {
            if (isDummy) return;
            this.id = Task.getId();
        }

    static getId(): number {
        this.nextId++;
        return this.nextId;
    }
}

export enum ImportanceClass {
    Low,
    Med,
    High
}