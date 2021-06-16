
// class Lady {
//   content = "Hi，帅哥";
//   sayHello() {
//     return this.content;
//   }
// }
// class XiaoJieJie extends Lady {
//   sayLove() {
//     return "I love you!";
//   }
//   sayHello() {
//     return super.sayHello() + "。你好！";
//   }
// }

// const goddess = new XiaoJieJie();
// console.log(goddess.sayHello());
// console.log(goddess.sayLove());


class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  public sayHello() {
    console.log(this.name + 'say Hello')  //此处不报错
  }
}

class Teacher extends Person {
  constructor(age: number) {
    super('fff')
  }
  public sayBye() {
    this.name;
  }
}

const person = new Person('js');
person.sayHello()

