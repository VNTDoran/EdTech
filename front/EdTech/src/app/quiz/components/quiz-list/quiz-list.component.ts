import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/quiz/model/quiz';
import { QuizService } from '../../../service/quiz.service';

@Component({
  selector: 'quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe((res) => {
      console.log(res)
      this.quizzes = res;
    });

//     this.quizzes = [
//       {
//           id: 1,
//           title: "General Knowledge",
//           category: "General",
//           numQuestions: 20
//       },
//       {
//           id: 2,
//           title: "World History",
//           category: "History",
//           numQuestions: 15
//       },
//       {
//           id: 3,
//           title: "Basic Mathematics",
//           category: "Mathematics",
//           numQuestions: 10
//       },
//       {
//           id: 4,
//           title: "Science Facts",
//           category: "Science",
//           numQuestions: 25
//       },
//       {
//           id: 5,
//           title: "Geography Challenge",
//           category: "Geography",
//           numQuestions: 12
//       },
//       {
//           id: 6,
//           title: "Literature Classics",
//           category: "Literature",
//           numQuestions: 18
//       },
//       {
//           id: 7,
//           title: "Famous Artworks",
//           category: "Art",
//           numQuestions: 22
//       },
//       {
//           id: 8,
//           title: "Music Theory",
//           category: "Music",
//           numQuestions: 17
//       },
//       {
//           id: 9,
//           title: "Computer Science Basics",
//           category: "Technology",
//           numQuestions: 20
//       },
//       {
//           id: 10,
//           title: "Sports Trivia",
//           category: "Sports",
//           numQuestions: 14
//       }
//   ];
  
  }


}
