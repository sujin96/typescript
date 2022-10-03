//타입을 타입스크립트가 직접 유추하게 이용하는 것이 가장 바람직하다.
// => 직접 명시해도 되지만 좀 더 타입스크립트스럽게 사용하기 위해서는 이것이 바람직

//call signatures
/*---------------------------------------------------------------*/
//함수 타입을 만들어서 사용하면 함수 작성시에 타입을 적어줄 필요가 없음
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
/*---------------------------------------------------------------*/

//overloanding
/*---------------------------------------------------------------*/
//여러개의 call signatures가 있을때
type Config = {
  path: string;
  state: object;
};

//first case
type Push = {
  (path: string): void;
  (config: Config): void;
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path);
  }
};

//second case
type Add2 = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add2: Add2 = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};
/*---------------------------------------------------------------*/

//다형성(polymorphism),Generics Recap
/*---------------------------------------------------------------*/
type SuperPrint = {
  <T>(arr: T[]): T;
};
const superPrint: SuperPrint = (arr) => arr[0];

/* 위 코드와 동일함
function superPrint<T>(a: T[]){
    return a[0]
}
*/

type SuperPrint2 = <T, M>(a: T[], b: M) => T;

const superPrint2: SuperPrint2 = (arr, b) => arr[0];

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["ssss", "asdfasdf"]);
superPrint([1, 2, true, "adsfn"]);
superPrint2([1, 2, 3, true], "sdfasdf");

type Player<E> = {
  name: string;
  extraInfo: E;
};

const nico: Player<{ favFood: string }> = {
  name: "nico",
  extraInfo: {
    favFood: "kimchi",
  },
};
/*---------------------------------------------------------------*/

// Classes
/*---------------------------------------------------------------*/

/*
추상화(abstract) 클래스는 다른 클래스가 상속받을 수 있는 클래스이다.
그러나 직접 새로운 인스턴스를 만들 수는 없다.
추상화클래스 안에서는 추상 메소드를 만들 수 있다 하지만 직접 구현하여서는 안되고 메소드의
call signature만 적어둬야한다.
추상메소드는 추상 클래스를 상속받는 모든 것들이 구현을 해야하는 메소드를 의미한다
*/
/* 
private, public, protected 가 있다.
private를 사용하면 상속을 한 자식클래스에서도 접근이 불가능하다.
필드가 외부로부터는 보호되지만 다른 자식 클래스에서는 사용되기를 원한다면 private 대신에 protected를 사용한다.
protected를 사용하면 클래스 밖에서는 접근이 불가능하지만 자식 클래스에서는 접근이 가능해진다.
*/
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    protected nickname: string
  ) {}
  abstract getNickName(): void;
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player2 extends User {
  getNickName() {
    console.log(this.nickname);
  }
}

const nico2 = new Player2("nico", "las", "니꼬");
nico2.firstName;
nico2.nickname;
nico2.getFullName();
nico2.getNickName();
/*---------------------------------------------------------------*/

//Recap
/*---------------------------------------------------------------*/
/* 
1. 클래스 자체를 타입처럼 사용이 가능하다
2. 객체의 키 타입을 지정해 줄 수 있다.
3. property를 만들고 초기화하는 다른 방법이 있다.
*/
type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
}

class Word {
  constructor(public readonly term: string, public readonly def: string) {}
}

const kimchi = new Word("kimchi", "한국의 음식");
const dict = new Dict();
dict.add(kimchi);
dict.def("kimchi");
/*---------------------------------------------------------------*/

//interfaces
/*---------------------------------------------------------------*/
/* 
인터페이스는 오브젝트의 모양을 특정해주기 위해 필요하다.
type 과 인터페이스는 오브젝트의 모양을 특정한다는 점은 똑같지만 type 키워드가 좀 더 활용할 수 있는 것이 많다.
인터페이스는 클래스와 닮았다 = 상속도 가능하다
type키워드도 상속이 가능하지만 문법이 살짝 다르고 길다
인터페이스는 property들을 축적시킬 수 있다.
타입에 특정한 값을 고정해서 사용할 수도 있다.
*/
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

interface Player3 {
  nickname: string;
  team: Team;
  health: Health;
}

const nico3: Player3 = {
  nickname: "nico",
  team: "yellow",
  health: 10,
};

/* 인터페이스의 property 축적 */
interface User2 {
  name: string;
}
interface User2 {
  lastName: string;
}

interface User2 {
  health: number;
}

const nic: User2 = {
  name: "nic",
  lastName: "dddd",
  health: 2,
};
