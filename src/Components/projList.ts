import { Component } from './baseComponents';
import { Project } from '../Models/model';
import { Binding } from '../Decorators/dragNdropDecorators';
import { manageState } from '../State/projectState';
import { Droppable } from '../Models/draginterfaces';
import { ProjectStatus } from '../Models/model';
import { ProjectItem } from './projItems';

    //dragNdropList class which renders the list
    export class dragNdropList extends Component<HTMLDivElement, HTMLElement> implements Droppable{
    assignedProjects: Project[];
    constructor(private type: 'active' | 'finished') {
        super('project-list','app', false,`${type}-projects`,);
        this.assignedProjects = [];

        //renders the list
        this.configure();
        this.renderContent();
    }

    @Binding
    dragOverHandler(e: DragEvent){
        if(e.dataTransfer && e.dataTransfer.types[0]==='text/plain'){
            e.preventDefault();
            const listEL= this.element.querySelector('ul')!;
            listEL.classList.add('droppable');
        }
    }

    @Binding
    dropHandler(e: DragEvent){
        const projId = e.dataTransfer!.getData('text/plain');
        manageState.moveProject(projId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    
    @Binding
    dragLeaveHandler(e: DragEvent){
        const listEL= this.element.querySelector('ul')!;
        listEL.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        manageState.addListener((projects: Project[]) => {
            const filterProjects = projects.filter(prj => {
                if(this.type==='active'){
                    return prj.status === ProjectStatus.Active
                }else{
                    return prj.status === ProjectStatus.Finished
                }
            });
            this.assignedProjects = filterProjects;
            this.renderProjects();
        });
    };

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id=listId;
        this.element.querySelector('h2')!.textContent= this.type.toUpperCase() + ' HERE';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projItem of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id, projItem);
        }
    }
}

