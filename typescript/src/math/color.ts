interface ClientTrainingLaiqiang {
  /**
   * 地址：https://public.choiceform.com/fake-request-exploits/dist/client/training/zc/age_name_verify
   *
   * 判断某个学生的年龄和姓名是否和记录一致
   * @param code 这个人学号
   * @param name 姓名
   * @param age 年龄
   * @param gender 性别
   */
  age_name_verify(code: string, name: string,
    age: string, gender?: string): { result: string, message: string };
}