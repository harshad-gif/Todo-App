import { Component,OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo:Todo
  todoArr:Todo[]=[]
  constructor(){
    this.todo = new Todo()
  }

  ngOnInit(): void {
      this.getTodo()
  }

  addToDo(){
    this.todoArr.push(this.todo)
    const isData = localStorage.getItem('TodoData')
    if(isData == null){
     const newData = []
     this.todo.id = 0
     newData.push(this.todo)
     localStorage.setItem('TodoData',JSON.stringify(newData))
    }else{
      const oldData = JSON.parse(isData)
      const newId = oldData.length + 1
      this.todo.id = newId
      oldData.push(this.todo)
      localStorage.setItem('TodoData',JSON.stringify(oldData))
    }

  }

  getTodo(){
    const td = localStorage.getItem('TodoData')
    if(td != null){
       const data = JSON.parse(td)
       this.todoArr = data
    }
  }

  deleteTodo(item : Todo){
    const td = localStorage.getItem('TodoData')
    if(td != null){
       const data = JSON.parse(td)
      for (let index = 0; index < data.length; index++) {
        if(data[index].id == item.id){
          data.splice(0,1)
        }
      }
      localStorage.setItem("TodoData",JSON.stringify(data))
    }
    this.getTodo()
  }

}
