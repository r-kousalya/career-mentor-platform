import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';
interface Job { id: number; role: string; company: string; date: string; status: JobStatus; color: string; }
interface Goal { id: number; title: string; category: string; progress: number; due: string; }

@Component({
  selector: 'app-root', standalone: true, imports: [CommonModule, FormsModule],
  template: `
  <div class="app-shell">
    <aside class="sidebar" [class.open]="menuOpen">
      <a class="brand" href="#"><span class="brand-mark">c.</span><span>careerly</span></a>
      <div class="workspace-label">WORKSPACE</div>
      <nav>
        <button *ngFor="let item of navItems" class="nav-link" [class.active]="activeView===item.id" (click)="navigate(item.id)"><span class="nav-icon">{{item.icon}}</span>{{item.label}} <span *ngIf="item.id==='jobs'" class="nav-count">{{jobs.length}}</span></button>
      </nav>
      <div class="sidebar-bottom">
        <div class="upgrade-card"><div class="sparkle">✳</div><strong>Your next chapter<br>starts here.</strong><p>Small steps create meaningful momentum.</p><button (click)="navigate('roadmap')">View my roadmap <span>↗</span></button></div>
        <div class="profile-row"><div class="avatar">KR</div><div><strong>Kousalya R</strong><small>Personal workspace</small></div><span class="more">···</span></div>
      </div>
    </aside>
    <main class="main-area">
      <header class="topbar"><button class="mobile-menu" (click)="menuOpen=!menuOpen">☰</button><div class="breadcrumb">Workspace <span>/</span> <b>{{pageTitle}}</b></div><div class="top-actions"><span class="today">THURSDAY, NOV 20</span><button class="icon-button" aria-label="Notifications">♧<i></i></button><div class="avatar small">KR</div></div></header>
      <div class="content">
        <section *ngIf="activeView==='overview'">
          <div class="welcome-row"><div><div class="eyebrow">YOUR CAREER, IN MOTION</div><h1>Good afternoon, Kousalya <span class="wave">✳</span></h1><p class="subheading">A little progress today goes a long way. Here's your overview.</p></div><button class="primary-button" (click)="openJobForm=true">＋ Add application</button></div>
          <div class="stat-grid">
            <article class="stat-card"><div class="stat-top"><span>Applications sent</span><span class="stat-icon lilac">↗</span></div><div class="stat-number">{{jobs.length.toString().padStart(2,'0')}}</div><div class="stat-foot"><span class="trend">↑ 2</span> this month</div><div class="mini-bars"><i *ngFor="let h of [30,48,38,65,48,75,58,88,68,100,78,90]" [style.height.%]="h"></i></div></article>
            <article class="stat-card"><div class="stat-top"><span>In the pipeline</span><span class="stat-icon peach">◷</span></div><div class="stat-number">{{interviewCount.toString().padStart(2,'0')}}</div><div class="stat-foot">Active interview processes</div><div class="pipeline-dots"><i *ngFor="let x of [1,2,3,4,5,6,7,8]" [class.filled]="x<=interviewCount"></i></div></article>
            <article class="stat-card"><div class="stat-top"><span>Learning progress</span><span class="stat-icon mint">⌁</span></div><div class="stat-number">68<span class="percent">%</span></div><div class="stat-foot"><span class="trend">↑ 12%</span> from last month</div><div class="progress-line"><i></i></div></article>
            <article class="stat-card"><div class="stat-top"><span>Career focus</span><span class="stat-icon yellow">✳</span></div><div class="stat-number focus-number">Full-stack<br>& AI</div><div class="stat-foot">Your current direction</div><div class="focus-tags"><span>Frontend</span><span>AI</span></div></article>
          </div>
          <div class="section-grid">
            <article class="panel applications-panel"><div class="panel-heading"><div><h2>Recent applications</h2><p>Keep an eye on every opportunity.</p></div><button class="text-button" (click)="navigate('jobs')">View all <span>↗</span></button></div>
              <div class="table-wrap"><table><thead><tr><th>ROLE / COMPANY</th><th>DATE APPLIED</th><th>STATUS</th><th></th></tr></thead><tbody><tr *ngFor="let job of jobs.slice(0,4)"><td><div class="company-cell"><span class="company-logo" [style.background]="job.color">{{job.company.charAt(0)}}</span><span><strong>{{job.role}}</strong><small>{{job.company}}</small></span></div></td><td class="date-cell">{{job.date}}</td><td><span class="status" [ngClass]="job.status.toLowerCase()">{{job.status}}</span></td><td><button class="dots" (click)="cycleStatus(job)">···</button></td></tr></tbody></table></div>
              <div *ngIf="jobs.length===0" class="empty-state">No applications yet. Add your first opportunity to get started.</div>
            </article>
            <article class="panel goals-panel"><div class="panel-heading"><div><h2>Learning roadmap</h2><p>Skills you're growing right now.</p></div><button class="round-arrow" (click)="navigate('roadmap')">↗</button></div>
              <div class="goal-list"><div class="goal-item" *ngFor="let goal of goals"><div class="goal-heading"><span class="goal-dot" [class.done]="goal.progress===100"></span><strong>{{goal.title}}</strong><small>{{goal.progress}}%</small></div><div class="goal-track"><i [style.width.%]="goal.progress"></i></div><div class="goal-meta">{{goal.category}} <span>· {{goal.due}}</span></div></div></div>
              <button class="add-goal" (click)="navigate('roadmap')">＋ Explore learning goals</button>
            </article>
          </div>
          <div class="bottom-grid"><article class="quote-card"><div class="quote-mark">“</div><blockquote>Careers are not built in a day. They're built by the things you choose to do every day.</blockquote><div class="quote-author">A NOTE TO YOUR FUTURE SELF <span>✳</span></div></article><article class="panel interview-card"><div class="interview-art">✳</div><div class="eyebrow">STAY SHARP</div><h2>Ready for your next interview?</h2><p>Build confidence one thoughtful answer at a time.</p><button class="primary-button dark" (click)="navigate('interview')">Practice questions <span>↗</span></button></article></div>
        </section>
        <section *ngIf="activeView==='jobs'">
          <div class="page-heading"><div><div class="eyebrow">OPPORTUNITIES</div><h1>Job applications</h1><p class="subheading">Every application is a step towards your next chapter.</p></div><button class="primary-button" (click)="openJobForm=true">＋ Add application</button></div>
          <div class="filter-row"><div class="filter-tabs"><button *ngFor="let f of filters" [class.selected]="jobFilter===f" (click)="jobFilter=f">{{f}} <span>{{f==='All'?jobs.length:countStatus(f)}}</span></button></div><input class="search-input" [(ngModel)]="searchTerm" placeholder="⌕  Search role or company"></div>
          <article class="panel full-panel"><div class="table-wrap"><table><thead><tr><th>ROLE / COMPANY</th><th>DATE APPLIED</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody><tr *ngFor="let job of filteredJobs"><td><div class="company-cell"><span class="company-logo" [style.background]="job.color">{{job.company.charAt(0)}}</span><span><strong>{{job.role}}</strong><small>{{job.company}}</small></span></div></td><td class="date-cell">{{job.date}}</td><td><select class="status-select" [ngClass]="job.status.toLowerCase()" [(ngModel)]="job.status" (change)="save()"><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option></select></td><td><button class="delete-button" (click)="deleteJob(job.id)">Remove</button></td></tr></tbody></table></div><div *ngIf="filteredJobs.length===0" class="empty-state">Nothing here yet. Try another filter or add an application.</div></article>
        </section>
        <section *ngIf="activeView==='roadmap'">
          <div class="page-heading"><div><div class="eyebrow">GROW WITH INTENTION</div><h1>Your learning roadmap</h1><p class="subheading">Build the skills that move you towards your goals.</p></div></div>
          <div class="roadmap-banner"><div><div class="eyebrow">YOUR NORTH STAR</div><h2>Full-stack development + AI</h2><p>A focused path from strong UI engineering to end-to-end product building.</p></div><div class="banner-progress"><strong>68%</strong><span>OVERALL PROGRESS</span><div class="progress-line"><i></i></div></div></div>
          <div class="roadmap-grid"><article class="panel roadmap-card" *ngFor="let goal of goals"><div class="roadmap-card-top"><span class="goal-badge">{{goal.category}}</span><span>{{goal.progress}}% complete</span></div><h2>{{goal.title}}</h2><p>Build practical knowledge through focused learning and a hands-on project.</p><div class="goal-track"><i [style.width.%]="goal.progress"></i></div><div class="roadmap-card-foot"><span>Target: {{goal.due}}</span><button (click)="increaseGoal(goal)">Update progress ↗</button></div></article></div>
        </section>
        <section *ngIf="activeView==='interview'">
          <div class="page-heading"><div><div class="eyebrow">PREPARE WITH PURPOSE</div><h1>Interview practice</h1><p class="subheading">Thoughtful practice makes confident conversations.</p></div></div>
          <div class="interview-intro"><div><span class="eyebrow">YOUR PRACTICE SPACE</span><h2>Make your experience<br>your strongest answer.</h2><p>Start with a question, structure your thoughts, and practise saying it out loud.</p></div><div class="practice-icon">✳</div></div>
          <div class="question-list"><article class="panel question-card" *ngFor="let q of questions;let i=index"><span class="question-number">0{{i+1}}</span><div><span class="eyebrow">{{q.type}}</span><h3>{{q.text}}</h3><p>{{q.hint}}</p></div><button class="round-arrow" (click)="expandedQuestion=expandedQuestion===i?-1:i">{{expandedQuestion===i?'−':'＋'}}</button><div class="answer-tip" *ngIf="expandedQuestion===i"><strong>Structure your answer</strong><p>{{q.tip}}</p></div></article></div>
        </section>
        <section *ngIf="activeView==='mentor'">
          <div class="page-heading"><div><div class="eyebrow">A THOUGHTFUL COMPANION</div><h1>AI career mentor</h1><p class="subheading">A space for reflection, planning and better questions.</p></div></div>
          <div class="mentor-panel panel"><div class="mentor-symbol">✳</div><span class="eyebrow">COMING SOON · AI INTEGRATION</span><h2>Your next move deserves<br>a little clarity.</h2><p>The mentor experience is prepared for a secure AI connection. Add a server-side model provider to enable tailored career conversations—your API key should never live in the browser.</p><div class="mentor-prompts"><span>Review my career goals</span><span>Help me prepare for an interview</span><span>Identify my next learning step</span></div></div>
        </section>
        <footer class="footer"><span>© 2026 CAREERLY</span><span>Made for meaningful progress <b>✳</b></span><span>YOUR NEXT CHAPTER IS YOURS.</span></footer>
      </div>
    </main>
    <div class="modal-backdrop" *ngIf="openJobForm" (click)="openJobForm=false"><div class="modal" (click)="$event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">NEW OPPORTUNITY</span><h2>Add an application</h2></div><button class="close-button" (click)="openJobForm=false">×</button></div><label>Job title<input [(ngModel)]="newRole" placeholder="e.g. Senior Frontend Engineer"></label><label>Company<input [(ngModel)]="newCompany" placeholder="e.g. Acme Studio"></label><label>Status<select [(ngModel)]="newStatus"><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option></select></label><div class="modal-actions"><button class="secondary-button" (click)="openJobForm=false">Cancel</button><button class="primary-button" (click)="addJob()" [disabled]="!newRole.trim()||!newCompany.trim()">Save application</button></div></div></div>
  </div>`,
  styles: [` :host{display:block;min-height:100vh} `]
})
export class AppComponent {
  menuOpen=false; activeView='overview'; openJobForm=false; expandedQuestion=-1; jobFilter='All'; searchTerm='';
  newRole=''; newCompany=''; newStatus:JobStatus='Applied';
  navItems=[{id:'overview',label:'Overview',icon:'⌂'},{id:'jobs',label:'Job applications',icon:'▤'},{id:'roadmap',label:'Learning roadmap',icon:'⌁'},{id:'interview',label:'Interview practice',icon:'✳'},{id:'mentor',label:'AI career mentor',icon:'✧'}];
  filters=['All','Applied','Interview','Offer','Rejected'];
  jobs:Job[]=[
    {id:1,role:'Senior Frontend Engineer',company:'Atlassian',date:'Nov 18, 2026',status:'Interview',color:'#e8e4fb'},
    {id:2,role:'UI Engineer',company:'Freshworks',date:'Nov 14, 2026',status:'Applied',color:'#fbe9dd'},
    {id:3,role:'Frontend Developer',company:'Razorpay',date:'Nov 08, 2026',status:'Applied',color:'#dff0e9'},
    {id:4,role:'Software Engineer II',company:'Thoughtworks',date:'Nov 02, 2026',status:'Rejected',color:'#f5e9e9'}
  ];
  goals:Goal[]=[
    {id:1,title:'Advanced Angular & architecture',category:'Frontend',progress:82,due:'Dec 2026'},
    {id:2,title:'Java + Spring Boot foundations',category:'Backend',progress:64,due:'Jan 2027'},
    {id:3,title:'REST APIs & PostgreSQL',category:'Backend',progress:58,due:'Jan 2027'},
    {id:4,title:'Practical AI integrations',category:'AI',progress:35,due:'Feb 2027'}
  ];
  questions=[
    {type:'BEHAVIOURAL',text:'Tell me about a complex UI problem you solved.',hint:'Use a real feature, explain the constraint and your contribution.',tip:'Situation: introduce the feature. Task: explain the UI challenge. Action: describe your own logic and decisions. Result: share the verified outcome.'},
    {type:'FRONTEND ENGINEERING',text:'How do you approach building reusable components?',hint:'Talk about API design, states, accessibility and maintainability.',tip:'Explain how you identify shared behaviour, define inputs and outputs, handle states, document usage and test edge cases.'},
    {type:'SYSTEM THINKING',text:'How would you improve the performance of a large web application?',hint:'Show how you investigate before changing code.',tip:'Start with measurement, identify bottlenecks, prioritize the highest-impact issue, implement a targeted fix and compare metrics.'},
    {type:'CAREER STORY',text:'Why are you moving towards full-stack and AI?',hint:'Connect your frontend experience to the capabilities you are building.',tip:'Describe the product problems you want to solve end-to-end and give concrete examples of the backend and AI skills you are actively developing.'}
  ];
  constructor(){this.load();}
  get pageTitle(){return this.navItems.find(n=>n.id===this.activeView)?.label??'Overview';}
  get interviewCount(){return this.jobs.filter(j=>j.status==='Interview').length;}
  get filteredJobs(){return this.jobs.filter(j=>(this.jobFilter==='All'||j.status===this.jobFilter)&&(`${j.role} ${j.company}`.toLowerCase().includes(this.searchTerm.toLowerCase())));}
  navigate(id:string){this.activeView=id;this.menuOpen=false;}
  countStatus(s:string){return this.jobs.filter(j=>j.status===s).length;}
  cycleStatus(job:Job){const statuses:JobStatus[]=['Applied','Interview','Offer','Rejected'];job.status=statuses[(statuses.indexOf(job.status)+1)%statuses.length];this.save();}
  addJob(){if(!this.newRole.trim()||!this.newCompany.trim())return;this.jobs.unshift({id:Date.now(),role:this.newRole.trim(),company:this.newCompany.trim(),date:new Date().toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'}),status:this.newStatus,color:'#e7edf7'});this.newRole='';this.newCompany='';this.newStatus='Applied';this.openJobForm=false;this.save();}
  deleteJob(id:number){this.jobs=this.jobs.filter(j=>j.id!==id);this.save();}
  save(){try{localStorage.setItem('careerly-jobs',JSON.stringify(this.jobs));localStorage.setItem('careerly-goals',JSON.stringify(this.goals));}catch{}}
  load(){try{const j=localStorage.getItem('careerly-jobs');const g=localStorage.getItem('careerly-goals');if(j)this.jobs=JSON.parse(j);if(g)this.goals=JSON.parse(g);}catch{}}
}
