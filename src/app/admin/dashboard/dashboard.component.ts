import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
import { title } from 'process';
import { text } from 'stream/consumers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions={}
  selected = new Date();
  userCount:number=0
  recipeCount:number=0
  requestCount:number=0
  downloadCount:number=0

  constructor(private api:ApiService,private router:Router){
    this.chartOptions={
      Chart:{
        type:'bar'
      },
      title:{
        text:'Analysis of Download Recipes Based on Cuisine',
        align:'left'
      },
      xAxis:{
        type:'category'
      },
      yAxis:{
        title:{
          text:'Total Download Recipe Count'
        }
      },
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[{
        name:'Cuisine',
        colorByPoint:true,
        type:'bar',
        data:[
          {
            name:'Italian',
            y:4
          },
          {
            name:'Asian',
            y:3
          },
          {
            name:'American',
            y:1
          },
          {
            name:'Mexican',
            y:2
          },
        ]
      }]
    }
  }


  isSideBarOpen:boolean=true

  ngOnInit(){
    this.usersCount()
    this.recipesCount()
    this.downloadsCount()
    this.requestsCount()

  }

  menuBarClicked(){
    this.isSideBarOpen=!this.isSideBarOpen
  }

  usersCount(){
    this.api.getAllUsers().subscribe((res:any)=>{
      this.userCount=res.length
    })
    
  }

  recipesCount(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.recipeCount=res.length
    })
    
  }

  requestsCount(){
    this.api.getAllTestimonyAPI().subscribe((res:any)=>{
      this.requestCount=res.filter((item:any)=>item.status=='pending').length
    })
    
  }

  downloadsCount(){
    this.api.getAllDownloads().subscribe((res:any)=>{
      this.downloadCount=res.length
    })
    
  }


  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }

}