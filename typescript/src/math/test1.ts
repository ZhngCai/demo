// interface IFakeServerWorker<T extends {}> {
//   /**
//    * 是否松散参数检查，会影响到设计端的参数检查
//    * true: 只要要求的参数都有了就行，使用者继续添加多余的参数设计端不会报错
//    * 默认：false，设计端严格要求参数一模一样，不能多也不能少。
//    */
//   loose?: boolean;
//   /**
//    * 必传参数参数定义,设计端需要靠这个来进行快速添加参数和检查参数完整性
//    * 如果参数没有传，则设计端会报错。
//    * 这些参数是必须传递的
//    */
//   params: (keyof T)[] | undefined[];
//   /**
//    * 可选参数，这些参数可选传递的，会影响到设计端的参数检查，可选参数如果没有传，或者传空值，设计端不会报错
//    * 如果某个参数同时在必传参数和可选参数中同时出现，则算做可选参数
//    */
//   optionalParams?: (keyof T)[] | undefined[];
//   /**
//    * 真正的执行方法
//    * @param data 携带参数的对象，最常用
//    * @param core 答题核心对象，不常用
//    */
//   // work: IFakeServerFunc<T>;
// }



// interface ITestParam {
//   /**
//    * 这个人学号
//    */
//   code: string;
//   /**
//    * 姓名
//    */
//   name: string;
//   /**
//    * 年龄
//    */
//   age: string;
//   /**
//    * 性别
//    */
//   gender?: string;
// }

// const groups = {
//   /**
//    * 判断某个学生的年龄和姓名是否和记录一致
//    */
//   age_name_verify: <IFakeServerWorker<ITestParam>>{
//     params: ['code', 'name', 'age'],
//     // work() {
//     //   return {
//     //     result: '',
//     //   };
//     // }
//   },
// }