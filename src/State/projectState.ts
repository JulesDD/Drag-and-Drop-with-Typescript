import {Project, ProjectStatus} from '../Models/model';




type Listerner<T> = (items: Project[]) => void;

    class State<T> {
    protected listeners: Listerner<T>[]=[];
    addListener(listenerFn: Listerner<T>){
        this.listeners.push(listenerFn);
        }
    }
    
    //Project State Management
    export class StateManagement extends State<Project> {
        private projects: Project[] = [];
        private static instance: StateManagement;

        private constructor() {
            super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new StateManagement();
        return this.instance;
    }

    

    addProject(title: string, description: string, numOfPeople: number) {
        const newProj= new Project(
                Math.random().toString(),
                title,
                description,
                numOfPeople,
                ProjectStatus.Active
        );
            this.projects.push(newProj);
            this.updateListeners();
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(proj => proj.id === projectId);
            if(project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
    }
    
    private updateListeners() {
        for(const listerFn of this.listeners){
            listerFn(this.projects.slice());
        }
    }
    }

    export const manageState = StateManagement.getInstance();


