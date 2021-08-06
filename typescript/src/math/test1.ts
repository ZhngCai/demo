interface ITestParam {
  /**
   * 这个人学号
   */
  code: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 年龄
   */
  age: string;
  /**
   * 性别
   */
  gender?: string;
}

const groups = {
  /**
   * 判断某个学生的年龄和姓名是否和记录一致
   */
  age_name_verify: <IFakeServerWorker<ITestParam>>{
    params: ['code', 'name', 'age'],
    // work() {
    //   return {
    //     result: '',
    //   };
    // }
  },
}