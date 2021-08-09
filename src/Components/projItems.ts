import { Draggable } from '../Models/draginterfaces';
import { Component } from './baseComponents';
import { Project } from '../Models/model';
import { Binding } from '../Decorators/dragNdropDecorators';
 
    //Rendering a project item
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons() {
        if (this.project.numberOfPeople ===1){
            return '1 member';
        }else {
            return `${this.project.numberOfPeople} members`;
        }
    }

    constructor(hostId: string, project:Project){
        super('single-project', hostId, false, project.id);
        this.project= project;

        this.configure();
        this.renderContent();
    }

    @Binding
    dragStartHandler(e: DragEvent){
        e.dataTransfer!.setData('text/plain', this.project.id);
        e.dataTransfer!.effectAllowed = 'move';
    }

    @Binding
    dragEndHandler(e: DragEvent){
        
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons +' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
