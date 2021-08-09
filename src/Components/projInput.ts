
import { Component } from './baseComponents';
import { Validatable, validate } from '../util/validationLogic';
import { Binding } from '../Decorators/dragNdropDecorators';
import { manageState } from '../State/projectState';

    //Main dragNdrop class
    export class dragNdrop extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement= this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement= this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement= this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
    }

     //create a listener that will listen to the handler
     configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {
        
    }

    //fetching the data
    private fetchUserInput(): [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            minLength:5
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 0,
            max: 5
        };
        console.log(titleValidatable);
        console.log(descriptionValidatable);
        console.log(peopleValidatable);
        
        if(!validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)){
            alert('Invalid Input, Please try again');
            return;
        }else{
            return[enteredTitle,enteredDescription,+enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value='';
        this.peopleInputElement.value='';
    }
    //create a submitHandler
    @Binding
    private submitHandler(e: Event) {
        e.preventDefault();
        const fetchInput= this.fetchUserInput();
        if(Array.isArray(fetchInput)){
            const[title, desc, people] = fetchInput;
            manageState.addProject(title, desc, people);
            this.clearInputs();
        }
        console.log(this.titleInputElement.value);
    } 
}
